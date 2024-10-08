import collections
from django.shortcuts import render
from django.http import HttpResponse
from django.core import serializers
from django.contrib.auth import login, authenticate, logout
from .constants import RoleType, Status
from .models import Badge, Application, Event, Profile, ProfileBadge, EmailTemplate, VolunteerApplication, WhatsappTemplate
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import get_object_or_404
import json
from django.contrib.auth.models import User
from django.conf import settings
from django.core.mail import send_mail
from api.drive.script import DriveAPI
from twilio.rest import Client
from django.core.serializers.json import DjangoJSONEncoder
import mimetypes
from PIL import Image




# Create your views here.
def say_hello(request):
    return HttpResponse('Hello World')

# USER AUTHENTICATION
@csrf_exempt
def register_user(request):
    try:
        if request.method == "POST":
            data = json.loads(request.body)
            user = User.objects.create_user(username=data['username'], email=data['email'], password=data['password'])

            userProfile = Profile()
            userProfile.phone = data['phone']
            userProfile.age = data['age']
            userProfile.name = data['name']
            userProfile.gender = data['gender']
            userProfile.role_type = data['role_type']
            userProfile.user = user
            userProfile.save()

            return HttpResponse(status=200)
    except Exception as e:
        return HttpResponse(f'Error: {str(e)}', status=500)

@csrf_exempt
def create_badge(request):
    try:
        if request.method == "POST":
            # Parse JSON fields from request.POST
            badge_name = request.POST.get('badge_name')
            pre_requisites = request.POST.get('pre_requisites', '')

            badge = Badge(
                badge_name=badge_name,
                pre_requisites=pre_requisites
            )

            # Handle file upload for badge_image if provided
            if 'badge_image' in request.FILES:
                badge.badge_image = request.FILES['badge_image']

            # Save the new Badge instance to the database
            badge.save()

            return HttpResponse(f"Badge '{badge_name}' has been successfully posted.", status=200)
        else:
            return HttpResponse("Invalid request method.", status=405)

    except Exception as e:
        return HttpResponse(f"Error: {str(e)}", status=500)
    
def get_all_badges(request):
    try:
        badges = Badge.objects.all()
        
        badges_data = json.loads(serializers.serialize('json', badges))
        
        # Modify the image path in the fields section for each event
        for badge_obj in badges_data:
            badge_image = badge_obj['fields']['badge_image']
            if badge_image:
                filename = badge_image.split('/')[-1]  # Extract the filename
                badge_obj['fields']['badge_image'] = filename
            
        badge_json = json.dumps(badges_data, cls=DjangoJSONEncoder)
        return HttpResponse(badges_data, content_type="application/json")
        
    except Exception as e:
        return HttpResponse(f'Error: {str(e)}', status=500)

@csrf_exempt
def create_staffuser(request):
    try:
        if request.method == "POST":
            data = json.loads(request.body)
            user = User.objects.create_user(data['username'], data['email'], data['password'])
            user.is_superuser = 1
            user.is_staff = 1
            user.save()

            return HttpResponse(status=200)
    except Exception as e:
        return HttpResponse(f'Error: {str(e)}', status=500)

@csrf_exempt
def login_user(request):
    try:
        if request.method == "POST":
            data = json.loads(request.body)
            username = data.get('username')
            password = data.get('password')

            # Authenticate the user
            user = authenticate(username=username, password=password)
            if user is not None:
                login(request, user)
                return HttpResponse('{"message": "Login successful"}', status=200, content_type="application/json")
            else:
                return HttpResponse('{"message": "Invalid username or password"}', status=401, content_type="application/json")
    except User.DoesNotExist:
        return HttpResponse('{"message": "User does not exist"}', status=404, content_type="application/json")
    except Exception as e:
        return HttpResponse(f'Error: {str(e)}', status=500)

def logout_user(request):
    logout(request)
    return HttpResponse('{"Message": "Logged user out"}', status=200, content_type="application/json")

