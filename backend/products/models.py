from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator


class Category(models.Model):
    """Category model for organizing cosmetic products and services"""
    name = models.CharField(max_length=200, unique=True)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = 'Categories'
        ordering = ['name']

    def __str__(self):
        return self.name


class Product(models.Model):
    """Product model for cosmetic products (soaps, oils, perfumes, nail polish, etc.)"""
    PRODUCT_TYPE_CHOICES = [
        ('soap', 'Savon'),
        ('oil', 'Huile'),
        ('perfume', 'Parfum'),
        ('nail_polish', 'Vernis à ongles'),
        ('makeup', 'Maquillage'),
        ('hair_care', 'Soin des cheveux'),
        ('skin_care', 'Soin de la peau'),
        ('body_care', 'Soin du corps'),
        ('wig', 'Perruque'),
        ('other', 'Autre'),
    ]

    UNIT_CHOICES = [
        ('g', 'Grammes'),
        ('ml', 'Millilitres'),
        ('unit', 'Unité'),
        ('set', 'Ensemble'),
    ]

    # Basic Information
    name = models.CharField(max_length=200)
    description = models.TextField()
    product_type = models.CharField(max_length=20, choices=PRODUCT_TYPE_CHOICES, default='other')
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, related_name='products')
    shop = models.ForeignKey('users.Shop', on_delete=models.CASCADE, related_name='products', null=True, blank=True)
    
    # Size/Quantity
    quantity = models.DecimalField(max_digits=10, decimal_places=2, default=1)
    unit = models.CharField(max_length=10, choices=UNIT_CHOICES, default='unit')
    
    # Pricing
    price = models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(0)])
    wholesale_price = models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(0)])
    
    # Stock
    stock = models.IntegerField(default=0, validators=[MinValueValidator(0)])
    
    # Media
    image = models.ImageField(upload_to='products/', blank=True, null=True)
    
    # Additional Info
    ingredients = models.TextField(blank=True)
    is_active = models.BooleanField(default=True)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.name} - {self.quantity}{self.unit}"

    @property
    def in_stock(self):
        return self.stock > 0
    
    # Keep backward compatibility with weight field
    @property
    def weight(self):
        return f"{self.quantity}{self.unit}"


class Service(models.Model):
    """Service model for beauty services (nail art, wig installation, etc.)"""
    SERVICE_TYPE_CHOICES = [
        ('nail_art', 'Pose des ongles'),
        ('manicure', 'Manucure'),
        ('pedicure', 'Pédicure'),
        ('wig_installation', 'Pose de perruque'),
        ('hair_styling', 'Coiffure'),
        ('makeup', 'Maquillage'),
        ('facial', 'Soin du visage'),
        ('massage', 'Massage'),
        ('waxing', 'Épilation'),
        ('other', 'Autre'),
    ]

    # Basic Information
    name = models.CharField(max_length=200)
    description = models.TextField()
    service_type = models.CharField(max_length=20, choices=SERVICE_TYPE_CHOICES, default='other')
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, related_name='services')
    shop = models.ForeignKey('users.Shop', on_delete=models.CASCADE, related_name='services')
    
    # Pricing
    price = models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(0)])
    duration_minutes = models.IntegerField(default=60, validators=[MinValueValidator(1)])
    
    # Media
    image = models.ImageField(upload_to='services/', blank=True, null=True)
    
    # Additional Info
    is_active = models.BooleanField(default=True)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.name} - {self.shop.name}"


class ProductReview(models.Model):
    """Review model for products"""
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='reviews')
    user_name = models.CharField(max_length=100)
    user_email = models.EmailField()
    rating = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])
    comment = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.user_name} - {self.product.name} ({self.rating}/5)"


class ServiceReview(models.Model):
    """Review model for services"""
    service = models.ForeignKey(Service, on_delete=models.CASCADE, related_name='reviews')
    user_name = models.CharField(max_length=100)
    user_email = models.EmailField()
    rating = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])
    comment = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.user_name} - {self.service.name} ({self.rating}/5)"

