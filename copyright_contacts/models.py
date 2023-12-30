from django.db import models
from django.core.exceptions import ValidationError


class Copyright(models.Model):
    site_name = models.CharField(verbose_name='Название проекта', max_length=20)  # Название проекта
    owner_name = models.CharField(verbose_name='ФИО', max_length=100)  # ФИО или название компании-владельца сайта
    unp = models.CharField(verbose_name='УНП', max_length=9)  # УНП
    country = models.CharField(verbose_name='Страна', max_length=25)  # Страна
    postcode = models.CharField(verbose_name='Индекс', max_length=6)  # индекс
    city = models.CharField(verbose_name='Город', max_length=25)  # Город
    street = models.CharField(verbose_name='Улица', max_length=50)  # Улица
    house = models.CharField(verbose_name='Дом', max_length=5)  # Номер дома

    class Meta:
        verbose_name_plural = 'Авторские права'
        verbose_name = 'Авторское право'
        ordering = ['site_name']

    def __str__(self):
        return self.site_name

    def clean(self):
        errors = {}
        if Copyright.objects.exists() and not Copyright.objects.values('site_name')[0]['site_name'] == self.site_name:
            raise ValidationError('Таблица может содержать только одну запись, отредактируйте уже существующую.')

        if len(self.unp) < 9 or not self.unp.isdigit():
            errors.update({'unp': 'УНП должен состоять из 9 цифр.'})

        if len(self.postcode) < 6 or not self.postcode.isdigit():
            errors.update({'postcode': 'Не верный формат'})

        print(errors)

        if errors:
            raise ValidationError(errors)

# class Contacts(models.Model):
#     contact_title =
#     contact_link =
#     contact_icon =
