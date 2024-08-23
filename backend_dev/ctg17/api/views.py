from django.shortcuts import render
from django.http import HttpResponse
from django.core import serializers
from .models import Event
from django.views.decorators.csrf import csrf_exempt
import json

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