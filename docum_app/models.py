from django.db import models
from django.contrib.auth import get_user_model
from django_ckeditor_5.fields import CKEditor5Field


User = get_user_model()


class DocCategory(models.Model):
    category_title = models.CharField(max_length=255, verbose_name='Заголовок категории', unique=True)
    description = models.TextField(verbose_name='Описание категории', blank=True, null=True)
    slug = models.SlugField(unique=True, verbose_name='URL')
    video = models.FileField(upload_to='video/doc_category', verbose_name='Видео', blank=True, null=True)
    cover_img = models.ImageField(upload_to='img/doc_category', verbose_name='Картинка, покрывающая видео', blank=True,
                                  null=True)

    class Meta:
        verbose_name_plural = 'Категории раздела документация'
        verbose_name = 'Категория раздела документация'

    def __str__(self):
        return self.category_title


class CategoryContent(models.Model):
    ACCESS_LEVEL_CHOICES = {
        0: "For all",
        1: "Who is_authorized",
        2: "Who is paid",
    }

    doc_categories = models.ManyToManyField('DocCategory',
                                            verbose_name='Связанные категории')
    content_title = models.CharField(max_length=255, verbose_name='Заголовок статьи')
    text = CKEditor5Field(verbose_name='Текст статьи', config_name='extends')
    video = models.FileField(upload_to='video/category_content', verbose_name='Видео из статьи', blank=True, null=True)
    article_image = models.ImageField(upload_to='img/category_content', verbose_name='Картинка из статьи', blank=True,
                                      null=True)
    is_published = models.BooleanField(default=False, verbose_name='Опубликована ли статья')
    access_level = models.PositiveIntegerField(choices=ACCESS_LEVEL_CHOICES, default=0, verbose_name='Кто видит статью')
    price = models.DecimalField(decimal_places=2, max_digits=6, default=0, verbose_name='Цена')
    publication_date = models.DateTimeField(auto_now_add=True, verbose_name='Дата публикации')

    class Meta:
        verbose_name_plural = 'Статьи категорий документации'
        verbose_name = 'Статья категорий документации'

    def __str__(self):
        return self.content_title


class Book(models.Model):
    ACCESS_LEVEL_CHOICES = {
        0: "For all",
        1: "Who is_authorized",
        2: "Who is paid",
    }

    doc_categories = models.ManyToManyField('DocCategory',
                                            verbose_name='Связанные категории')
    book_title = models.CharField(max_length=255, verbose_name='Название книги')
    author = models.CharField(max_length=255, verbose_name='Автор книги')
    description = models.TextField(verbose_name='Описание книги', null=True, blank=True)
    is_published = models.BooleanField(default=False, verbose_name='Доступна ли книга')
    access_level = models.PositiveIntegerField(choices=ACCESS_LEVEL_CHOICES, default=0,
                                               verbose_name='Кому доступна книга')
    price = models.DecimalField(decimal_places=2, max_digits=6, default=0, verbose_name='Цена')
    publication_date = models.DateTimeField(auto_now_add=True, verbose_name='Дата публикации')

    class Meta:
        verbose_name_plural = 'Книги'
        verbose_name = 'Книга'

    def __str__(self):
        return self.book_title


class UserPaidContent(models.Model):
    user = models.ForeignKey(User, verbose_name='Пользователь', on_delete=models.CASCADE)
    category_contents = models.ManyToManyField('CategoryContent', related_name='related_category_contents',
                                               verbose_name='Оплачиваемые статьи', blank=True)
    books = models.ManyToManyField('Book', related_name='related_books', verbose_name='Оплаченные книги',
                                   blank=True)
    creation_date = models.DateField(auto_now_add=True, verbose_name='Дата формирование заказа')
    is_paid = models.BooleanField(default=False, verbose_name='Оплачено ли')

    # пока не ясно как будет считаться общая цена при скидке
    # фиксация времени оплаты и общей стоимости на день оплаты

    class Meta:
        verbose_name_plural = 'Оплаченный контент пользователя'
        verbose_name = 'Оплаченный контент пользователя'

    def __str__(self):
        return f'Оплата от {self.user} - Заказ ID №: {self.id}'
