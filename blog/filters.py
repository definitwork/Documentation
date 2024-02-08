from django_filters import FilterSet, CharFilter, DateTimeFilter, DateFilter, DateRangeFilter
from .models import Blogs


class BlogsFilter(FilterSet):
    # blog_title = CharFilter(lookup_expr='icontains', label='Заголовок блога')
    # blog_body = CharFilter(lookup_expr='icontains', label='Содержание блога')
    date_published = DateTimeFilter(
        field_name='date_published',
        lookup_expr='date',
        label='Дата публикации (дд-мм-гггг)',
        input_formats=['%d-%m-%Y']
    )
    # date_published = DateFilter(
    #     field_name='date_published',
    #     label='Дата публикации (дд-мм-гггг)',
    #     input_formats=['%d-%m-%Y']
    # )
    # date_published = DateRangeFilter(
    #     field_name='date_published',
    #     label='Дата публикации'
    # )

    class Meta:
        model = Blogs
        # fields = ['blog_title', 'blog_body', 'date_published']
        fields = ['date_published']
