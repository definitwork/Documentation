# Generated by Django 5.0 on 2024-03-14 13:51

import django_ckeditor_5.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('news', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='news',
            name='cover_img',
            field=models.ImageField(blank=True, null=True, upload_to='video/news/img', verbose_name='Картинка, покрывающая видео'),
        ),
        migrations.AlterField(
            model_name='news',
            name='news_body',
            field=django_ckeditor_5.fields.CKEditor5Field(verbose_name='Содержание'),
        ),
        migrations.AlterField(
            model_name='news',
            name='news_img',
            field=models.ImageField(blank=True, null=True, upload_to='img/news', verbose_name='Картинка для новости'),
        ),
        migrations.AlterField(
            model_name='news',
            name='news_video',
            field=models.FileField(blank=True, null=True, upload_to='video/news', verbose_name='Видео для новости'),
        ),
    ]