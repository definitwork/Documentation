from django.db import models


class Product(models.Model):
    name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=11, decimal_places=2)
    photo = models.ImageField(default='product_photos/default.jpg', upload_to='product_photos',
                              verbose_name='Не выбирай, оставь дефолтное фото')

    def __str__(self):
        return self.name
    