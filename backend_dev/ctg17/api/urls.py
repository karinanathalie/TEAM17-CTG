from django.urls import path
from . import views

# URL configuration
urlpatterns = [
    path('hello/', views.say_hello),
    path('events/', views.get_all_events, name="event-list"),
    path('events/<int:event_id>/', views.get_event_details, name="event-detail"),
    path('events/create/', views.create_event, name="create-event")
]