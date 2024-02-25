from django.urls import path

from .views import CategoryContentAPIView, DocCategoryAPIView, BookAPIView, UserPaidContentAPIView, \
    OneCategoryContentAPIView, OneBookAPIView

urlpatterns = [
    path('doc_category/', DocCategoryAPIView.as_view(), name='doc_category'),
    path('category_content/', CategoryContentAPIView.as_view(), name='category_content'),
    path('category_content/<int:pk>/', OneCategoryContentAPIView.as_view()),
    path('books/', BookAPIView.as_view(), name='books'),
    path('books/<int:pk>/', OneBookAPIView.as_view()),
    path('orders/', UserPaidContentAPIView.as_view(), name='orders'),

]
