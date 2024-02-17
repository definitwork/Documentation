from django.shortcuts import render
from main_page_information.models import AboutResource, SomeFacts
from copyright_contacts.models import Contacts, Copyright


def get_home_page(request):
    content = {}

    documentation = AboutResource.objects.all()
    actuality = SomeFacts.objects.all()
    copyright_queryset = Copyright.objects.all()
    contacts_queryset = Contacts.objects.all()

    contacts_names = contacts_queryset.filter(contact_title__startswith="Написать")
    contacts_icons = contacts_queryset.exclude(contact_title__startswith="Написать")

    content['documentation'] = documentation[0]
    content['actuality'] = actuality
    content['copyright'] = copyright_queryset[0]
    content['contacts_icons'] = contacts_icons
    content['contacts_names'] = contacts_names
    content['referer'] = request.META.get('HTTP_HOST')

    return render(request, template_name='home_page.html', context=content)

def get_contacts(request):

    return render(request, template_name='contacts.html')

def get_experts(request):

    return render(request, template_name='experts.html')

def get_documentation(request):

    return render(request, template_name='documentation.html')

def password_reset(request, uidb64, token):

    return render(request, template_name='password_reset.html')