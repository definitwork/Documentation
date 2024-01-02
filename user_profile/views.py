from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User

from user_profile.serializers import UserRegistrationSerializer


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