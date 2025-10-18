from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Shop


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']
        read_only_fields = ['id']


class ShopSerializer(serializers.ModelSerializer):
    owner_username = serializers.CharField(source='owner.username', read_only=True)
    product_count = serializers.SerializerMethodField()
    service_count = serializers.SerializerMethodField()

    class Meta:
        model = Shop
        fields = [
            'id', 'owner', 'owner_username', 'name', 'description', 'logo', 'banner',
            'phone', 'email', 'address', 'city', 'is_active', 'is_verified',
            'created_at', 'updated_at', 'product_count', 'service_count'
        ]
        read_only_fields = ['is_verified', 'created_at', 'updated_at']

    def get_product_count(self, obj):
        return obj.products.filter(is_active=True).count()

    def get_service_count(self, obj):
        return obj.services.filter(is_active=True).count()