# EVENT
def get_all_events(request):
    try:
        events = Event.objects.all()
        
        events_data = json.loads(serializers.serialize('json', events))
        
        # Modify the image path in the fields section for each event
        for event_obj in events_data:
            event_image = event_obj['fields']['event_image']
            if event_image:
                filename = event_image.split('/')[-1]  # Extract the filename
                event_obj['fields']['event_image'] = filename
            if event_obj['fields'].get('event_description'):
                event_obj['fields']['event_description']= event_obj['fields']['event_description'][:75]+'...'
        
        events_json = json.dumps(events_data, cls=DjangoJSONEncoder)
        return HttpResponse(events_json, content_type="application/json")
        
    except Exception as e:
        return HttpResponse(f'Error: {str(e)}', status=500)

def get_event_details(request, event_id=1):
    try:
        event = Event.objects.filter(id=event_id)
        
        if not event.exists():
            return HttpResponse(json.dumps({'error': 'Event not found.'}), content_type="application/json", status=404)
        
        event_data = json.loads(serializers.serialize('json', event))
        
        # Modify the image path in the fields section
        for event_obj in event_data:
            event_image = event_obj['fields']['event_image']
            if event_image:
                filename = event_image.split('/')[-1]  # Extract the filename
                event_obj['fields']['event_image'] = filename
        
        event_json = json.dumps(event_data, cls=DjangoJSONEncoder)
        return HttpResponse(event_json, content_type="application/json")
        
    except Exception as e:
        return HttpResponse(f'Error: {str(e)}', status=500)

def event_registration(request, event_id):
    try: 
        event = Event.objects.filter(id=event_id)
        data = json.loads(request.body)
        user_id = data.get('user_id')
        role = data.get('role')
        #need to import user
        user = User.objects.filter(id=user_id)
        if role == 'participant':
            if event.registered_participants.count() < event.participant_quota:
                event.registered_participants.add(user)
            else:
                return HttpResponse('Participant quota reached', status=400)
        elif role == 'volunteer':
            if event.registered_volunteers.count() < event.volunteer_quota:
                event.registered_volunteers.add(user)
            else:
                return HttpResponse('Volunteer quota reached', status=400)
        else:
            return HttpResponse('Invalid role', status=400)
        
        event.save()
        return HttpResponse(f'{role} registered successfully', status=200)
    except json.JSONDecodeError:
        return HttpResponse('Invalid JSON', status=400)
    except Exception as e:
        return HttpResponse(f'Error: {str(e)}', status=500)
    
def event_registration_confirmation(request, event_id):
    event = Event.objects.filter(id=event_id)
    event_json = serializers.serialize('json', event)
    event_name = event_json.get('event_name')
    data = json.loads(request.body)
    user_id = data.get('user_id')

    # Check if the user is in the participants or volunteers list
    if user_id in event.registered_participants.all() or user_id in event.registered_volunteers.all():
        return HttpResponse(f'user {user_id} is registered for {event_name}', status=200)
    else:
        return HttpResponse(f'user {user_id} is not registered for {event_name}', status=200)

def unregister_from_event(request, event_id):
    try:
        event = Event.objects.get(id=event_id)
        if request.user.is_authenticated:
            user = request.user

            removed = False
            if user in event.registered_participants.all():
                event.registered_participants.remove(user)
                removed = True
            elif user in event.registered_volunteers.all():
                event.registered_volunteers.remove(user)
                removed = True
            if not removed:
                return HttpResponse('{"Message": "User not registered for event"}', status=400, content_type="application/json")
            return HttpResponse('{"Message": "User has been un-registered from event"}', status=200, content_type="application/json")
        else:
            return HttpResponse('{"Message": "User not logged in!"}', status=400, content_type="application/json")
    except Exception as e:
        return HttpResponse(f'Error: {str(e)}', status=500)

