"""
Data migration script to populate database with cosmetics categories and example products
"""

from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from products.models import Category, Product
from users.models import Shop


class Command(BaseCommand):
    help = 'Populate database with cosmetics marketplace data'

    def handle(self, *args, **kwargs):
        self.stdout.write('Creating cosmetics categories...')
        
        # Create categories
        categories_data = [
            {
                'name': 'Savons',
                'description': 'Savons naturels et artisanaux pour tous types de peau'
            },
            {
                'name': 'Huiles corporelles',
                'description': 'Huiles naturelles pour hydrater et nourrir la peau'
            },
            {
                'name': 'Parfums',
                'description': 'Parfums et eaux de toilette pour homme et femme'
            },
            {
                'name': 'Vernis à ongles',
                'description': 'Vernis et soins des ongles de qualité'
            },
            {
                'name': 'Maquillage',
                'description': 'Produits de maquillage pour sublimer votre beauté'
            },
            {
                'name': 'Soins des cheveux',
                'description': 'Shampoings, après-shampoings et masques capillaires'
            },
            {
                'name': 'Soins de la peau',
                'description': 'Crèmes, lotions et sérums pour la peau'
            },
            {
                'name': 'Perruques',
                'description': 'Perruques naturelles et synthétiques'
            },
            {
                'name': 'Services de beauté',
                'description': 'Services professionnels de manucure, pédicure, coiffure, etc.'
            },
        ]
        
        categories = {}
        for cat_data in categories_data:
            category, created = Category.objects.get_or_create(
                name=cat_data['name'],
                defaults={'description': cat_data['description']}
            )
            categories[cat_data['name']] = category
            if created:
                self.stdout.write(self.style.SUCCESS(f'Created category: {category.name}'))
        
        # Create a demo user and shop (if not exists)
        demo_user, created = User.objects.get_or_create(
            username='demo_vendor',
            defaults={
                'email': 'demo@marketplace.cm',
                'first_name': 'Demo',
                'last_name': 'Vendor'
            }
        )
        if created:
            demo_user.set_password('demo123')
            demo_user.save()
            self.stdout.write(self.style.SUCCESS('Created demo user'))
        
        demo_shop, created = Shop.objects.get_or_create(
            name='Boutique Beauté Cameroun',
            owner=demo_user,
            defaults={
                'description': 'Votre boutique de produits cosmétiques et services de beauté au Cameroun',
                'phone': '+237 6 XX XX XX XX',
                'email': 'contact@beaute-cameroun.cm',
                'address': 'Quartier Commerce, Douala',
                'city': 'Douala',
                'is_active': True,
                'is_verified': True
            }
        )
        if created:
            self.stdout.write(self.style.SUCCESS('Created demo shop'))
        
        # Create sample products
        products_data = [
            {
                'name': 'Savon noir africain',
                'description': 'Savon noir authentique fabriqué à partir d\'ingrédients naturels. Idéal pour tous types de peau.',
                'product_type': 'soap',
                'category': categories['Savons'],
                'quantity': 250,
                'unit': 'g',
                'price': 2500,
                'wholesale_price': 1800,
                'stock': 100,
                'ingredients': 'Beurre de karité, huile de palme, cendres de plantain'
            },
            {
                'name': 'Huile de coco vierge',
                'description': 'Huile de coco 100% naturelle pour hydrater la peau et les cheveux',
                'product_type': 'oil',
                'category': categories['Huiles corporelles'],
                'quantity': 200,
                'unit': 'ml',
                'price': 3500,
                'wholesale_price': 2800,
                'stock': 75,
                'ingredients': 'Huile de coco vierge pressée à froid'
            },
            {
                'name': 'Parfum Oriental',
                'description': 'Parfum envoûtant aux notes orientales, longue tenue',
                'product_type': 'perfume',
                'category': categories['Parfums'],
                'quantity': 50,
                'unit': 'ml',
                'price': 15000,
                'wholesale_price': 12000,
                'stock': 30,
                'ingredients': 'Alcool, eau, parfum'
            },
            {
                'name': 'Vernis à ongles rouge',
                'description': 'Vernis à ongles longue tenue, séchage rapide',
                'product_type': 'nail_polish',
                'category': categories['Vernis à ongles'],
                'quantity': 15,
                'unit': 'ml',
                'price': 1500,
                'wholesale_price': 1000,
                'stock': 150,
                'ingredients': 'Résine naturelle, pigments'
            },
            {
                'name': 'Fond de teint mat',
                'description': 'Fond de teint longue durée pour un teint parfait',
                'product_type': 'makeup',
                'category': categories['Maquillage'],
                'quantity': 30,
                'unit': 'ml',
                'price': 8000,
                'wholesale_price': 6000,
                'stock': 50,
                'ingredients': 'Pigments minéraux, vitamines E'
            },
            {
                'name': 'Shampoing karité',
                'description': 'Shampoing nourrissant au beurre de karité',
                'product_type': 'hair_care',
                'category': categories['Soins des cheveux'],
                'quantity': 300,
                'unit': 'ml',
                'price': 4000,
                'wholesale_price': 3000,
                'stock': 80,
                'ingredients': 'Beurre de karité, huiles essentielles'
            },
            {
                'name': 'Crème hydratante visage',
                'description': 'Crème hydratante pour le visage, tous types de peau',
                'product_type': 'skin_care',
                'category': categories['Soins de la peau'],
                'quantity': 50,
                'unit': 'ml',
                'price': 5500,
                'wholesale_price': 4200,
                'stock': 60,
                'ingredients': 'Aloe vera, vitamine C, acide hyaluronique'
            },
            {
                'name': 'Perruque longue lisse',
                'description': 'Perruque naturelle, cheveux longs et lisses',
                'product_type': 'wig',
                'category': categories['Perruques'],
                'quantity': 1,
                'unit': 'unit',
                'price': 35000,
                'wholesale_price': 28000,
                'stock': 15,
                'ingredients': 'Cheveux naturels'
            },
        ]
        
        for prod_data in products_data:
            product, created = Product.objects.get_or_create(
                name=prod_data['name'],
                defaults={
                    **prod_data,
                    'shop': demo_shop
                }
            )
            if created:
                self.stdout.write(self.style.SUCCESS(f'Created product: {product.name}'))
        
        self.stdout.write(self.style.SUCCESS('\n✅ Database populated successfully!'))
        self.stdout.write('You can now access:')
        self.stdout.write(f'  - Admin: http://localhost:8000/admin')
        self.stdout.write(f'  - Demo vendor: demo_vendor / demo123')
