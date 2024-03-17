from copyright_contacts.models import Contacts, Copyright


def header_footer_context(request):
    content = {}

    copyright_queryset = Copyright.objects.all()
    contacts_queryset = Contacts.objects.all()

    contacts_names = contacts_queryset.filter(contact_title__startswith="Написать")
    contacts_icons = contacts_queryset.exclude(contact_title__startswith="Написать")

    content['copyright'] = copyright_queryset.first()
    content['contacts'] = contacts_queryset
    content['contacts_icons'] = contacts_icons
    content['contacts_names'] = contacts_names
    content['referer'] = request.META.get('HTTP_HOST')
    # print(content['referer'])

    return content
