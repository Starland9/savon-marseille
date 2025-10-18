from rest_framework import viewsets, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from django_filters.rest_framework import DjangoFilterBackend
from django.contrib.auth.models import User
from .models import Shop
from .serializers import UserSerializer, ShopSerializer


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for viewing users"""
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]


class ShopViewSet(viewsets.ModelViewSet):
    """ViewSet for managing shops"""
    queryset = Shop.objects.filter(is_active=True)
    serializer_class = ShopSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['city', 'is_verified']
    search_fields = ['name', 'description', 'city']
    ordering_fields = ['created_at', 'name']

    def perform_create(self, serializer):
        """Set the owner to the current user when creating a shop"""
        serializer.save(owner=self.request.user)

    @action(detail=False, methods=['get'])
    def my_shops(self, request):
        """Get shops owned by the current user"""
        if not request.user.is_authenticated:
            return Response({'detail': 'Authentication required'}, status=status.HTTP_401_UNAUTHORIZED)
        
        shops = self.queryset.filter(owner=request.user)
        serializer = self.get_serializer(shops, many=True)
        return Response(serializer.data)

