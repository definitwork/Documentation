from django.shortcuts import render
from django.views.generic import DetailView
from docum_app.models import CategoryContent, DocCategory, SubCategory
from main_page_information.models import AboutResource, SomeFacts
from copyright_contacts.models import Contacts, Copyright
from news.models import News, NewsSection
from blog.models import Blogs, BlogsSection
from user_profile.models import User


def get_home_page(request):
    content = {}

    documentation = AboutResource.objects.all()
    actuality = SomeFacts.objects.all()

    content['documentation'] = documentation.first()
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

    docum_cat = DocCategory.objects.all()
    if docum_cat:
        for i in range(len(docum_cat)):
            if i % 2 == 0:
                docum_cat[i].revers = ''
            else:
                docum_cat[i].revers = 'revers'
        content['docum_cat'] = docum_cat
    print(docum_cat)
    return render(request, template_name='docum/docum.html', context=content)


def get_documentation_cat(request, doc_category_slug):
    content = {}

    docum_cat = DocCategory.objects.all()
    if docum_cat:
        for i in range(len(docum_cat)):
            if doc_category_slug == docum_cat[i].slug:
                docum_cat[i].active = 'active'
        content['docum_cat'] = docum_cat

    content['docum_subcat'] = SubCategory.objects.select_related('doc_category').filter(
            doc_category__slug=doc_category_slug)
    
    content['doc_category_slug'] = doc_category_slug

    
    return render(request, template_name='docum/docum_cat.html', context=content)

def get_documentation_subcat(request, doc_category_slug, sub_category_slug):
    content = {}
    crubs = SubCategory.objects.select_related('doc_category').filter(
            doc_category__slug=doc_category_slug)
    if crubs:
        content['doc_category'] = crubs[0].doc_category
        content['sub_category'] = crubs[0].subcategory_title
        content['doc_category_slug'] = doc_category_slug
    return render(request, template_name='docum/docum_subcat.html', context=content)

def get_documentation_article(request, doc_category_slug, sub_category_slug, pk):
    content = {}

    content['article'] = CategoryContent.objects.filter(id=pk)[0]
    return render(request, template_name='docum/docum_article.html', context=content)


def get_blog(request):
    content = {}

    blogs_sections = BlogsSection.objects.all()
    blogs__aricles = Blogs.objects.prefetch_related('blog_sections').order_by(
        '-date_published')

    content['blogs_sections'] = blogs_sections
    content['blogs__aricles'] = blogs__aricles

    return render(request, template_name='blog/blog.html', context=content)


def get_news(request):
    content = {}

    news_sections = NewsSection.objects.all()
    all_news = News.objects.prefetch_related('news_sections').order_by(
        '-date_published')
    content['news_sections'] = news_sections
    content['first_news'] = all_news[0]
    content['next_four_news'] = all_news[1:4]

    return render(request, template_name='news/news.html', context=content)


def get_library(request):
    content = {}

    return render(request, template_name='library/library.html', context=content)


class ThisNewsDetailView(DetailView):
    model = News
    template_name = 'news/this_news.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["news_list"] = News.objects.all()
        return context


class ThisBlogDetailView(DetailView):
    model = Blogs
    template_name = 'blog/this_blog_article.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["blogs_list"] = Blogs.objects.all()
        return context

