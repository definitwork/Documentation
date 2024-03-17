from django.contrib import admin
from .models import DocCategory, SubCategory, CategoryContent, Book, UserPaidContent


class DocCategoryAdmin(admin.ModelAdmin):
    prepopulated_fields = {"slug": ("category_title",)}


class SubCategoryAdmin(admin.ModelAdmin):
    prepopulated_fields = {"slug": ("subcategory_title",)}


admin.site.register(DocCategory, DocCategoryAdmin)
admin.site.register(SubCategory, SubCategoryAdmin)
admin.site.register(CategoryContent)
admin.site.register(Book)
admin.site.register(UserPaidContent)
