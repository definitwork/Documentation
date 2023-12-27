from rest_framework import serializers
from .models import AboutResource


class AboutResourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = AboutResource
        fields = '__all__'