@csrf_exempt
def create_event(request):
    if request.method == "POST":
        try:
            # Parse form data including files
            if request.content_type.startswith('multipart/form-data'):
                form_data = request.POST
                files = request.FILES
            else:
                form_data = json.loads(request.body.decode('utf-8'))
                files = None

            # Create a new Event instance and populate it with the data from the request
            newEvent = Event()
            newEvent.event_name = form_data['event_name']
            newEvent.event_description = form_data['event_description']
            newEvent.event_date = form_data['event_date']
            newEvent.event_location = form_data['event_location']
            newEvent.target_population = form_data['target_population']
            newEvent.skillset = form_data.get('skillset', None)
            newEvent.participant_quota = form_data['participant_quota']
            newEvent.volunteer_quota = form_data['volunteer_quota']
            newEvent.deadline = form_data['deadline']

            # Handle file upload
            if files and 'event_image' in files:
                newEvent.event_image = files['event_image']

            newEvent.save()

            # Prepare a response with success status
            response_data = {
                "status": "success",
                "message": "Event added successfully",
                "event_id": newEvent.id
            }
            return HttpResponse(json.dumps(response_data), content_type="application/json")
        
        except json.JSONDecodeError:
            # Handle JSON decoding error
            response_data = {
                "status": "error",
                "message": "Invalid JSON data"
            }
            return HttpResponse(json.dumps(response_data), content_type="application/json", status=400)
        except KeyError as e:
            # Handle missing key error
            response_data = {
                "status": "error",
                "message": f"Missing key in data: {str(e)}"
            }
            return HttpResponse(json.dumps(response_data), content_type="application/json", status=400)
        except Exception as e:
            # Handle any other exception
            response_data = {
                "status": "error",
                "message": str(e)
            }
            return HttpResponse(json.dumps(response_data), content_type="application/json", status=500)

    # If the request method is not POST, return an error response
    response_data = {
        "status": "error",
        "message": 'Wrong Method'
    }
    return HttpResponse(json.dumps(response_data), content_type="application/json", status=400)

@csrf_exempt
def send_event_reminder_email(request, event_id=1):
    try:
        event = Event.objects.get(id=event_id)
        recipient_list = []

        for user in event.registered_participants.all():
            recipient_list.append(user.email)
        for user in event.registered_volunteers.all():
            recipient_list.append(user.email)
        
        if not recipient_list:
            return HttpResponse('{"Response": "No registered participants/volunteers!"}', status=200, content_type="application/json")

        subject = f"Reminder - {event}"
        message = f"Hi! This is a friendly reminder for the upcoming event: {event}\nDate: {event.event_date}\nLocation: {event.event_location}\nWe hope to see you there!"
        send_email(subject, message, recipient_list)
        return HttpResponse('{"Response": "Email reminders sent!"}', status=200, content_type="application/json")
    except Exception as e:
        return HttpResponse(f'Error: {str(e)}', status=500)

@csrf_exempt
def send_event_reminder_whatsapp(request, event_id=1):
    try:
        event = Event.objects.get(id=event_id)
        recipient_list = []

        for user in event.registered_participants.all():
            profile = Profile.objects.get(user=user)
            recipient_list.append(profile.phone)
        for user in event.registered_volunteers.all():
            profile = Profile.objects.get(user=user)
            recipient_list.append(profile.phone)
        
        if not recipient_list:
            return HttpResponse('{"Response": "No registered participants/volunteers!"}', status=200, content_type="application/json")

        message = f"Hi! This is a friendly reminder for the upcoming event: {event}\nDate: {event.event_date}\nLocation: {event.event_location}\nWe hope to see you there!"
        for phone in recipient_list:
            send_whatsapp(phone, message)
        return HttpResponse('{"Response": "Whatsapp reminders sent!"}', status=200, content_type="application/json")
    except Exception as e:
        return HttpResponse(f'Error: {str(e)}', status=500)

# USER 
def get_user_details(request, user_id=1):
    try:
        userProfile = Profile.objects.filter(user=User.objects.get(id=user_id))
        userProfileJSON = serializers.serialize('json', userProfile)
        return HttpResponse(userProfileJSON, content_type="application/json")
    except Profile.DoesNotExist or User.DoesNotExist:
        return HttpResponse('{"Response": "User/Profile does not exist"}', status=400, content_type="application/json")
    except Exception as e:
        return HttpResponse(f'Error: {str(e)}', status=500)

