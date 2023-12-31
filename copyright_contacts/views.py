from rest_framework import generics

from .models import Copyright
from .serializers import CopyrightSerializers


class CopyrightAPIList(generics.ListAPIView):
    queryset = Copyright.objects.all()
    serializer_class = CopyrightSerializers
