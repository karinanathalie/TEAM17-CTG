import uuid
from django.db import models
from django.contrib.auth.models import User
from api.constants import Gender, RoleType
from django.core import serializers
from django.utils import timezone
from datetime import datetime
import random
import string


class Badge(models.Model):
    badge_name = models.CharField(max_length=255)
    badge_image = models.ImageField(null=True, blank=True)
    pre_requisites = models.TextField(null=True, blank=True)  # New field added

    def __str__(self):
        return self.badge_name
    
class Training(models.Model):
    training_name = models.CharField(max_length=255)
    training_description = models.TextField(null=True, blank=True)
    training_link = models.CharField(max_length=255)
    skillset = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.training_name


def generate_random_id():
    return ''.join(random.choices(string.ascii_letters + string.digits, k=10))

class Profile(models.Model):
    id = models.CharField(
        primary_key=True,
        default=generate_random_id,
        max_length=10,
        editable=False,
    )
    name = models.CharField(max_length=225)
    age = models.PositiveIntegerField()
    phone = models.CharField(max_length=20, null=True)
    gender = models.TextField(
        choices=Gender.choices(),
    )
    role_type = models.TextField(
        choices=RoleType.choices(),
    )
    nationality = models.CharField(max_length=225)
    ethnicity = models.CharField(max_length=225)
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    badges = models.ManyToManyField(Badge, related_name="volunteer_badges", blank=True)
    trainings = models.ManyToManyField(Training, related_name="completed_trainings", blank=True)
    streak = models.PositiveIntegerField(default=0) 
    date_created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} ({self.user.username})"
    
class ProfileBadge(models.Model):
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE)
    badge = models.ForeignKey(Badge, on_delete=models.CASCADE)
    date_obtained = models.DateTimeField(default=datetime.now)

    def __str__(self):
        return f"{self.badge.badge_name} obtained by {self.profile.name} on {self.date_obtained}"
    

class Application(models.Model):
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
    )
    user_profile = models.ForeignKey(
        'Profile',
        on_delete=models.PROTECT,
        related_name='applications',
        null=True, 
        blank=True,
    )
    event = models.ForeignKey(
        'Event',
        on_delete=models.CASCADE,
        related_name='applications',
        null=True, 
        blank=True,
    )

    def __str__(self):
        return f"{self.user_profile.name} applied as {self.role_type} for {self.event.event_name}"

class VolunteerApplication(Application):
    reason_joining = models.TextField()
    cv_file = models.FileField(upload_to='cv_files/', null=True, blank=True)

    class Meta:
        verbose_name = "Volunteer Application"
        verbose_name_plural = "Volunteer Applications"

    def __str__(self):
        return f"{self.user_profile.name} applied as Volunteer for {self.event.event_name} - Reason: {self.why_join}"

class Event(models.Model):
    # Basic event details
    event_name = models.CharField(max_length=255)
    event_description = models.TextField()
    event_date = models.DateTimeField()
    event_location = models.CharField(max_length=255)
    event_image = models.FileField(upload_to='static/event_image/',null=True, blank=True)

    # To enfore validation for event demographics
    target_population = models.CharField(max_length=255, null=True, blank=True)
    skillset = models.TextField(null=True, blank=True)
    required_training = models.ManyToManyField(Training, related_name="required_training", blank=True)

    # Managing registrations
    participant_quota = models.IntegerField()
    volunteer_quota = models.IntegerField()
    deadline = models.DateTimeField()
    registered_participants = models.ManyToManyField(User, related_name="registered_participants", blank=True)
    registered_volunteers = models.ManyToManyField(User, related_name="registered_volunteers", blank=True)
    staff = models.ManyToManyField(
        'Profile', 
        through='Application', 
        related_name='managed_events',
        limit_choices_to={'role_type': RoleType.STAFF.value}
    )

    def __str__(self):
        return self.event_name
    
class EmailTemplate(models.Model):
    subject = models.CharField(max_length=255)
    body = models.TextField()
    receiver_group = models.TextField(
        choices=RoleType.choices(),
        blank=True,
        null=True
    )
    recipient_list = models.TextField()

    def __str__(self):
        return self.subject