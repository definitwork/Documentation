import django_filters
from .models import News

class MyModelFilter(django_filters.FilterSet):
    class Meta:
        model = News
        fields = {
            'blog_title': ['exact', 'icontains'],
            'blog_body': ['exact', 'icontains'],
            # Другие поля модели, которые вы хотите фильтровать
        }
