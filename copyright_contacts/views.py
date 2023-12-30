from rest_framework import generics

from copyright_contacts.models import Copyright
from copyright_contacts.serializers import CopyrightSerializers


class CopyrightAPIList(generics.ListAPIView):
    queryset = Copyright.objects.all()
    serializer_class = CopyrightSerializers
