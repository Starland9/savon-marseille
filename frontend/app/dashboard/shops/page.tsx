'use client';

import { useEffect, useState } from 'react';
import { shopsAPI, Shop } from '@/lib/api';
import Link from 'next/link';
import { Store, Plus, Edit, Package, ShoppingBag, MapPin, Phone, Mail, Star, ArrowLeft } from 'lucide-react';

export default function ManageShopsPage() {
  const [shops, setShops] = useState<Shop[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMyShops = async () => {
      try {
        const response = await shopsAPI.getMyShops();
        setShops(response.data);
      } catch (err: any) {
        console.error('Error fetching shops:', err);
        if (err.response?.status === 401) {
          setError('Vous devez être authentifié pour accéder à cette page.');
        } else {
          setError('Une erreur est survenue lors du chargement de vos boutiques.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMyShops();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/dashboard" className="inline-flex items-center text-green-600 hover:text-green-700 mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Retour au tableau de bord
      </Link>

      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Mes Boutiques</h1>
          <p className="text-lg text-gray-600">Gérez vos boutiques et leurs produits</p>
        </div>
        <Link
          href="/dashboard/shops/create"
          className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition"
        >
          <Plus className="w-5 h-5 mr-2" />
          Nouvelle boutique
        </Link>
      </div>

      {loading && (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement de vos boutiques...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && shops.length === 0 && (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <Store className="w-20 h-20 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Aucune boutique</h3>
          <p className="text-gray-600 mb-6">
            Vous n&apos;avez pas encore créé de boutique. Commencez maintenant !
          </p>
          <Link
            href="/dashboard/shops/create"
            className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition"
          >
            <Plus className="w-5 h-5 mr-2" />
            Créer ma première boutique
          </Link>
        </div>
      )}

      {!loading && !error && shops.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {shops.map(shop => (
            <div key={shop.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              {shop.banner ? (
                <img 
                  src={shop.banner} 
                  alt={shop.name}
                  className="w-full h-32 object-cover"
                />
              ) : (
                <div className="w-full h-32 bg-gradient-to-r from-green-400 to-green-600"></div>
              )}
              
              <div className="relative px-6 pb-6">
                <div className="absolute -top-10 left-6">
                  {shop.logo ? (
                    <img 
                      src={shop.logo} 
                      alt={shop.name}
                      className="w-20 h-20 rounded-full border-4 border-white object-cover bg-white shadow-lg"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-full border-4 border-white bg-green-100 flex items-center justify-center shadow-lg">
                      <Store className="w-10 h-10 text-green-700" />
                    </div>
                  )}
                  {shop.is_verified && (
                    <div className="absolute -top-1 -right-1 bg-blue-500 rounded-full p-1">
                      <Star className="w-4 h-4 text-white fill-white" />
                    </div>
                  )}
                </div>
                
                <div className="pt-12">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-900">{shop.name}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      shop.is_active 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {shop.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{shop.description}</p>
                  
                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-green-600" />
                      <span className="truncate">{shop.city}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 mr-2 text-green-600" />
                      <span>{shop.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 mr-2 text-green-600" />
                      <span className="truncate">{shop.email}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200 flex justify-between text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <Package className="w-4 h-4 mr-1" />
                      <span>{shop.product_count} produits</span>
                    </div>
                    <div className="flex items-center">
                      <ShoppingBag className="w-4 h-4 mr-1" />
                      <span>{shop.service_count} services</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Link
                      href={`/shops/${shop.id}`}
                      className="flex-1 text-center px-4 py-2 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition text-sm font-medium"
                    >
                      Voir
                    </Link>
                    <button
                      className="flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm font-medium"
                      title="Modifier"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && !error && (
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Note importante</h3>
          <p className="text-blue-800 text-sm">
            Pour gérer complètement vos boutiques (modifier, ajouter des produits et services), 
            vous devez utiliser l&apos;interface d&apos;administration Django ou l&apos;API REST directement. 
            Cette interface est un prototype qui nécessite une authentification complète.
          </p>
        </div>
      )}
    </div>
  );
}
