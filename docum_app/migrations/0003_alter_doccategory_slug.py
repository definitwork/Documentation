# Generated by Django 5.0 on 2024-03-17 11:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('docum_app', '0002_doccategory_slug'),
    ]

    operations = [
        migrations.AlterField(
            model_name='doccategory',
            name='slug',
            field=models.SlugField(unique=True, verbose_name='URL'),
        ),
    ]
