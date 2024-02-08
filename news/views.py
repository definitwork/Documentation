from rest_framework import generics
from rest_framework.pagination import LimitOffsetPagination
from rest_framework import filters

from .models import NewsSection, News
from .serializers import NewsSectionSerializer, NewsSerializer, AllNewsTitleSerializer


class NewsSectionAPIView(generics.ListAPIView):
    """ Выводим все секций новостей """
    queryset = NewsSection.objects.all()
    serializer_class = NewsSectionSerializer


class AllNewsTitleListAPIView(generics.ListAPIView):
    """ Выводим заголовки новостей """
    queryset = News.objects.prefetch_related('news_sections').order_by(
        '-date_published')  # Сортировка в обратном порядке по полю date_published
    serializer_class = AllNewsTitleSerializer
    pagination_class = LimitOffsetPagination  # Пагинация


class AllNewsListAPIView(generics.ListAPIView):
    """ Выводим все новости """
    queryset = News.objects.prefetch_related('news_sections').order_by(
        '-date_published')  # Сортировка в обратном порядке по полю date_published
    serializer_class = NewsSerializer
    pagination_class = LimitOffsetPagination  # Пагинация
    filter_backends = [filters.SearchFilter]
    search_fields = ['blog_title', 'blog_body']  # Поля, по которым будет выполняться поиск



class ThisNewsListAPIView(generics.RetrieveAPIView):
    """ Выводим одну новость """
    queryset = News.objects.all()
    serializer_class = NewsSerializer
    lookup_field = 'id'  # Установите поле модели в качестве идентификатора
    lookup_url_kwarg = 'news_id'  # Установите lookup_url_kwarg в 'user_id'


class ThisSectionNewsListAPIView(generics.ListAPIView):
    """ Выводим все новости секции """
    serializer_class = NewsSerializer
    pagination_class = LimitOffsetPagination  # Пагинация
    filter_backends = [filters.SearchFilter]
    search_fields = ['blog_title', 'blog_body']  # Поля, по которым будет выполняться поиск

    def get_queryset(self):
        # Получаем значение параметра news_sections_id из URL
        news_sections_id = self.kwargs['news_sections_id']
        # Фильтруем новости по полю news_sections, используя значение заголовка секции
        queryset = News.objects.prefetch_related('news_sections').filter(news_sections__id=news_sections_id).order_by(
            '-date_published')
        return queryset
