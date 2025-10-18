'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Store, Package, ShoppingBag, Calendar, Plus, Settings } from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('auth_token');
    if (!token) {
      router.push('/auth/login');
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700 mx-auto"></div>
        <p className="mt-4 text-gray-600">Vérification de l&apos;authentification...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Tableau de bord vendeur</h1>
        <p className="text-lg text-gray-600">Gérez vos boutiques, produits et services</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <Store className="w-8 h-8 text-green-600" />
            <span className="text-3xl font-bold text-gray-900">0</span>
          </div>
          <h3 className="text-gray-600 font-medium">Mes Boutiques</h3>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <Package className="w-8 h-8 text-blue-600" />
            <span className="text-3xl font-bold text-gray-900">0</span>
          </div>
          <h3 className="text-gray-600 font-medium">Produits Actifs</h3>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <ShoppingBag className="w-8 h-8 text-purple-600" />
            <span className="text-3xl font-bold text-gray-900">0</span>
          </div>
          <h3 className="text-gray-600 font-medium">Services Actifs</h3>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <Calendar className="w-8 h-8 text-orange-600" />
            <span className="text-3xl font-bold text-gray-900">0</span>
          </div>
          <h3 className="text-gray-600 font-medium">Réservations</h3>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Link href="/dashboard/shops/create">
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg shadow-md p-8 text-white cursor-pointer hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold">Créer une boutique</h3>
              <Plus className="w-10 h-10" />
            </div>
            <p className="text-green-50">
              Commencez à vendre en créant votre première boutique
            </p>
          </div>
        </Link>

        <Link href="/dashboard/shops">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-md p-8 text-white cursor-pointer hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-bold">Gérer mes boutiques</h3>
              <Settings className="w-10 h-10" />
            </div>
            <p className="text-blue-50">
              Modifiez et gérez vos boutiques existantes
            </p>
          </div>
        </Link>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Activité récente</h2>
        <div className="text-center py-12">
          <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Aucune activité récente</p>
          <p className="text-sm text-gray-500 mt-2">
            Créez une boutique pour commencer à vendre vos produits et services
          </p>
        </div>
      </div>

      {/* Info Notice */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Note importante</h3>
        <p className="text-blue-800">
          Ce tableau de bord est une interface utilisateur prototype. Les fonctionnalités complètes 
          nécessitent l&apos;intégration avec le backend Django pour la gestion des boutiques, 
          produits, services et réservations.
        </p>
      </div>
    </div>
  );
}
