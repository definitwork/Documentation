from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.tokens import default_token_generator
from django.contrib.sites.models import Site
from django.core.mail import send_mail
from django.shortcuts import redirect
from django.urls import reverse_lazy
from django.utils.encoding import force_bytes, force_str
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.views.generic import TemplateView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, serializers
from django.contrib.auth.models import User
from django.conf import settings

from user_profile.serializers import UserRegistrationSerializer, LoginSerializer, EmailSerializer, \
    ResetPasswordSerializer


class UserRegistrationAPIView(APIView):
    def post(self, request):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            username = serializer.validated_data.get("username")
            email = serializer.validated_data.get("email")
            password = serializer.validated_data.get("password")
            password2 = serializer.validated_data.get("password2")
            if User.objects.filter(username=username).exists():
                return Response(status=status.HTTP_400_BAD_REQUEST)
            if User.objects.filter(email=email).exists():
                return Response(status=status.HTTP_400_BAD_REQUEST)
            if password != password2:
                return Response({'error': 'Пароли не совпадают'}, status=status.HTTP_400_BAD_REQUEST)
            user = User(username=username, email=email, password=password, is_active=False)
            user.set_password(password)
            user.save()

            '''Функционал для отправки письма и генерации токена'''
            token = default_token_generator.make_token(user)
            uid = urlsafe_base64_encode(force_bytes(user.pk))
            activation_url = reverse_lazy('email_confirmation', kwargs={'uidb64': uid, 'token': token})
            # current_site = Site.objects.get_current().domain
            send_mail(
                'Подтвердите свой электронный адрес',
                f'Пожалуйста, перейдите по следующей ссылке, чтобы подтвердить свой адрес электронной почты: http://127.0.0.1:8000{activation_url}',
                'igor-arsenal@yandex.by',
                [user.email],
                fail_silently=False,
            )

            return Response({'success': 'На Вашу электронную почту отправлено письмо с подтверждением'},
                            status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class EmailConfirmationView(APIView):
    def get(self, request, uidb64, token):
        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            user = None

        if user is not None and default_token_generator.check_token(user, token):
            user.is_active = True
            user.save()
            return redirect(
                reverse_lazy('email_confirmation_success'))

        return redirect(reverse_lazy('email_confirmation_error'))


class EmailConfirmationSentView(TemplateView):
    template_name = 'email_confirmation_sent.html'


class EmailConfirmationSuccessView(TemplateView):
    template_name = 'email_confirmation_success.html'


class EmailConfirmationErrorView(TemplateView):
    template_name = 'email_confirmation_error.html'


class LoginAPIView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            username = serializer.validated_data.get("username")
            password = serializer.validated_data.get("password")
            user = authenticate(request, username=username, password=password)
            if user and user.is_active:
                login(request, user)
                return Response({'success': 'Пользователь успешно авторизовался'})
            raise serializers.ValidationError("Пользователь не авторизован")


class LogoutAPIView(APIView):
    def get(self, request, *args, **kwargs):
        logout(request)
        return Response({'success': 'Вы вышли из учетной записи'}, status=status.HTTP_401_UNAUTHORIZED)


class EmailCheckView(APIView):
    def post(self, request):
        serializer = EmailSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            email = serializer.validated_data.get("email")
            if User.objects.filter(email=email).exists():
                user = User.objects.get(email=email)
                token = default_token_generator.make_token(user)
                print('Token: ', token)
                uid = urlsafe_base64_encode(force_bytes(user.pk))
                print('Force bytes', force_bytes(user.pk))
                print('Uid', uid)
                activation_url = reverse_lazy('password_reset', kwargs={'uidb64': uid, 'token': token})
                print(activation_url)
                send_mail(
                    'Восстановление пароля',
                    f'Для восстановления пароля перейдите по данной ссылке: http://127.0.0.1:8000{activation_url}',
                    'igor-arsenal@yandex.by',
                    [email],
                    fail_silently=False,
                )
                return Response({'success': 'На Вашу электронную почту отправлено письмо для восстановления пароля'},
                                status=status.HTTP_201_CREATED)
            return Response({'error': 'Пользователя с такой почтой не существует'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PasswordResetView(APIView):
    def post(self, request, uidb64, token):
        serializer = ResetPasswordSerializer(data=request.data)
        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            user = None
        if user is not None and default_token_generator.check_token(user, token):
            if serializer.is_valid(raise_exception=True):
                password = serializer.validated_data.get("password")
                password2 = serializer.validated_data.get("password2")
                if password != password2:
                    return Response({'error': 'Пароли не совпадают'}, status=status.HTTP_400_BAD_REQUEST)
                user.set_password(password)
                user.save()
                return redirect(reverse_lazy('password_reset_success'))
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return redirect(reverse_lazy('password_reset_error'))


class PasswordResetSuccessView(TemplateView):
    template_name = 'password_reset_success.html'


class PasswordResetErrorView(TemplateView):
    template_name = 'password_reset_error.html'