def get_user_registrations(request, user_id=1):
    try:
        user = User.objects.get(id=user_id)
        profile = Profile.objects.get(user=user)

        if profile.role_type == RoleType.PARTICIPANT:
            events = Event.objects.filter(registered_participants__id=user.id)
        else:
            events = Event.objects.filter(registered_volunteers__id=user.id)

        eventsJSON = serializers.serialize('json', events)
        return HttpResponse(eventsJSON, content_type="application/json")
    except User.DoesNotExist or Profile.DoesNotExist:
        return HttpResponse('{"Response": "User/Profile does not exist"}', status=400, content_type="application/json")
    except Exception as e:
        return HttpResponse(f'Error: {str(e)}', status=500)
    
def get_user_badges(request, user_id=1):
    try:
        user = User.objects.get(id=user_id)
        profile = Profile.objects.get(user=user)

        if profile.role_type != RoleType.VOLUNTEER:
            return HttpResponse('{"Response": "User is not a volunteer"}', status=403, content_type="application/json")

        badges = ProfileBadge.objects.get(profile=profile)
        streak = profile.streak

        badges_list = [
            {
                "badge_name": badge.badge.badge_name, 
                "badge_image": badge.badge.badge_image.url if badge.badge.badge_image else None,
                "date_obtained": badge.date_obtained
            } 
            for badge in badges
        ]

        # Prepare the response data
        response_data = {
            "user": profile.user.username,
            "name": profile.name,
            "streak": streak,
            "badges": badges_list,
        }
        return HttpResponse(response_data)

    except User.DoesNotExist:
        return HttpResponse('{"Response": "User does not exist"}', status=400, content_type="application/json")
    except Profile.DoesNotExist:
        return HttpResponse('{"Response": "Profile does not exist"}', status=400, content_type="application/json")
    except Exception as e:
        return HttpResponse(f'Error: {str(e)}', status=500)

 
 # PROFILE
def get_all_participant(request):
    try:
        profiles = Profile.objects.filter(role_type=RoleType.PARTICIPANT.value.upper())
        profile_json = serializers.serialize('json', profiles)
        return HttpResponse(profile_json, content_type="application/json")
    except Exception as e:
        return HttpResponse(f'Error: {str(e)}', status=500)

def get_all_volunteer(request):
    try:
        profiles = Profile.objects.filter(role_type=RoleType.VOLUNTEER.value.upper())
        profile_json = serializers.serialize('json', profiles)
        return HttpResponse(profile_json, content_type="application/json")
    except Exception as e:
        return HttpResponse(f'Error: {str(e)}', status=500)
    
def get_all_staff(request):
    try:
        profiles = Profile.objects.filter(role_type=RoleType.STAFF.value.upper())
        profile_json = serializers.serialize('json', profiles)
        return HttpResponse(profile_json, content_type="application/json")
    except Exception as e:
        return HttpResponse(f'Error: {str(e)}', status=500)

@csrf_exempt
def create_staff(request):
    if request.method == "POST":
        try:
            staffJSON = json.loads(request.body)

            # Check if user already exists
            if User.objects.filter(username=staffJSON['username']).exists():
                response_data = {
                    "status": "error",
                    "message": "Username already taken"
                }
                return HttpResponse(json.dumps(response_data), content_type="application/json", status=400)

            # Create User
            user = User.objects.create_user(
                username=staffJSON['username'],
                password=staffJSON['password'],
                email=staffJSON['email'],
            )

            # Create Profile
            newProfile = Profile(
                user=user,
                name=staffJSON['name'],
                age=staffJSON['age'],
                phone=staffJSON.get('phone', ''),
                gender=staffJSON['gender'],
                role_type=RoleType.STAFF.value,
                nationality=staffJSON.get('nationality', ''),
                ethnicity=staffJSON.get('ethnicity', ''),
            )
            newProfile.save()

            response_data = {
                "status": "success",
                "message": "Staff profile created successfully",
                "profile_id": str(newProfile.id)
            }
            return HttpResponse(json.dumps(response_data), content_type="application/json", status=201)

        except KeyError as e:
            response_data = {
                "status": "error",
                "message": f"Missing field: {str(e)}"
            }
            return HttpResponse(json.dumps(response_data), content_type="application/json", status=400)
        except Exception as e:
            response_data = {
                "status": "error",
                "message": str(e)
            }
            return HttpResponse(json.dumps(response_data), content_type="application/json", status=500)

    response_data = {
        "status": "error",
        "message": "Wrong Method"
    }
    return HttpResponse(json.dumps(response_data), content_type="application/json", status=400)


