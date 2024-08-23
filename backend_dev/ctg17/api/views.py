from django.shortcuts import render
from django.http import HttpResponse
from django.core import serializers
from .models import Event

# Create your views here.
def say_hello(request):
    return HttpResponse('Hello World')

def get_all_events(request):
    events = Event.objects.all()
    events_json = serializers.serialize('json', events)
    return HttpResponse(events_json, content_type="application/json")

def get_event_details(request, event_id=1):
    event = Event.objects.filter(id=event_id)
    event_json = serializers.serialize('json', event)
    return HttpResponse(event_json, content_type="application/json")