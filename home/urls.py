from django.urls import path
from .views import get_home_page

urlpatterns = [
    path('', get_home_page),
]