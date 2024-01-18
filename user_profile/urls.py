from django.urls import path

from user_profile.views import UserRegistrationAPIView, LoginAPIView, LogoutAPIView, EmailConfirmationSentView, \
    EmailConfirmationView, EmailConfirmationSuccessView, EmailConfirmationErrorView

urlpatterns = [
    path('register/', UserRegistrationAPIView.as_view(), name='register'),
    path('login/', LoginAPIView.as_view(), name='login'),
    path('logout/', LogoutAPIView.as_view(), name='logout'),
    path('email-confirmation-sent/', EmailConfirmationSentView.as_view(), name='email_confirmation_sent'),
    path('confirm-email/<str:uidb64>/<str:token>/', EmailConfirmationView.as_view(), name='email_confirmation'),
    path('email-confirmation-success/', EmailConfirmationSuccessView.as_view(), name='email_confirmation_success'),
    path('email-confirmation-error/', EmailConfirmationErrorView.as_view(), name='email_confirmation_error')
]