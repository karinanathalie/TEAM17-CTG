from django.shortcuts import render
from django.http import HttpResponse
from django.core import serializers
from .models import Event, Profile
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import get_object_or_404
import json
from django.contrib.auth.models import User
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
            user = User.objects.create_user(data['username'], data['email'], data['password'])

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

        return HttpResponse({"Status": "Added"}, content_type="application/json")
    return HttpResponse("Wrong method")

# USER 
def get_user_details(request, user_id=1):
    try:
        userProfile = Profile.objects.get(user=User.objects.get(id=user_id))
        return HttpResponse(str(userProfile.toJSON()), content_type="application/json")
    except Profile.DoesNotExist or User.DoesNotExist:
        return HttpResponse('{"Response": "User/Profile does not exist"}', status=400, content_type="application/json")
    except Exception as e:
        return HttpResponse(f'Error: {str(e)}', status=500)
