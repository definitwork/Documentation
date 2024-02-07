from rest_framework import generics
from rest_framework.pagination import LimitOffsetPagination
from rest_framework import filters
from django_filters import rest_framework as django_filters

from .models import NewsSection, News
from .serializers import NewsSectionSerializers, NewsSerializers, AllNewsTitleSerializers


class NewsSectionAPIView(generics.ListAPIView):
    """ Выводим все секций новостей """
    queryset = NewsSection.objects.all()
    serializer_class = NewsSectionSerializers


class AllNewsTitleListAPIView(generics.ListAPIView):
    """ Выводим заголовки новостей """
    queryset = News.objects.prefetch_related('news_sections').order_by(
        '-date_published')  # Сортировка в обратном порядке по полю date_published
    serializer_class = AllNewsTitleSerializers
    pagination_class = LimitOffsetPagination  # Пагинация
    pagination_class.default_limit = 20  # Лимит на страницу


class AllNewsListAPIView(generics.ListAPIView):
    """ Выводим все новости """
    queryset = News.objects.prefetch_related('news_sections').order_by(
        '-date_published')  # Сортировка в обратном порядке по полю date_published
    serializer_class = NewsSerializers
    pagination_class = LimitOffsetPagination  # Пагинация
    pagination_class.default_limit = 10  # Лимит на страницу
    # filter_backends = [filters.SearchFilter, django_filters.DjangoFilterBackend]
    # search_fields = ['blog_title', 'blog_body']  # Поля, по которым будет выполняться поиск
    # filterset_fields = {
    #     'date_published': ['lte', 'gte']  # Поля для фильтрации по дате
    # }


class ThisNewsListAPIView(generics.RetrieveAPIView):
    """ Выводим одну новость """
    queryset = News.objects.all()
    serializer_class = NewsSerializers
    lookup_field = 'id'  # Установите поле модели в качестве идентификатора
    lookup_url_kwarg = 'news_id'  # Установите lookup_url_kwarg в 'user_id'


class ThisSectionNewsListAPIView(generics.ListAPIView):
    """ Выводим все новости секции """
    serializer_class = NewsSerializers
    pagination_class = LimitOffsetPagination  # Пагинация
    pagination_class.default_limit = 10  # Лимит на страницу
    # filter_backends = [filters.SearchFilter, django_filters.DjangoFilterBackend]
    # search_fields = ['blog_title', 'blog_body']  # Поля, по которым будет выполняться поиск
    # filterset_fields = {
    #     'date_published': ['lte', 'gte']  # Поля для фильтрации по дате
    # }

    def get_queryset(self):
        # Получаем значение параметра news_sections_id из URL
        news_sections_id = self.kwargs['news_sections_id']
        # Фильтруем новости по полю news_sections, используя значение заголовка секции
        queryset = News.objects.prefetch_related('news_sections').filter(news_sections__id=news_sections_id).order_by(
            '-date_published')
        return queryset