# APPLICATION
def get_all_participant_application(request):
    try:
        applications = Application.objects.select_related('user_profile', 'event').all()
        
        application_data = []
        for application in applications:
            data = {
                "model": "api.application",  # Adjust the model name according to your app structure
                "pk": str(application.id),
                "fields": {
                    "user_profile_id": str(application.user_profile.id) if application.user_profile else None,
                    "user_profile_name": application.user_profile.name if application.user_profile else None,
                    "event_name": application.event.event_name if application.event else None,
                    "status": application.get_status_display(),
                }
            }
            application_data.append(data)
        
        application_json = json.dumps(application_data, cls=DjangoJSONEncoder)
        return HttpResponse(application_json, content_type="application/json")
        
    except Exception as e:
        error_message = json.dumps({'error': str(e)})
        return HttpResponse(error_message, content_type="application/json", status=500)
     
def get_volunteer_application(request):
    try:
        application = Application.objects.all()
        application_json = serializers.serialize('json', application)
        return HttpResponse(application_json, content_type="application/json")
    except Exception as e:
        return HttpResponse(f'Error: {str(e)}', status=500)

def get_all_volunteer_application(request):
    try:
        volunteer_applications = VolunteerApplication.objects.select_related('user_profile', 'event').all()
        
        volunteer_data = []
        for application in volunteer_applications:
            data = {
                "model": "api.volunteerapplication",  # Adjust the model name according to your app structure
                "pk": str(application.id),
                "fields": {
                    "user_profile_id": str(application.user_profile.id) if application.user_profile else None,
                    "user_profile_name": application.user_profile.name if application.user_profile else None,
                    "event_name": application.event.event_name if application.event else None,
                    "status": application.get_status_display(),
                    "reason_joining": application.reason_joining,
                    "cv_file": application.cv_file.url if application.cv_file else None,
                }
            }
            if data['fields']['cv_file']:
                data['fields']['cv_file']=application.cv_file.url.split('/')[-1]
            
            volunteer_data.append(data)
        
        volunteer_json = json.dumps(volunteer_data, cls=DjangoJSONEncoder)
        return HttpResponse(volunteer_json, content_type="application/json")
        
    except VolunteerApplication.DoesNotExist:
        error_message = json.dumps({'error': 'No volunteer applications found.'})
        return HttpResponse(error_message, content_type="application/json", status=404)
    except Exception as e:
        error_message = json.dumps({'error': str(e)})
        return HttpResponse(error_message, content_type="application/json", status=500)
@csrf_exempt    
def create_volunteer_application(request):
    if request.method == 'POST':
        try:
            body = json.loads(request.body)
            if request.user.is_authenticated:
                user_profile_id = request.user.id
            else:
                user_profile_id = body['user_profile_id']
            event_id = body['event_id']
            reason_joining = body['reason_joining']
            cv_file = request.FILES.get('cv_file')
            print(user_profile_id, event_id)

            # Get the user profile and event objects
            user_profile = get_object_or_404(Profile, user_id=user_profile_id)
            event = get_object_or_404(Event, id=event_id)

            # Create the VolunteerApplication object
            volunteer_application = VolunteerApplication(
                user_profile=user_profile,
                event=event,
                reason_joining=reason_joining,
                cv_file=cv_file
            )
            # Save the application to the database
            volunteer_application.save()
            return HttpResponse("{'Message': 'Registered for event'}", status=201, content_type="application/json")
        except Exception as e:
            return HttpResponse(f'Error: {str(e)}', status=500)

def create_application(request):
    if request.method == 'POST':
        try:
            user_profile_id = request.POST.get('user_profile_id')
            event_id = request.POST.get('event_id')
            user_profile = get_object_or_404(Profile, id=user_profile_id)
            event = get_object_or_404(Event, id=event_id)

            application = Application(
                user_profile=user_profile,
                event=event,
            )
            application.save()
            return HttpResponse(status=201)
        except Exception as e:
            return HttpResponse(f'Error: {str(e)}', status=500)

