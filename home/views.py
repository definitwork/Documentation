from django.shortcuts import render


def get_home_page(request):
    
    return render(request, template_name='home_page.html')

def get_contacts(request):

    return render(request, template_name='contacts.html')

def get_experts(request):

    return render(request, template_name='experts.html')

def get_documentation(request):

    return render(request, template_name='documentation.html')

def password_reset(request, uidb64, token):

    return render(request, template_name='password_reset.html')