from django.contrib import admin
from .models import DocCategory, CategoryContent, Book, UserPaidContent


class DocCategoryAdmin(admin.ModelAdmin):
    prepopulated_fields = {"slug": ("category_title",)}


admin.site.register(DocCategory, DocCategoryAdmin)
admin.site.register(CategoryContent)
admin.site.register(Book)
admin.site.register(UserPaidContent)
