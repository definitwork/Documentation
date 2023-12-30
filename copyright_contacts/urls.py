from django.urls import path

from .views import CopyrightAPIList

urlpatterns = [
    path('copyright/', CopyrightAPIList.as_view(), name='copyright'),
    # path('contacts/', XXX.as_view(), name='contacts'),
]