from rest_framework import generics
from .models import DocCategory, SubCategory, CategoryContent, Book, UserPaidContent
from .serializers import DocCategorySerializer, CategoryContentSerializer, BookSerializer, UserPaidContentSerializer, \
    SubCategorySerializer


class DocCategoryAPIView(generics.ListAPIView):
    """ Все категории документации """
    queryset = DocCategory.objects.all()
    serializer_class = DocCategorySerializer


class SubCategoryAPIView(generics.ListAPIView):
    """ Все подкатегории документации """
    queryset = SubCategory.objects.all()
    serializer_class = SubCategorySerializer


class SubCategoriesInDocCategoryAPIView(generics.ListAPIView):
    """ Все подкатегории одной категории """
    serializer_class = SubCategorySerializer

    def get_queryset(self):
        doc_category_slug = self.kwargs['doc_category_slug']
        queryset = SubCategory.objects.select_related('doc_category').filter(
            doc_category__slug=doc_category_slug)
        return queryset


class CategoryContentsInSubCategoryAPIView(generics.ListAPIView):
    """ Все статьи одной подкатегории """
    serializer_class = CategoryContentSerializer

    def get_queryset(self):
        sub_category_slug = self.kwargs['sub_category_slug']
        queryset = CategoryContent.objects.prefetch_related('sub_categories').filter(
            sub_categories__slug=sub_category_slug)
        return queryset


class CategoryContentAPIView(generics.ListAPIView):
    """ Все статьи из раздела документации """
    queryset = CategoryContent.objects.all()
    serializer_class = CategoryContentSerializer


class OneCategoryContentAPIView(generics.RetrieveAPIView):
    """ Одна статья подкатегории документации """
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
