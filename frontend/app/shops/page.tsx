'use client';

import { useEffect, useState } from 'react';
import { shopsAPI, Shop } from '@/lib/api';
import { Store, MapPin, Phone, Mail, Package, Star } from 'lucide-react';
import Link from 'next/link';

export default function ShopsPage() {
  const [shops, setShops] = useState<Shop[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [cityFilter, setCityFilter] = useState('');

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const response = await shopsAPI.getAll();
        setShops(response.data.results);
      } catch (error) {
        console.error('Error fetching shops:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchShops();
  }, []);

  const filteredShops = shops.filter(shop => {
    const matchesSearch = shop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         shop.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCity = !cityFilter || shop.city === cityFilter;
    return matchesSearch && matchesCity;
  });

  const cities = Array.from(new Set(shops.map(shop => shop.city)));

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Nos Boutiques</h1>
        <p className="text-lg text-gray-600">
          Découvrez toutes nos boutiques de cosmétiques et services de beauté
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8 flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Rechercher une boutique..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
        <select
          value={cityFilter}
          onChange={(e) => setCityFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        >
          <option value="">Toutes les villes</option>
          {cities.map(city => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement des boutiques...</p>
        </div>
      )}

      {/* Shops Grid */}
      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredShops.map(shop => (
            <Link key={shop.id} href={`/shops/${shop.id}`}>
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
                {/* Banner */}
                {shop.banner ? (
                  <img 
                    src={shop.banner} 
                    alt={shop.name}
                    className="w-full h-32 object-cover"
                  />
                ) : (
                  <div className="w-full h-32 bg-gradient-to-r from-green-400 to-green-600"></div>
                )}
                
                {/* Logo */}
                <div className="relative px-6 pb-6">
                  <div className="absolute -top-10 left-6">
                    {shop.logo ? (
                      <img 
                        src={shop.logo} 
                        alt={shop.name}
                        className="w-20 h-20 rounded-full border-4 border-white object-cover bg-white"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-full border-4 border-white bg-green-100 flex items-center justify-center">
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
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{shop.name}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{shop.description}</p>
                    
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2 text-green-600" />
                        <span>{shop.city}</span>
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

                    <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between text-sm text-gray-600">
                      <div className="flex items-center">
                        <Package className="w-4 h-4 mr-1" />
                        <span>{shop.product_count} produits</span>
                      </div>
                      <div className="flex items-center">
                        <Store className="w-4 h-4 mr-1" />
                        <span>{shop.service_count} services</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredShops.length === 0 && (
        <div className="text-center py-12">
          <Store className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Aucune boutique trouvée</p>
        </div>
      )}
    </div>
  );
}
