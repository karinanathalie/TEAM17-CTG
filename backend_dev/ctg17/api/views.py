from django.shortcuts import render
from django.http import HttpResponse
from django.core import serializers
from django.contrib.auth import login
from passlib.hash import django_pbkdf2_sha256 as handler
from .constants import RoleType
from .models import Application, Event, Profile, ProfileBadge
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import get_object_or_404
import json
from django.contrib.auth.models import User
from django.conf import settings
from django.core.mail import send_mail
from drive.script import DriveAPI
#need to import user


# Create your views here.
def say_hello(request):
    return HttpResponse('Hello World')

# USER AUTHENTICATION
@csrf_exempt
def register_user(request):
    try:
        if request.method == "POST":
            data = json.loads(request.body)
            password = handler.hash(data['password'], rounds=170000, salt_size=11)
            user = User.objects.create_user(username=data['username'], email=data['email'], password=password)

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
            user = User.objects.get(username=username)
            if handler.verify(password, user.password):
                login(request, user)
                return HttpResponse('{"message": "Login successful"}', status=200, content_type="application/json")
            else:
                return HttpResponse('{"message": "Invalid username or password"}', status=401, content_type="application/json")
    except User.DoesNotExist:
        return HttpResponse('{"message": "User does not exist"}', status=404, content_type="application/json")
    except Exception as e:
        return HttpResponse(f'Error: {str(e)}', status=500)


# EVENT
def get_all_events(request):
    try:
        events = Event.objects.all()
        events_json = serializers.serialize('json', events)
        return HttpResponse(events_json, content_type="application/json")
    except Exception as e:
        return HttpResponse(f'Error: {str(e)}', status=500)

def get_event_details(request, event_id=1):
    try:
        event = Event.objects.filter(id=event_id)
        event_json = serializers.serialize('json', event)
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

@csrf_exempt
def create_event(request):
    if request.method == "POST":
        eventJSON= json.loads(request.body)
        print(eventJSON)

        newEvent = Event()
        newEvent.event_name = eventJSON['event_name']
        newEvent.event_description = eventJSON['event_description']
        newEvent.event_date = eventJSON['event_date']
        newEvent.event_location = eventJSON['event_location']
        newEvent.target_population = eventJSON['target_population']
        newEvent.skillset = eventJSON['skillset']
        newEvent.participant_quota = eventJSON['participant_quota']
        newEvent.volunteer_quota = eventJSON['volunteer_quota']
        newEvent.deadline = eventJSON['deadline']
        newEvent.save()

        response_data = {
            "status": "success",
            "message": "Event added successfully",
            "event_id": newEvent.id
        }
        return HttpResponse(json.dumps(response_data), content_type="application/json")
    
    response_data = {
        "status": "error",
        "message": 'Wrong Method'
    }
    return HttpResponse(json.dumps(response_data), content_type="application/json", status=400)

def send_event_reminder(request, event_id=1):
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
    
def get_user_achievements(request, user_id=1):
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
        profiles = Profile.objects.filter(role_type=RoleType.PARTICIPANT.value)
        profile_json = serializers.serialize('json', profiles)
        return HttpResponse(profile_json, content_type="application/json")
    except Exception as e:
        return HttpResponse(f'Error: {str(e)}', status=500)

def get_all_volunteer(request):
    try:
        profiles = Profile.objects.filter(role_type=RoleType.VOLUNTEER.value)
        profile_json = serializers.serialize('json', profiles)
        return HttpResponse(profile_json, content_type="application/json")
    except Exception as e:
        return HttpResponse(f'Error: {str(e)}', status=500)
    
def get_all_staff(request):
    try:
        profiles = Profile.objects.filter(role_type=RoleType.STAFF.value)
        profile_json = serializers.serialize('json', profiles)
        return HttpResponse(profile_json, content_type="application/json")
    except Exception as e:
        return HttpResponse(f'Error: {str(e)}', status=500)
    

# APPLICATION
def get_all_volunteer_application(request):
    try:
        application = Application.objects.filter(role_type=RoleType.VOLUNTEER.value)
        application_json = serializers.serialize('json', application)
        return HttpResponse(application_json, content_type="application/json")
    except Exception as e:
        return HttpResponse(f'Error: {str(e)}', status=500)

def get_all_participant_application(request):
    try:
        application = Application.objects.filter(role_type=RoleType.PARTICIPANT.value)
        application_json = serializers.serialize('json', application)
        return HttpResponse(application_json, content_type="application/json")
    except Exception as e:
        return HttpResponse(f'Error: {str(e)}', status=500)
    
def create_volunteer_application(request):
    if request.method == 'POST':
        try:
            user_profile_id = request.POST.get('user_profile_id')
            event_id = request.POST.get('event_id')
            reason_joining = request.POST.get('reason_joining')
            cv_file = request.FILES.get('cv_file')

            # Get the user profile and event objects
            user_profile = get_object_or_404(Profile, id=user_profile_id)
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
            return HttpResponse(status=201)
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

# Utility
def send_email(subject, message, recipient_list):
    email_from = settings.EMAIL_HOST_USER
    send_mail(subject, message, email_from, recipient_list)