from django.urls import path
from . import views

# URL configuration
urlpatterns = [
    path('hello/', views.say_hello),
    path('user/register', views.register_user, name="register-user"),
    path('staffuser/register', views.create_staffuser, name="register-staffuser"),
    path('user/login', views.login_user, name="login-user"),
    path('user/logout', views.logout_user, name="logout-user"),
    
    path('events/', views.get_all_events, name="event-list"),
    path('events/<int:event_id>/', views.get_event_details, name="event-detail"),
    path('events/create/', views.create_event, name="create-event"),
    path('event/<int:event_id>/register', views.event_registration, name = "event-registration"),
    path('event/<int:event_id>/register/confirmation', views.event_registration_confirmation, name = "event-registration-confirm"),
    path('event/<int:event_id>/unregister', views.unregister_from_event, name="unregister-from-event"),
    path('event/<int:event_id>/sendreminder-email', views.send_event_reminder_email, name="send-event-reminder-email"),
    path('event/<int:event_id>/sendreminder-whatsapp', views.send_event_reminder_whatsapp, name="send-event-reminder-whatsapp"),
    
    path('user/<int:user_id>/', views.get_user_details, name="user-detail"),
    path('user/<int:user_id>/registrations', views.get_user_registrations, name="user-registrations"),
    path('user/<int:user_id>/badges', views.get_user_badges, name="user-achievement"),

    path('profile/participants', views.get_all_participant, name="profile-participants-list"),
    path('profile/volunteers', views.get_all_volunteer, name="profile-volunteers-list"),
    path('profile/staffs', views.get_all_staff, name="profile-staffs-list"),
    path('profile/staff/create/', views.create_staff, name="create-profile"),

    path('application/participants', views.get_all_participant_application, name="application-participants-list"),
    path('application/volunteers', views.get_all_volunteer_application, name="application-volunteer-list"),
    path('application/update', views.update_application, name="application-update"),

    path('application/create/participants', views.create_application, name="create-application"),
    path('application/create/volunteers', views.create_volunteer_application, name="create-volunteer-application"),

    path('badge/create', views.create_badge, name="create-badge"),
    path('badge/all', views.get_all_badges, name="all-badge"),

    path('reminder/emailtemplates', views.get_all_email_templates, name="get-all-email-templates"),
    path('reminder/sendemail', views.send_mass_email, name="send-mass-email"),
    path('reminder/emailtemplate/<int:template_id>', views.send_emails_from_template, name="send-email-from-template"),
    path('reminder/whatsapptemplates', views.get_all_whatsapp_templates, name="get-all-whatsapp-templates"),
    path('reminder/sendwhatsapp', views.send_mass_whatsapp, name="send-mass-whatsapp"),
    path('reminder/whatsapptemplate/<int:template_id>', views.send_whatsapp_from_template, name="send-whatsapp-from-template"),

    path('analytics/attendance', views.get_attendance_analytics, name='get-attendance-analytics'),
    path('analytics/demographic', views.get_demographic_analytics, name="get-demographic-analytics"),
    path('analytics/quota', views.get_quota_analytics, name="get-quota-analytics"),

    path('file/<str:path>/', views.file_show, name="file-show"),
    path('pic/<str:image_filename>/', views.pic_show, name="pic-show")
]