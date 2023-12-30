from django.contrib import admin

from .models import Copyright


@admin.register(Copyright)
class CopyrightAdmin(admin.ModelAdmin):
    list_display = ('site_name',
                    'owner_name',
                    'unp',
                    'country',
                    'postcode',
                    'city',
                    'street',
                    'house'
                    )
    list_display_links = ('site_name',)

