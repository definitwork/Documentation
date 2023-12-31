from django.urls import path

from .views import CopyrightAPIList, ContactsAPIList

urlpatterns = [
    path('copyright/', CopyrightAPIList.as_view(), name='copyright'),
    path('contacts/', ContactsAPIList.as_view(), name='contacts'),
]