from django.shortcuts import render
from main_page_information.models import AboutResource, SomeFacts
from copyright_contacts.models import Contacts, Copyright
from news.models import News, NewsSection
from user_profile.models import User


def get_home_page(request):
    content = {}

    documentation = AboutResource.objects.all()
    actuality = SomeFacts.objects.all()
    
    content['documentation'] = documentation[0]
    content['actuality'] = actuality
    
    return render(request, template_name='home_page.html', context=content)

def get_contacts(request):
    content = {}


    return render(request, template_name='contacts.html', context=content)

def get_experts(request):
    content = {}
    

    return render(request, template_name='experts.html', context=content)

def get_documentation(request):
    content = {}
    
    return render(request, template_name='documentation.html', context=content)

def get_blog(request):
    content = {}
    
    return render(request, template_name='blog.html', context=content)

def get_news(request):
    content = {}

    news_sections = NewsSection.objects.all()
    all_news = News.objects.prefetch_related('news_sections').order_by(
        '-date_published')

    content['news_sections'] = news_sections
    content['next_four_news'] = all_news[1:4]
    content['first_news'] = all_news[0]
    return render(request, template_name='news.html', context=content)

def get_library(request):
    content = {}
    
    return render(request, template_name='library.html', context=content)
