from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CategoryViewSet, ProductViewSet, ProductReviewViewSet, ServiceViewSet, ServiceReviewViewSet

router = DefaultRouter()
router.register(r'categories', CategoryViewSet)
router.register(r'products', ProductViewSet)
router.register(r'services', ServiceViewSet)
router.register(r'reviews', ProductReviewViewSet)
router.register(r'service-reviews', ServiceReviewViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