# REMINDER
# Email Section
def get_all_email_templates(request):
    try:
        emailTemplates = EmailTemplate.objects.all()
        emailTemplatesJSON = serializers.serialize('json', emailTemplates)
        return HttpResponse(emailTemplatesJSON, content_type="application/json")
    except Exception as e:
        return HttpResponse(f'Error: {str(e)}', status=500)

def send_emails_from_template(request, template_id=1):
    try:
        template = EmailTemplate.objects.get(id=template_id)
        recipient_list = json.loads(template.recipient_list)

        send_email(template.subject, template.body, recipient_list)
        response = {'Message': f'Email reminders sent to {len(recipient_list)} users!'}

        return HttpResponse(str(response), status=200, content_type="application/json")
    except Exception as e:
        return HttpResponse(f'Error: {str(e)}', status=500)

@csrf_exempt
def send_mass_email(request):
    try:
        if request.method == "POST":
            data = json.loads(request.body)
            subject = data['subject']
            body = data['body']
            saveAsTemplate = data['save_as_template']

            # Send email to either emails specified in addresses or all users in receiver group
            email_addresses_list = data['email_addresses']
            receiver_group = data['group']

            recipient_list = []

            roles = [role[1] for role in RoleType.choices()]
            if receiver_group in roles:
                profiles_in_group = Profile.objects.filter(role_type=receiver_group.upper())

                for profile in profiles_in_group:
                    print(profile.user.email)
                    recipient_list.append(profile.user.email)
            else:
                if email_addresses_list and len(email_addresses_list):
                    recipient_list = email_addresses_list
            
            if not recipient_list:
                return HttpResponse('{"Response": "No emails specified/found!"}', status=200, content_type="application/json")
            
            send_email(subject, body, recipient_list)
            response = {'Response': f'Email reminders sent to {len(recipient_list)} users!'}

            if saveAsTemplate == 1:
                emailTemplate = EmailTemplate()
                emailTemplate.subject = subject
                emailTemplate.body = body
                emailTemplate.recipient_list = json.dumps(recipient_list)
                if receiver_group in roles:
                    emailTemplate.receiver_group = receiver_group
                emailTemplate.save()
                print("Saved email template!")

            return HttpResponse(str(response), status=200, content_type="application/json")
    except Exception as e:
        return HttpResponse(f'Error: {str(e)}', status=500)

# WhatsApp Section
def send_whatsapp_from_template(request, template_id=1):
    try:
        template = WhatsappTemplate.objects.get(id=template_id)
        recipient_list = json.loads(template.recipient_list)

        for phone in recipient_list:
            send_whatsapp(phone, template.message)
        response = {'Message': f'Whatsapp reminders sent to {len(recipient_list)} users!'}

        return HttpResponse(str(response), status=200, content_type="application/json")
    except Exception as e:
        return HttpResponse(f'Error: {str(e)}', status=500)

def get_all_whatsapp_templates(request):
    try:
        whatsappTemplates = WhatsappTemplate.objects.all()
        whatsappTemplatesJSON = serializers.serialize('json', whatsappTemplates)
        return HttpResponse(whatsappTemplatesJSON, content_type="application/json")
    except Exception as e:
        return HttpResponse(f'Error: {str(e)}', status=500)

@csrf_exempt
def send_mass_whatsapp(request):
    try:
        if request.method == "POST":
            data = json.loads(request.body)
            message = data['message']
            saveAsTemplate = data['save_as_template']

            # Send whatsapp to either provided phone numbers or to role_type group
            phone_numbers_list = data['phone_numbers']
            receiver_group = data['group']

            recipient_list = []

            roles = [role[1] for role in RoleType.choices()]
            if receiver_group in roles:
                profiles_in_group = Profile.objects.filter(role_type=receiver_group.upper())

                for profile in profiles_in_group:
                    print(profile.phone)
                    if profile.phone is not None:
                        recipient_list.append(profile.phone)
            else:
                if phone_numbers_list and len(phone_numbers_list) > 0:
                    recipient_list = phone_numbers_list
            
            if not recipient_list:
                return HttpResponse('{"Response": "No phone numbers specified/found!"}', status=200, content_type="application/json")
            
            for phone in recipient_list:
                send_whatsapp(phone, message)
            response = {'Response': f'WhatsApp reminders sent to {len(recipient_list)} users!'}

            if saveAsTemplate == 1:
                whatsappTemplate = WhatsappTemplate()
                whatsappTemplate.message = message
                whatsappTemplate.recipient_list = json.dumps(recipient_list)
                if receiver_group in roles:
                    whatsappTemplate.receiver_group = receiver_group
                whatsappTemplate.save()
                print("Saved whatsapp template!")

            return HttpResponse(str(response), status=200, content_type="application/json")
    except Exception as e:
        return HttpResponse(f'Error: {str(e)}', status=500)

