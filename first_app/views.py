from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
import getpass
from .models import Product
from .serializers import ProductSerializer


def get_first_product(request):
    first_product = Product.objects.first()
    context = {'product': first_product, 'os_user': getpass.getuser().capitalize()}
    return render(request, template_name='first_app_home_page.html', context=context)


class ProductAPIView(APIView):
    def get(self, request):
        first_product = Product.objects.first()
        return Response(ProductSerializer(first_product).data)
