import uuid
from django.db import models
from django.contrib.auth.models import User
from api.constants import Gender, RoleType

class Profile(models.Model):
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
    )
    name = models.CharField(max_length=225)
    age = models.PositiveIntegerField()
    gender = models.TextField(
        choices=Gender.choices(),
    )
    role_type = models.TextField(
        choices=RoleType.choices(),
    )
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.name} ({self.user.username})"
    

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
    role_type = models.TextField(
        choices=RoleType.choices()
    )

    def __str__(self):
        return f"{self.user_profile.name} applied as {self.role_type} for {self.event.event_name}"


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
    staff = models.ManyToManyField(
        'Profile', 
        through='Application', 
        related_name='managed_events',
        limit_choices_to={'role_type': RoleType.STAFF.value}
    )

    def __str__(self):
        return self.event_name


class Training(models.Model):
    training_name = models.CharField(max_length=255)
    training_description = models.TextField(null=True, blank=True)
    training_link = models.CharField(max_length=255)
    skillset = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.training_name