def send_email(subject, message, recipient_list):
    email_from = settings.EMAIL_HOST_USER
    send_mail(subject, message, email_from, recipient_list)

# THIS ONLY WORKS WITH A FEW MESSAGE TEMPLATES CURRENTLY (WITH TWILIO)
def send_whatsapp(phone='+85252633364', message=''):
    print(phone, message)
    client = Client(settings.TWILIO_ACCOUNT_SID, settings.TWILIO_AUTH_TOKEN)

    message = client.messages.create(
        from_="whatsapp:+14155238886",
        to=f"whatsapp:{phone}",
        body=message
    )
    print(message.status)

def get_attendance_analytics(request):
    events = Event.objects.all()
    response = []

    for event in events:
        event_analytics = analytics_participants_ratio(event.id)
        if isinstance(event_analytics, dict):
            response.append(event_analytics)
    
    responseBody = { "data": response }
    return HttpResponse(json.dumps(responseBody), status=200, content_type="application/json")

def analytics_participants_ratio(event_id):
    try:
        event = Event.objects.filter(id=event_id).first()

        if event is None:
            return HttpResponse(
                json.dumps({"error": "Event not found"}), 
                content_type="application/json",
                status=404
            )

        # Calculate the ratio
        participants_count = event.registered_participants.count()
        volunteers_count = event.registered_volunteers.count()

        data = participants_ratio(participants_count, volunteers_count)

        # Prepare the response data
        response_data = {
            "event_name": event.event_name,
            "participants_count": participants_count,
            "volunteers_count": volunteers_count,
            "data": data
        }
        return response_data
        
    except Exception as e:
        return HttpResponse(
            json.dumps({"error": f"Error: {str(e)}"}), 
            content_type="application/json",
            status=500
        )

# Creates the JSON for pie chart representation of participants/volunteers
def participants_ratio(participants_count, volunteers_count):
    if participants_count == 0 and volunteers_count == 0: return {}
    return [
        {'id': 0, 'value': participants_count, 'label': 'Participants', 'color': '#FFFF99'},
        {'id': 1, 'value': volunteers_count, 'label': 'Volunteers', 'color': '#DDAD41'},
    ]

def pic_show(request, image_filename):
    try:
        # Determine the content type based on the file extension
        path = f"static/event_image/{image_filename}"
        content_type, _ = mimetypes.guess_type(f"static/event_image/{image_filename}")
        
        # Open and return the image
        with open(path, "rb") as f:
            return HttpResponse(f.read(), content_type=content_type or "image/jpeg")
    
    except IOError:
        # Create a 1x1 red image
        red = Image.new('RGB', (1, 1), (255, 0, 0))
        response = HttpResponse(content_type="image/jpeg")
        red.save(response, "JPEG")
        return response
    
def file_show(request, path):
    try:
        # Determine the content type based on the file extension
        x_path = f"cv_files/{path}"
        content_type, _ = mimetypes.guess_type(f"cv_files/{path}")
        
        # Open and return the image
        with open(x_path, "rb") as f:
            return HttpResponse(f.read(), content_type=content_type or "image/jpeg")
    
    except IOError:
        # Create a 1x1 red image
        red = Image.new('RGB', (1, 1), (255, 0, 0))
        response = HttpResponse(content_type="image/jpeg")
        red.save(response, "JPEG")
        return response

