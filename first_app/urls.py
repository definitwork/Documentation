from django.urls import path
from .views import get_first_product, ProductAPIView

urlpatterns = [
    path('', get_first_product),
    path('api/', ProductAPIView.as_view()),

]