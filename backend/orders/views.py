from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Order
from .serializers import OrderSerializer, OrderCreateSerializer


class OrderViewSet(viewsets.ModelViewSet):
    """ViewSet for orders"""
    queryset = Order.objects.all()
    
    def get_serializer_class(self):
        if self.action == 'create':
            return OrderCreateSerializer
        return OrderSerializer

    @action(detail=True, methods=['post'])
    def cancel(self, request, pk=None):
        """Cancel an order"""
        order = self.get_object()
        if order.status in ['pending', 'processing']:
            order.status = 'cancelled'
            order.save()
            # Restore stock
            for item in order.items.all():
                item.product.stock += item.quantity
                item.product.save()
            return Response({'status': 'Order cancelled'})
        return Response({'error': 'Cannot cancel this order'}, status=status.HTTP_400_BAD_REQUEST)

