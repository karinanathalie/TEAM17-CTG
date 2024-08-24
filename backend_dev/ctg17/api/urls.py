from django.urls import path
from . import views

# URL configuration
urlpatterns = [
    path('hello/', views.say_hello),
    path('user/register', views.register_user, name="register-user"),
    path('staffuser/register', views.create_staffuser, name="register-staffuser"),
    path('user/login', views.login_user, name="login-user"),
    
    path('events/', views.get_all_events, name="event-list"),
    path('events/<int:event_id>/', views.get_event_details, name="event-detail"),
    path('events/create/', views.create_event, name="create-event"),
    path('event/<int:event_id>/register', views.event_registration, name = "event-registration"),
    path('event/<int:event_id>/register/confirmation', views.event_registration_confirmation, name = "event-registration-confirm"),
    path('event/<int:event_id>/sendreminder', views.send_event_reminder, name="send-event-reminder"),
    
    path('user/<int:user_id>/', views.get_user_details, name="user-detail"),
    path('user/<int:user_id>/registrations', views.get_user_registrations, name="user-registrations"),
    path('user/<int:user_id>/badges', views.get_user_badges, name="user-achievement"),

    path('profile/participants', views.get_all_participant, name="profile-participants-list"),
    path('profile/volunteers', views.get_all_volunteer, name="profile-volunteers-list"),
    path('profile/staffs', views.get_all_staff, name="profile-staffs-list"),

    path('application/participants', views.get_all_participant_application, name="application-participants-list"),
    path('application/volunteers', views.get_all_volunteer_application, name="profile-volunteers-list"),
]