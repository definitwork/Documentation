from rest_framework import serializers
from django.utils import formats

from .models import NewsSection, News


class NewsSectionSerializers(serializers.ModelSerializer):
    class Meta:
        model = NewsSection
        fields = ['title', ]


class AllNewsTitleSerializers(serializers.ModelSerializer):
    class Meta:
        model = News
        fields = ['news_title', ]


class NewsSerializers(serializers.ModelSerializer):
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['date_published'] = formats.date_format(instance.date_published, "d-m-Y H:i")
        return representation

    class Meta:
        model = News
        fields = ['news_title', 'news_body', 'news_sections', 'news_img', 'news_video', 'cover_img', 'date_published']
        depth = 1
