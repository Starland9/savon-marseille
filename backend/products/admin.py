from django.contrib import admin
from .models import Category, Product, ProductReview, Service, ServiceReview


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'created_at']
    search_fields = ['name']


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['name', 'product_type', 'category', 'shop', 'quantity', 'unit', 'price', 'wholesale_price', 'stock', 'is_active']
    list_filter = ['category', 'product_type', 'unit', 'is_active', 'shop']
    search_fields = ['name', 'description']
    list_editable = ['stock', 'is_active']


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ['name', 'service_type', 'category', 'shop', 'price', 'duration_minutes', 'is_active']
    list_filter = ['category', 'service_type', 'is_active', 'shop']
    search_fields = ['name', 'description']
    list_editable = ['is_active']


@admin.register(ProductReview)
class ProductReviewAdmin(admin.ModelAdmin):
    list_display = ['product', 'user_name', 'rating', 'created_at']
    list_filter = ['rating', 'created_at']
    search_fields = ['user_name', 'user_email', 'comment']


@admin.register(ServiceReview)
class ServiceReviewAdmin(admin.ModelAdmin):
    list_display = ['service', 'user_name', 'rating', 'created_at']
    list_filter = ['rating', 'created_at']
    search_fields = ['user_name', 'user_email', 'comment']

