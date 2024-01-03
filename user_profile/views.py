from django.contrib.auth import authenticate, login, logout
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, serializers
from django.contrib.auth.models import User

from user_profile.serializers import UserRegistrationSerializer, LoginSerializer


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
            user = User(username=serializer.validated_data.get("username"),
                        email=serializer.validated_data.get("email"),
                        password=serializer.validated_data.get("password"))
            user.set_password(serializer.validated_data.get("password"))
            user.save()
            return Response({'success': 'Новый пользователь успешно зарегистрирован'}, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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
