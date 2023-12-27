from django.shortcuts import render
from rest_framework.generics import ListAPIView
from rest_framework.views import APIView

from .models import AboutResource
from .serializers import AboutResourceSerializer


class AboutResourceView(ListAPIView):
    serializer_class = AboutResourceSerializer
    queryset = AboutResource.objects.all()

