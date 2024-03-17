from rest_framework import serializers
from django.utils import formats

from .models import DocCategory, SubCategory, CategoryContent, Book, UserPaidContent


class DocCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = DocCategory
        fields = '__all__'


class SubCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = SubCategory
        fields = '__all__'


class CategoryContentSerializer(serializers.ModelSerializer):
    class Meta:
        model = CategoryContent
        fields = '__all__'


class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = '__all__'


class UserPaidContentSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserPaidContent
        fields = '__all__'
