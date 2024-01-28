# Generated by Django 5.0 on 2024-01-24 08:57

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_profile', '0002_alter_profile_date_of_birth_alter_profile_gender_and_more'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='profile',
            options={'ordering': ['user'], 'verbose_name': 'Профиль пользователя', 'verbose_name_plural': 'Профили пользователей'},
        ),
        migrations.AlterModelOptions(
            name='teammemberspeciality',
            options={'ordering': ['speciality'], 'verbose_name': 'Специализация эксперта', 'verbose_name_plural': 'Специализации экспертов'},
        ),
        migrations.AlterField(
            model_name='profile',
            name='user',
            field=models.OneToOneField(blank=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='Пользователь'),
        ),
        migrations.AlterField(
            model_name='teammemberspeciality',
            name='profile',
            field=models.ManyToManyField(to='user_profile.profile', verbose_name='Профиль'),
        ),
    ]