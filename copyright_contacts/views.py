from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Copyright, Contacts
from .serializers import CopyrightSerializers, ContactsSerializers, CombinedSerializer


class CombinedListAPIView(generics.ListAPIView):
    queryset = Copyright.objects.all()
    serializer_class = CopyrightSerializers


class ContactsListAPIView(generics.ListAPIView):
    queryset = Contacts.objects.all()
    serializer_class = ContactsSerializers


@api_view(['GET'])
def get_copyright_and_contacts(request):
    copyright = Copyright.objects.all()
    serializer_copyright = CopyrightSerializers(copyright, many=True)
    contacts = Contacts.objects.all()
    serializer_contacts = ContactsSerializers(contacts, many=True)
    return Response({'copyright': serializer_copyright.data, 'contacts': serializer_contacts.data})


class CombinedAPIView(APIView):
    def get(self, request):
        copyright_queryset = Copyright.objects.all()
        contacts_queryset = Contacts.objects.all()

        copyright_serializer = CopyrightSerializers(copyright_queryset, many=True)
        contacts_serializer = ContactsSerializers(contacts_queryset, many=True)

        combined_data = {
            'copyright': copyright_serializer.data,
            'contacts': contacts_serializer.data
        }

        return Response(combined_data)


class CombinedListView(generics.ListAPIView):
    serializer_class = CopyrightSerializers

    def get_queryset(self):
        copyright_queryset = Copyright.objects.all()
        contacts_queryset = Contacts.objects.all()
        queryset = list(copyright_queryset) + list(contacts_queryset)
        print(queryset)
        return queryset

