from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from django import forms
from django.contrib.auth import get_user_model

User = get_user_model()


class CustomUserCreationForm(UserCreationForm):
    email = forms.EmailField()

    class Meta:
        model = User
        fields = '__all__'


class CustomUserChangeForm(UserChangeForm):
    class Meta:
        model = User
        fields = '__all__'