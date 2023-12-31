from django.urls import path

from .views import CombinedListAPIView, ContactsListAPIView, get_copyright_and_contacts, CombinedAPIView, CombinedListView

urlpatterns = [
    path('copyright/', CombinedListAPIView.as_view(), name='copyright'),
    path('contacts/', ContactsListAPIView.as_view(), name='contacts'),

    path('copyright&contacts1', get_copyright_and_contacts, name='contacts'),
    path('copyright&contacts2', CombinedAPIView.as_view(), name='contacts'),

    path('copyright&contacts3', CombinedListView.as_view(), name='copyright&contacts'),
]
