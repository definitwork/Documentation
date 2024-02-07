from rest_framework import serializers
from django.utils import formats

from .models import BlogsSection, Blogs


class BlogsSectionSerializers(serializers.ModelSerializer):
    class Meta:
        model = BlogsSection
        fields = ['title', ]


class AllBlogsTitleSerializers(serializers.ModelSerializer):
    class Meta:
        model = Blogs
        fields = ['blog_title', ]


class BlogsSerializers(serializers.ModelSerializer):

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['date_published'] = formats.date_format(instance.date_published, "d-m-Y H:i")
        return representation

    class Meta:
        model = Blogs
        fields = ['blog_title', 'blog_body', 'blog_sections', 'blog_img', 'blog_video', 'cover_img', 'date_published']
        depth = 1
