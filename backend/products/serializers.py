from rest_framework import serializers
from .models import Category, Product, ProductReview, Service, ServiceReview


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'description', 'created_at', 'updated_at']


class ProductReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductReview
        fields = ['id', 'product', 'user_name', 'user_email', 'rating', 'comment', 'created_at']
        read_only_fields = ['created_at']


class ServiceReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceReview
        fields = ['id', 'service', 'user_name', 'user_email', 'rating', 'comment', 'created_at']
        read_only_fields = ['created_at']


class ProductSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    shop_name = serializers.CharField(source='shop.name', read_only=True, allow_null=True)
    reviews = ProductReviewSerializer(many=True, read_only=True)
    average_rating = serializers.SerializerMethodField()
    weight = serializers.CharField(read_only=True)  # Computed property for backward compatibility

    class Meta:
        model = Product
        fields = [
            'id', 'name', 'description', 'product_type', 'category', 'category_name', 
            'shop', 'shop_name', 'quantity', 'unit', 'weight',
            'price', 'wholesale_price', 'stock', 'image', 'ingredients',
            'is_active', 'in_stock', 'created_at', 'updated_at', 'reviews', 'average_rating'
        ]

    def get_average_rating(self, obj):
        reviews = obj.reviews.all()
        if reviews:
            return sum(review.rating for review in reviews) / len(reviews)
        return 0


class ServiceSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    shop_name = serializers.CharField(source='shop.name', read_only=True)
    reviews = ServiceReviewSerializer(many=True, read_only=True)
    average_rating = serializers.SerializerMethodField()

    class Meta:
        model = Service
        fields = [
            'id', 'name', 'description', 'service_type', 'category', 'category_name',
            'shop', 'shop_name', 'price', 'duration_minutes', 'image',
            'is_active', 'created_at', 'updated_at', 'reviews', 'average_rating'
        ]

    def get_average_rating(self, obj):
        reviews = obj.reviews.all()
        if reviews:
            return sum(review.rating for review in reviews) / len(reviews)
        return 0

