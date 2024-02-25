from django.urls import path

from .views import CategoryContentAPIView, DocCategoryAPIView, BookAPIView, UserPaidContentAPIView

urlpatterns = [
    path('category_content/', CategoryContentAPIView.as_view(), name='category_content'),
    path('doc_category/', DocCategoryAPIView.as_view(), name='doc_category'),
    path('books/', BookAPIView.as_view(), name='books'),
    path('orders/', UserPaidContentAPIView.as_view(), name='orders'),

]
