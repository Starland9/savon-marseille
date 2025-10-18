from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, ShopViewSet

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'shops', ShopViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
