from django.shortcuts import render
from django.http import HttpResponse
from django.core import serializers
from .models import Event
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import get_object_or_404
import json
#need to import user


# Create your views here.
def say_hello(request):
    return HttpResponse('Hello World')

# EVENT
def get_all_events(request):
    events = Event.objects.all()
    events_json = serializers.serialize('json', events)
    return HttpResponse(events_json, content_type="application/json")

def get_event_details(request, event_id=1):
    event = Event.objects.filter(id=event_id)
    event_json = serializers.serialize('json', event)
    return HttpResponse(event_json, content_type="application/json")

def event_registration(request, event_id):
    try : 
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