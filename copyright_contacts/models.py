from django.db import models
from django.core.exceptions import ValidationError


class Copyright(models.Model):
    site_name = models.CharField(verbose_name='Название проекта', max_length=255)
    owner_name = models.CharField(verbose_name='ФИО', max_length=255)
    unp = models.CharField(verbose_name='УНП', max_length=9)
    country = models.CharField(verbose_name='Страна', max_length=255)
    postcode = models.CharField(verbose_name='Индекс', max_length=255)
    city = models.CharField(verbose_name='Город', max_length=255)
    street = models.CharField(verbose_name='Улица', max_length=255)
    house = models.CharField(verbose_name='Дом', max_length=255)

    class Meta:
        verbose_name_plural = 'Авторские права'
        verbose_name = 'Авторское право'
        ordering = ['site_name']

    def __str__(self):
        return self.site_name

    def clean(self):
        if len(self.unp) < 9 or not self.unp.isdigit():
            raise ValidationError({'unp': 'УНП должен состоять из 9 цифр.'})

# class Contacts(models.Model):
#     contact_title =
#     contact_link =
#     contact_icon =
