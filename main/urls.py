from django.urls import path
from .views import get_documentation_article, get_blog, get_documentation_cat, get_documentation_subcat, get_home_page, get_contacts, get_experts, get_documentation, get_library, get_news, ThisNewsDetailView, ThisBlogDetailView

urlpatterns = [
    path('', get_home_page),
    path('contacts/', get_contacts),
    path('experts/', get_experts),
    path('documentation/', get_documentation),
    path('documentation/<slug:doc_category_slug>/', get_documentation_cat),
    path('documentation/<slug:doc_category_slug>/<slug:sub_category_slug>/', get_documentation_subcat),
    path('documentation/<slug:doc_category_slug>/<slug:sub_category_slug>/<int:pk>/', get_documentation_article),
    path('blog/', get_blog),
    path('news/', get_news),
    path('library/', get_library),
    path('this_news/<pk>/', ThisNewsDetailView.as_view(), name='this_news'),
    path('this_blog/<pk>/', ThisBlogDetailView.as_view(), name='this_blog'),
]