def get_demographic_analytics(request):
    events = Event.objects.all()
    response = []

    for event in events:
        event_analytics = calculate_demographic_analytics(event.id)
        if isinstance(event_analytics, dict):
            print(event_analytics)
            response.append(event_analytics)
    
    responseBody = { "data": response }
    return HttpResponse(json.dumps(responseBody), status=200, content_type="application/json")

def calculate_demographic_analytics(event_id):
    try:
        event = Event.objects.get(id=event_id)

        ethnicityCount = collections.defaultdict(int)
        avgAge_participant, avgAge_volunteer, count = 0, 0, 0

        for user in event.registered_participants.all():
            profile = Profile.objects.get(user=user)
            ethnicityCount[profile.ethnicity] += 1
            avgAge_participant += profile.age
            count += 1
        if count != 0:
            avgAge_participant = avgAge_participant / count
        
        for user in event.registered_participants.all():
            profile = Profile.objects.get(user=user)
            ethnicityCount[profile.ethnicity] += 1
            avgAge_volunteer += profile.age
            count += 1
        if count != 0:
            avgAge_volunteer = avgAge_volunteer / count

        response = {
            'event_id': event.id,
            'event_name': event.event_name,
            'average_participant_age': avgAge_participant,
            'average_volunteer_age': avgAge_volunteer,
            'xLabels': list(ethnicityCount.keys()),
            'yData': list(ethnicityCount.values())
        }

        return response
    except Exception as e:
        print('hahahahah')
        print(e)
        return f"Error: {e}"
    
@csrf_exempt  
def update_application(request):
    if request.method == 'POST':
        try:
            body = json.loads(request.body)
            # Parse the body of the PATCH request
            application_id = body['application_id']
            new_status = body['status']

            # Validate that the status is one of the enum values
            valid_status_values = [status.value for status in Status]
            if new_status not in valid_status_values:
                return HttpResponse('Invalid status value', status=400)

            # Fetch the application by ID
            application = get_object_or_404(Application, id=application_id)
    
            # Update the status
            application.status = new_status.upper()
            if new_status == Status.SUCCESSFUL.value.upper():
                if application.role_type == RoleType.PARTICIPANT.value:
                    application.event.registered_participants.add(application.user_profile.user)
                elif application.role_type == RoleType.VOLUNTEER.value:
                    application.event.registered_volunteers.add(application.user_profile.user)

            application.save()

            return HttpResponse(status=200)
        except json.JSONDecodeError:
            return HttpResponse('Invalid JSON format', status=400)
        except Exception as e:
            return HttpResponse(f'Error: {str(e)}', status=500)

    return HttpResponse("Invalid request method", status=400)

def get_quota_analytics(request):
    events = Event.objects.all()
    response = []

    for event in events:
        event_analytics = calculate_quota_analytics(event.id)
        if isinstance(event_analytics, dict):
            response.append(event_analytics)

    return HttpResponse(str(response), status=200, content_type="application/json")

def calculate_quota_analytics(event_id):
    try:
        event = Event.objects.get(id=event_id)

        participants_quota = event.get('participant_quota')
        volunteers_quota = event.get('volunteer_quota')
        participants_count = event.registered_participants.count()
        volunteers_count = event.registered_volunteers.count()

        data = quota_analytics(participants_quota, volunteers_quota, participants_count, volunteers_count)
        response_data = {
            "event_name": event.event_name,
            "participants_quota": participants_quota,
            "volunteers_quota":volunteers_quota,
            "participants_count": participants_count,
            "volunteers_count": volunteers_count,
            "data": data
        }
        return response_data
    except Exception as e:
            return HttpResponse(
                json.dumps({"error": f"Error: {str(e)}"}), 
                content_type="application/json",
                status=500
            )

# Creates the JSON for pie chart representation of participants/volunteers
def quota_analytics(participants_quota, volunteers_quota,participants_count, volunteers_count):
    if participants_quota == 0 and volunteers_quota == 0: return {}
    return {[
            { "data": [participants_quota-participants_count,participants_count ], "stack": 'A', "label": 'Participants' },
            { "data": [volunteers_quota-volunteers_count, volunteers_count], "stack": 'A', "label": 'Volunteers' }
            ]}