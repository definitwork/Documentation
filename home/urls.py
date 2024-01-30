from django.urls import path
from .views import get_home_page, get_contacts, get_experts, get_documentation, password_reset

urlpatterns = [
    path('', get_home_page),
    path('contacts/', get_contacts),
    path('experts/', get_experts),
    path('documentation/', get_documentation),
    path('password-reset/<str:uidb64>/<str:token>/', password_reset, name='password_reset'),
]