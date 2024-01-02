from django.urls import path

from user_profile.views import UserRegistrationAPIView

urlpatterns = [
    path('register/', UserRegistrationAPIView.as_view(), name='register')
]