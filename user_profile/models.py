from django.db import models
from django.contrib.auth.models import User



class Profile(models.Model):
    user = models.OneToOneField(User, verbose_name="Пользователь", on_delete=models.CASCADE, blank=True)

    GENDER_CHOICES = [
        ('мужской', 'мужской'),
        ('женский', 'женский'),
    ]

    gender = models.CharField(verbose_name="Пол", max_length=7, choices=GENDER_CHOICES, blank=True)
    date_of_birth = models.DateField(verbose_name="Дата рождения", blank=True, null=True)
    phone_number = models.CharField(verbose_name="Номер телефона", max_length=20, blank=True, null=True)
    profile_picture = models.ImageField(verbose_name="Аватар", upload_to='profile_pictures', blank=True, null=True)
    profession = models.CharField(verbose_name="Профессия", max_length=100, blank=True, null=True)
    practice = models.CharField(verbose_name="Практика/опыт", max_length=10, blank=True, null=True)
    sphere_of_interest = models.TextField(verbose_name="Сфера интересов", blank=True, null=True)

    class Meta:
        verbose_name_plural = 'Профили пользователей'
        verbose_name = 'Профиль пользователя'
        ordering = ['user']

    def __str__(self):
        return self.user.username


class TeamMemberSpeciality(models.Model):
    profile = models.ManyToManyField('Profile', verbose_name="Профиль")
    speciality = models.CharField(verbose_name="Специализация", max_length=100)

    class Meta:
        verbose_name_plural = 'Специализации экспертов'
        verbose_name = 'Специализация эксперта'
        ordering = ['speciality']

    def __str__(self):
        return self.speciality