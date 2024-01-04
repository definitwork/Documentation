from django.urls import path

from .views import CombinedListAPIView, ContactsListAPIView, CombinedAPIView

urlpatterns = [
    path('copyright/', CombinedListAPIView.as_view(), name='copyright'),
    path('contacts/', ContactsListAPIView.as_view(), name='contacts'),
    path('copyright_and_contacts/', CombinedAPIView.as_view(), name='contacts'),
]
