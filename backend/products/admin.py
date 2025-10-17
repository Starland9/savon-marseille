from django.contrib import admin
from .models import Category, Product, ProductReview


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'created_at']
    search_fields = ['name']


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['name', 'category', 'weight', 'price', 'wholesale_price', 'stock', 'is_active']
    list_filter = ['category', 'weight', 'is_active']
    search_fields = ['name', 'description']
    list_editable = ['stock', 'is_active']


@admin.register(ProductReview)
class ProductReviewAdmin(admin.ModelAdmin):
    list_display = ['product', 'user_name', 'rating', 'created_at']
    list_filter = ['rating', 'created_at']
    search_fields = ['user_name', 'user_email', 'comment']

