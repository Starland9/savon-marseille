from django.core.management.base import BaseCommand
from products.models import Category, Product


class Command(BaseCommand):
    help = 'Populate database with sample Marseille soap products'

    def handle(self, *args, **options):
        self.stdout.write('Creating sample data...')

        # Create categories
        categories_data = [
            {'name': 'Savon Traditionnel', 'description': 'Savon de Marseille traditionnel authentique'},
            {'name': 'Savon Parfumé', 'description': 'Savons de Marseille avec des parfums naturels'},
            {'name': 'Savon Artisanal', 'description': 'Savons faits main avec des ingrédients naturels'},
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

        # Create products
        products_data = [
            {
                'name': 'Savon de Marseille Olive',
                'description': 'Authentique savon de Marseille à l\'huile d\'olive pure. Fabriqué selon la tradition marseillaise, ce savon est doux pour la peau et biodégradable.',
                'category': 'Savon Traditionnel',
                'weight': '300g',
                'price': 8.50,
                'wholesale_price': 6.00,
                'stock': 100,
                'ingredients': 'Huile d\'olive, soude, eau',
            },
            {
                'name': 'Savon de Marseille Lavande',
                'description': 'Savon de Marseille parfumé à la lavande de Provence. Idéal pour une relaxation totale et un parfum naturel agréable.',
                'category': 'Savon Parfumé',
                'weight': '300g',
                'price': 9.00,
                'wholesale_price': 6.50,
                'stock': 80,
                'ingredients': 'Huile d\'olive, huile essentielle de lavande, soude, eau',
            },
            {
                'name': 'Savon de Marseille Rose',
                'description': 'Savon artisanal parfumé à la rose. Nourrissant et doux pour tous les types de peau.',
                'category': 'Savon Parfumé',
                'weight': '300g',
                'price': 9.50,
                'wholesale_price': 7.00,
                'stock': 60,
                'ingredients': 'Huile d\'olive, extrait de rose, soude, eau',
            },
            {
                'name': 'Savon de Marseille Citron',
                'description': 'Savon rafraîchissant au citron. Parfait pour revitaliser la peau et laisser une sensation de fraîcheur.',
                'category': 'Savon Parfumé',
                'weight': '300g',
                'price': 8.50,
                'wholesale_price': 6.00,
                'stock': 90,
                'ingredients': 'Huile d\'olive, huile essentielle de citron, soude, eau',
            },
            {
                'name': 'Savon de Marseille Miel',
                'description': 'Savon artisanal au miel naturel. Hydratant et nourrissant, idéal pour les peaux sèches.',
                'category': 'Savon Artisanal',
                'weight': '300g',
                'price': 10.00,
                'wholesale_price': 7.50,
                'stock': 50,
                'ingredients': 'Huile d\'olive, miel, soude, eau',
            },
            {
                'name': 'Savon de Marseille Karité',
                'description': 'Savon enrichi au beurre de karité. Ultra-nourrissant pour les peaux sensibles.',
                'category': 'Savon Artisanal',
                'weight': '300g',
                'price': 11.00,
                'wholesale_price': 8.00,
                'stock': 45,
                'ingredients': 'Huile d\'olive, beurre de karité, soude, eau',
            },
            {
                'name': 'Savon de Marseille Cube Olive',
                'description': 'Cube de savon de Marseille traditionnel à l\'huile d\'olive. Format économique pour toute la famille.',
                'category': 'Savon Traditionnel',
                'weight': '600g',
                'price': 14.00,
                'wholesale_price': 10.00,
                'stock': 70,
                'ingredients': 'Huile d\'olive, soude, eau',
            },
            {
                'name': 'Savon de Marseille Mini Olive',
                'description': 'Mini savon de Marseille à l\'huile d\'olive. Parfait pour les voyages ou pour tester.',
                'category': 'Savon Traditionnel',
                'weight': '100g',
                'price': 3.50,
                'wholesale_price': 2.50,
                'stock': 150,
                'ingredients': 'Huile d\'olive, soude, eau',
            },
            {
                'name': 'Savon de Marseille Thym',
                'description': 'Savon parfumé au thym de Provence. Propriétés purifiantes et tonifiantes.',
                'category': 'Savon Parfumé',
                'weight': '300g',
                'price': 9.00,
                'wholesale_price': 6.50,
                'stock': 65,
                'ingredients': 'Huile d\'olive, huile essentielle de thym, soude, eau',
            },
            {
                'name': 'Savon de Marseille Amande',
                'description': 'Savon artisanal à l\'amande douce. Douceur et nutrition pour votre peau.',
                'category': 'Savon Artisanal',
                'weight': '300g',
                'price': 10.50,
                'wholesale_price': 7.50,
                'stock': 55,
                'ingredients': 'Huile d\'olive, huile d\'amande douce, soude, eau',
            },
        ]

        for product_data in products_data:
            category = categories[product_data.pop('category')]
            product, created = Product.objects.get_or_create(
                name=product_data['name'],
                weight=product_data['weight'],
                defaults={**product_data, 'category': category}
            )
            if created:
                self.stdout.write(self.style.SUCCESS(f'Created product: {product.name}'))

        self.stdout.write(self.style.SUCCESS('Sample data created successfully!'))
