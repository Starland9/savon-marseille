from django.contrib import admin
from .models import Shop


@admin.register(Shop)
class ShopAdmin(admin.ModelAdmin):
    list_display = ['name', 'owner', 'city', 'is_active', 'is_verified', 'created_at']
    list_filter = ['is_active', 'is_verified', 'city']
    search_fields = ['name', 'description', 'owner__username']
    list_editable = ['is_active', 'is_verified']

