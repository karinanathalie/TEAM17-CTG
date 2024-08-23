from django.urls import path
from . import views

# URL configuration
urlpatterns = [
    path('hello/', views.say_hello),
    path('user/register', views.register_user, name="register-user"),
    path('staffuser/register', views.create_staffuser, name="register-staffuser"),
    path('events/', views.get_all_events, name="event-list"),
    path('events/<int:event_id>/', views.get_event_details, name="event-detail"),
    path('events/create/', views.create_event, name="create-event"),
    path('event/<int:event_id>/register', views.event_registration, name = "event-registration")
]