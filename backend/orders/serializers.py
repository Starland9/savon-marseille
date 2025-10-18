from rest_framework import serializers
from .models import Order, OrderItem
from products.serializers import ProductSerializer


class OrderItemSerializer(serializers.ModelSerializer):
    product_details = ProductSerializer(source='product', read_only=True)
    subtotal = serializers.ReadOnlyField()

    class Meta:
        model = OrderItem
        fields = ['id', 'product', 'product_details', 'quantity', 'price', 'subtotal']


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = [
            'id', 'customer_name', 'customer_email', 'customer_phone',
            'shipping_address', 'shipping_city', 'shipping_postal_code', 'shipping_country',
            'order_type', 'status', 'total_amount', 'notes', 'items',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['created_at', 'updated_at']


class OrderCreateSerializer(serializers.ModelSerializer):
    items = serializers.ListField(write_only=True)

    class Meta:
        model = Order
        fields = [
            'customer_name', 'customer_email', 'customer_phone',
            'shipping_address', 'shipping_city', 'shipping_postal_code', 'shipping_country',
            'order_type', 'notes', 'items'
        ]

    def create(self, validated_data):
        items_data = validated_data.pop('items')
        total_amount = 0

        # Calculate total amount
        for item in items_data:
            from products.models import Product
            product = Product.objects.get(id=item['product_id'])
            price = product.wholesale_price if validated_data['order_type'] == 'wholesale' else product.price
            total_amount += price * item['quantity']

        validated_data['total_amount'] = total_amount
        order = Order.objects.create(**validated_data)

        # Create order items
        for item in items_data:
            from products.models import Product
            product = Product.objects.get(id=item['product_id'])
            price = product.wholesale_price if order.order_type == 'wholesale' else product.price
            OrderItem.objects.create(
                order=order,
                product=product,
                quantity=item['quantity'],
                price=price
            )
            # Update stock
            product.stock -= item['quantity']
            product.save()

        return order
