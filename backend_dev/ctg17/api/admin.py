from django.contrib import admin
from .models import Event, Training, Profile, Application, Badge

# Register your models here.
admin.site.register(Event)
admin.site.register(Training)
admin.site.register(Profile)
admin.site.register(Application)
admin.site.register(Badge)