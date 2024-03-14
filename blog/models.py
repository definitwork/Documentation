from django.db import models
from django_ckeditor_5.fields import CKEditor5Field


class BlogsSection(models.Model):
    title = models.CharField(verbose_name='Название секции', max_length=255, unique=True)

    class Meta:
        verbose_name_plural = 'Название секций'
        verbose_name = 'Название секции'
        ordering = ['id']

    def __str__(self):
        return self.title


class Blogs(models.Model):
    blog_title = models.CharField(verbose_name='Заголовок', max_length=255)  # Заголовки блога
    blog_body = CKEditor5Field('Содержание', config_name='extends')  # Содержание блога
    blog_sections = models.ManyToManyField('BlogsSection',
                                           related_name='blog_sections',
                                           verbose_name='Секции блога')  # Секции блога
    blog_img = models.ImageField(verbose_name='Картинка для блога',
                                 upload_to='./blog/img', blank=True, null=True)  # Картинка для блога
    blog_video = models.FileField(verbose_name='Видео для блога',
                                  upload_to='./blog/vedeo', blank=True, null=True)  # Видео для блога
    cover_img = models.ImageField(verbose_name='Картинка, покрывающая видео',
                                  upload_to='./blog/vedeo/img', blank=True, null=True)  # Картинка, покрывающая видео
    date_published = models.DateTimeField(verbose_name='Дата публикации блога',
                                          auto_now_add=True)  # Дата публикации блога

    class Meta:
        verbose_name_plural = 'Блоги'
        verbose_name = 'Блог'
        ordering = ['-date_published']


    def __str__(self):
        return self.blog_title
