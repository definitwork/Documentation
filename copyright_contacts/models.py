from django.db import models


class Copyright(models.Model):
    site_name = models.CharField(verbose_name='Название проекта', max_length=255)
    owner_name = models.CharField(verbose_name='ФИО', max_length=255)
    unp = models.IntegerField(verbose_name='УНП')
    country = models.CharField(verbose_name='Страна', max_length=255)
    postcode = models.CharField(verbose_name='Индекс', max_length=255)
    city = models.CharField(verbose_name='Город', max_length=255)
    street = models.CharField(verbose_name='Улица', max_length=255)
    house = models.CharField(verbose_name='Дом', max_length=255)

    class Meta:
        verbose_name_plural = 'Авторские права'
        verbose_name = 'Авторское право'
        ordering = ['site_name']

# class Contacts(models.Model):
#     contact_title =
#     contact_link =
#     contact_icon =
