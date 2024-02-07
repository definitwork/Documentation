from rest_framework import generics
from rest_framework.pagination import LimitOffsetPagination
from rest_framework import filters
from django_filters import rest_framework as filters

from .filters import MyModelFilter
from .models import BlogsSection, Blogs
from .serializers import BlogsSectionSerializers, BlogsSerializers, AllBlogsTitleSerializers


class BlogsSectionAPIView(generics.ListAPIView):
    """ Выводим все секций блогов """
    queryset = BlogsSection.objects.all()
    serializer_class = BlogsSectionSerializers


class AllBlogsTitleListAPIView(generics.ListAPIView):
    """ Выводим заголовки блогов """
    queryset = Blogs.objects.prefetch_related('blog_sections').order_by(
        '-date_published')  # Сортировка в обратном порядке по полю date_published
    serializer_class = AllBlogsTitleSerializers
    pagination_class = LimitOffsetPagination  # Пагинация
    pagination_class.default_limit = 20  # Лимит на страницу


class AllBlogsListAPIView(generics.ListAPIView):
    """ Выводим все блоги """
    queryset = Blogs.objects.prefetch_related('blog_sections').order_by(
        '-date_published')  # Сортировка в обратном порядке по полю date_published
    serializer_class = BlogsSerializers
    pagination_class = LimitOffsetPagination  # Пагинация
    pagination_class.default_limit = 10  # Лимит на страницу
    filterset_class = MyModelFilter


class ThisBlogListAPIView(generics.RetrieveAPIView):
    """ Выводим одни блог """
    queryset = Blogs.objects.all()
    serializer_class = BlogsSerializers
    lookup_field = 'id'  # Установите поле модели в качестве идентификатора
    lookup_url_kwarg = 'blog_id'  # Установите lookup_url_kwarg в 'user_id'


class ThisSectionBlogsListAPIView(generics.ListAPIView):
    """ Выводим все блоги секции """
    serializer_class = BlogsSerializers
    pagination_class = LimitOffsetPagination  # Пагинация
    pagination_class.default_limit = 5  # Лимит на страницу
    # filter_backends = [filters.SearchFilter, django_filters.DjangoFilterBackend]
    # search_fields = ['blog_title', 'blog_body']  # Поля, по которым будет выполняться поиск
    # filterset_fields = {
    #     'date_published': ['lte', 'gte']  # Поля для фильтрации по дате
    # }

    def get_queryset(self):
        # Получаем значение параметра blog_sections_id из URL
        news_sections_id = self.kwargs['blog_sections_id']
        # Фильтруем новости по полю news_sections, используя значение заголовка секции
        queryset = Blogs.objects.prefetch_related('blog_sections').filter(blog_sections__id=news_sections_id).order_by(
            '-date_published')
        return queryset
