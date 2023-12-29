from django.urls import path

from main_page_information.views import AboutResourceView

urlpatterns = [
    path('aboutresource/', AboutResourceView.as_view(), name='Resource')

]
