from django.contrib import admin
from .models import Event, Training, Profile, Application, Badge, EmailTemplate, WhatsappTemplate

# Register your models here.
admin.site.register(Event)
admin.site.register(Training)
admin.site.register(Profile)
admin.site.register(Application)
admin.site.register(Badge)
admin.site.register(EmailTemplate)
admin.site.register(WhatsappTemplate)