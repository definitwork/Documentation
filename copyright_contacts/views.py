from rest_framework import generics

from .models import Copyright, Contacts
from .serializers import CopyrightSerializers, ContactsSerializers


class CopyrightAPIList(generics.ListAPIView):
    queryset = Copyright.objects.all()
    serializer_class = CopyrightSerializers


class ContactsAPIList(generics.ListAPIView):
    queryset = Contacts.objects.all()
    serializer_class = ContactsSerializers
