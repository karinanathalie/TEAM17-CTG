from django.contrib import admin
from .models import Event, Training, Profile, Application

# Register your models here.
admin.site.register(Event)
admin.site.register(Training)
admin.site.register(Profile)
admin.site.register(Application)