# Generated by Django 5.0 on 2024-02-25 14:59

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='DocCategory',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('category_title', models.CharField(max_length=255, unique=True, verbose_name='Заголовок категории')),
                ('description', models.TextField(blank=True, null=True, verbose_name='Описание категории')),
                ('video', models.FileField(blank=True, null=True, upload_to='video/doc_category', verbose_name='Видео')),
                ('cover_img', models.ImageField(blank=True, null=True, upload_to='img/doc_category', verbose_name='Картинка, покрывающая видео')),
            ],
            options={
                'verbose_name': 'Категория раздела документация',
                'verbose_name_plural': 'Категории раздела документация',
            },
        ),
        migrations.CreateModel(
            name='CategoryContent',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('content_title', models.CharField(max_length=255, verbose_name='Заголовок статьи')),
                ('text', models.TextField(verbose_name='Текст статьи')),
                ('video', models.FileField(blank=True, null=True, upload_to='video/category_content', verbose_name='Видео из статьи')),
                ('article_image', models.ImageField(blank=True, null=True, upload_to='img/category_content', verbose_name='Картинка из статьи')),
                ('is_published', models.BooleanField(default=False, verbose_name='Опубликована ли статья')),
                ('access_level', models.PositiveIntegerField(choices=[(0, 'For all'), (1, 'Who is_authorized'), (2, 'Who is paid')], default=0, verbose_name='Кто видит статью')),
                ('price', models.DecimalField(decimal_places=2, default=0, max_digits=6, verbose_name='Цена')),
                ('publication_date', models.DateTimeField(auto_now_add=True, verbose_name='Дата публикации')),
                ('doc_categories', models.ManyToManyField(to='docum_app.doccategory', verbose_name='Связанные категории')),
            ],
            options={
                'verbose_name': 'Статья категорий документации',
                'verbose_name_plural': 'Статьи категорий документации',
            },
        ),
        migrations.CreateModel(
            name='Book',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('book_title', models.CharField(max_length=255, verbose_name='Название книги')),
                ('author', models.CharField(max_length=255, verbose_name='Автор книги')),
                ('description', models.TextField(blank=True, null=True, verbose_name='Описание книги')),
                ('is_published', models.BooleanField(default=False, verbose_name='Доступна ли книга')),
                ('access_level', models.PositiveIntegerField(choices=[(0, 'For all'), (1, 'Who is_authorized'), (2, 'Who is paid')], default=0, verbose_name='Кому доступна книга')),
                ('price', models.DecimalField(decimal_places=2, default=0, max_digits=6, verbose_name='Цена')),
                ('publication_date', models.DateTimeField(auto_now_add=True, verbose_name='Дата публикации')),
                ('doc_categories', models.ManyToManyField(to='docum_app.doccategory', verbose_name='Связанные категории')),
            ],
            options={
                'verbose_name': 'Книга',
                'verbose_name_plural': 'Книги',
            },
        ),
        migrations.CreateModel(
            name='UserPaidContent',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('creation_date', models.DateField(auto_now_add=True, verbose_name='Дата формирование заказа')),
                ('is_paid', models.BooleanField(default=False, verbose_name='Оплачено ли')),
                ('books', models.ManyToManyField(blank=True, related_name='related_books', to='docum_app.book', verbose_name='Оплаченные книги')),
                ('category_contents', models.ManyToManyField(blank=True, related_name='related_category_contents', to='docum_app.categorycontent', verbose_name='Оплачиваемые статьи')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='Пользователь')),
            ],
            options={
                'verbose_name': 'Оплаченный контент пользователя',
                'verbose_name_plural': 'Оплаченный контент пользователя',
            },
        ),
    ]