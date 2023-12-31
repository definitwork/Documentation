from django.urls import path

from .views import get_copyright_and_contacts, CombinedAPIView

urlpatterns = [
    path('copyright/', CombinedAPIView.as_view(), name='copyright'),
]
