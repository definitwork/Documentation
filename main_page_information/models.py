from django.db import models


class AboutResource(models.Model):
    title = models.CharField(max_length=250, verbose_name='Название')  # заголовок Документация Человека
    description = models.TextField(verbose_name='Описание')  # текст, описывающий видео
    file = models.FileField(upload_to='./video', verbose_name='Загрузка видеофайла')  # Приветственное видео
    data_add_video = models.DateTimeField(auto_now_add=True, verbose_name='Дата добавления')  # Дата добавления видео
    image = models.ImageField(upload_to='./preview_img')  # Превью картинки для видео

    def __str__(self):
        return self.title


class SomeFacts(models.Model):
    description = models.TextField()  # определение терминов или перечисление фактов

    def __str__(self):
        return self.description
