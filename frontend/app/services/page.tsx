'use client';

import { useEffect, useState } from 'react';
import { servicesAPI, categoriesAPI, shopsAPI, Service, Category, Shop } from '@/lib/api';
import { Store, Clock, Search } from 'lucide-react';
import Link from 'next/link';

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [shops, setShops] = useState<Shop[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [shopFilter, setShopFilter] = useState('');
  const [serviceTypeFilter, setServiceTypeFilter] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesResponse, categoriesResponse, shopsResponse] = await Promise.all([
          servicesAPI.getAll(),
          categoriesAPI.getAll(),
          shopsAPI.getAll(),
        ]);
        setServices(servicesResponse.data.results);
        setCategories(categoriesResponse.data.results);
        setShops(shopsResponse.data.results);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const serviceTypes = [
    { value: 'nail_art', label: 'Pose des ongles' },
    { value: 'manicure', label: 'Manucure' },
    { value: 'pedicure', label: 'Pédicure' },
    { value: 'wig_installation', label: 'Pose de perruque' },
    { value: 'hair_styling', label: 'Coiffure' },
    { value: 'makeup', label: 'Maquillage' },
    { value: 'facial', label: 'Soin du visage' },
    { value: 'massage', label: 'Massage' },
    { value: 'waxing', label: 'Épilation' },
    { value: 'other', label: 'Autre' },
  ];

  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !categoryFilter || service.category === Number(categoryFilter);
    const matchesShop = !shopFilter || service.shop === Number(shopFilter);
    const matchesType = !serviceTypeFilter || service.service_type === serviceTypeFilter;
    return matchesSearch && matchesCategory && matchesShop && matchesType;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Services de Beauté</h1>
        <p className="text-lg text-gray-600">
          Réservez vos services de beauté préférés
        </p>
      </div>

      {/* Filters */}
      <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher un service..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <select
            value={serviceTypeFilter}
            onChange={(e) => setServiceTypeFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="">Tous les types</option>
            {serviceTypes.map(type => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="">Toutes les catégories</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>

          <select
            value={shopFilter}
            onChange={(e) => setShopFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="">Toutes les boutiques</option>
            {shops.map(shop => (
              <option key={shop.id} value={shop.id}>{shop.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement des services...</p>
        </div>
      )}

      {/* Services Grid */}
      {!loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map(service => (
            <Link key={service.id} href={`/services/${service.id}`}>
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
                {service.image ? (
                  <img 
                    src={service.image} 
                    alt={service.name}
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-48 bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
                    <Store className="w-16 h-16 text-white" />
                  </div>
                )}
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{service.name}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{service.description}</p>
                  
                  <div className="flex items-center text-sm text-gray-600 mb-3">
                    <Store className="w-4 h-4 mr-2 text-green-600" />
                    <span>{service.shop_name}</span>
                  </div>

                  <div className="flex items-center text-sm text-gray-600 mb-4">
                    <Clock className="w-4 h-4 mr-2 text-green-600" />
                    <span>{service.duration_minutes} minutes</span>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                    <span className="text-2xl font-bold text-green-600">
                      {Number(service.price).toLocaleString()} FCFA
                    </span>
                    <span className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full">
                      Réserver
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && filteredServices.length === 0 && (
        <div className="text-center py-12">
          <Store className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Aucun service trouvé</p>
        </div>
      )}
    </div>
  );
}
