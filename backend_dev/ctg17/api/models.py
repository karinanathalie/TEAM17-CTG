from django.db import models
from django.contrib.auth.models import User

class Event(models.Model):
    # Basic event details
    event_name = models.CharField(max_length=255)
    event_description = models.TextField()
    event_date = models.DateTimeField()
    event_location = models.CharField(max_length=255)
    event_image = models.FileField(null=True, blank=True)

    # To enfore validation for event demographics
    target_population = models.CharField(max_length=255, null=True, blank=True)
    skillset = models.TextField(null=True, blank=True)

    # Managing registrations
    participant_quota = models.IntegerField()
    volunteer_quota = models.IntegerField()
    deadline = models.DateTimeField()
    registered_participants = models.ManyToManyField(User, related_name="registered_participants", null=True, blank=True)
    registered_volunteers = models.ManyToManyField(User, related_name="registered_volunteers", null=True, blank=True)

    def __str__(self):
        return self.event_name


class Training(models.Model):
    training_name = models.CharField(max_length=255)
    training_description = models.TextField(null=True, blank=True)
    training_link = models.CharField(max_length=255)
    skillset = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.training_name
