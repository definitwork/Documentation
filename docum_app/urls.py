from django.urls import path

from .views import (CategoryContentAPIView,
                    DocCategoryAPIView,
                    BookAPIView,
                    UserPaidContentAPIView)

urlpatterns = [
    path('category_content/', CategoryContentAPIView.as_view(), name='category_content'),
    path('doc_category/', DocCategoryAPIView.as_view(), name='doc_category'),
    path('books/', BookAPIView.as_view(), name='books'),
    path('orders/', UserPaidContentAPIView.as_view(), name='orders'),
    # path('this_news/<int:news_id>/', ThisNewsListAPIView.as_view(), name='this_news'),  # Конкретная новость
    # path('this_section_news/<int:news_sections_id>/', ThisSectionNewsListAPIView.as_view(),
    #      name='this_section_news'),  # Новости определенной секции
]
