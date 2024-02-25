from django.contrib import admin
from .models import DocCategory, CategoryContent, Book, UserPaidContent

# @admin.register(DocCategory)
# class DocCategoryAdmin(admin.ModelAdmin):
#     list_display = ('id',)

admin.site.register(DocCategory)
admin.site.register(CategoryContent)
admin.site.register(Book)
admin.site.register(UserPaidContent)
