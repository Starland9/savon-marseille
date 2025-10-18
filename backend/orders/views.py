from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from .models import Order, ServiceBooking
from .serializers import OrderSerializer, OrderCreateSerializer, ServiceBookingSerializer


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
            # Restore stock for products
            for item in order.items.all():
                if item.product:
                    item.product.stock += item.quantity
                    item.product.save()
            return Response({'status': 'Order cancelled'})
        return Response({'error': 'Cannot cancel this order'}, status=status.HTTP_400_BAD_REQUEST)


class ServiceBookingViewSet(viewsets.ModelViewSet):
    """ViewSet for service bookings"""
    queryset = ServiceBooking.objects.all()
    serializer_class = ServiceBookingSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['service', 'status', 'booking_date']

    @action(detail=True, methods=['post'])
    def cancel(self, request, pk=None):
        """Cancel a service booking"""
        booking = self.get_object()
        if booking.status in ['pending', 'confirmed']:
            booking.status = 'cancelled'
            booking.save()
            return Response({'status': 'Booking cancelled'})
        return Response({'error': 'Cannot cancel this booking'}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['post'])
    def confirm(self, request, pk=None):
        """Confirm a service booking"""
        booking = self.get_object()
        if booking.status == 'pending':
            booking.status = 'confirmed'
            booking.save()
            return Response({'status': 'Booking confirmed'})
        return Response({'error': 'Cannot confirm this booking'}, status=status.HTTP_400_BAD_REQUEST)

