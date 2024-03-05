from django.urls import path
from .views import get_blog, get_home_page, get_contacts, get_experts, get_documentation, get_library, get_news, ThisNewsDetailView, ThisBlogDetailView

urlpatterns = [
    path('', get_home_page),
    path('contacts/', get_contacts),
    path('experts/', get_experts),
    path('documentation/', get_documentation),
    path('blog/', get_blog),
    path('news/', get_news),
    path('library/', get_library),
    path('this_news/<pk>/', ThisNewsDetailView.as_view(), name='this_news'),
    path('this_blog/<pk>/', ThisBlogDetailView.as_view(), name='this_blog'),
]