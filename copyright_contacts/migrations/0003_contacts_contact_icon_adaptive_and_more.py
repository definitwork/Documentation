# Generated by Django 5.0 on 2024-01-24 09:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('copyright_contacts', '0002_alter_contacts_contact_icon'),
    ]

    operations = [
        migrations.AddField(
            model_name='contacts',
            name='contact_icon_adaptive',
            field=models.ImageField(blank=True, null=True, upload_to='./img/icons', verbose_name='Иконка для адаптивной версии'),
        ),
        migrations.AlterField(
            model_name='contacts',
            name='contact_icon',
            field=models.ImageField(blank=True, null=True, upload_to='./img/icons', verbose_name='Иконка для десктопной версии'),
        ),
        migrations.AlterField(
            model_name='copyright',
            name='owner_name',
            field=models.CharField(max_length=100, verbose_name='ФИО или Название юр.лица'),
        ),
    ]