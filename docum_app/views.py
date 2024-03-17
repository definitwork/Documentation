from rest_framework import generics
from .models import DocCategory, CategoryContent, Book, UserPaidContent
from .serializers import DocCategorySerializer, CategoryContentSerializer, BookSerializer, UserPaidContentSerializer


class DocCategoryAPIView(generics.ListAPIView):
    """ Выводим все категории документации """
    queryset = DocCategory.objects.all()
    serializer_class = DocCategorySerializer


class OneDocCategoryListAPIView(generics.ListAPIView):
    """ Все статьи одной категории """
    serializer_class = CategoryContentSerializer

    def get_queryset(self):
        doc_category_slug = self.kwargs['doc_category_slug']
        queryset = CategoryContent.objects.prefetch_related('doc_categories').filter(doc_categories__slug=doc_category_slug)
        return queryset


class CategoryContentAPIView(generics.ListAPIView):
    """ Выводим все статьи из раздела документации """
    queryset = CategoryContent.objects.all()
    serializer_class = CategoryContentSerializer


class OneCategoryContentAPIView(generics.RetrieveAPIView):
    """ Выводим одну статью из раздела документации """
    queryset = CategoryContent.objects.all()
    serializer_class = CategoryContentSerializer


class BookAPIView(generics.ListAPIView):
    """ Выводим все книги """
    queryset = Book.objects.all()
    serializer_class = BookSerializer


class OneBookAPIView(generics.RetrieveAPIView):
    """ Выводим одну книгу """
    queryset = Book.objects.all()
    serializer_class = BookSerializer


# пока не ясно, что и как продавать
class UserPaidContentAPIView(generics.ListAPIView):
    """ Выводим все оформленные пакеты подписок """
    queryset = UserPaidContent.objects.all()
    serializer_class = UserPaidContentSerializer
