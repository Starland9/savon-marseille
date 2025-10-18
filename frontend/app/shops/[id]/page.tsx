'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { shopsAPI, productsAPI, servicesAPI, Shop, Product, Service } from '@/lib/api';
import { Store, MapPin, Phone, Mail, Star, Package } from 'lucide-react';
import Link from 'next/link';

export default function ShopDetailPage() {
  const params = useParams();
  const shopId = Number(params.id);
  
  const [shop, setShop] = useState<Shop | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'products' | 'services'>('products');

  useEffect(() => {
    const fetchShopData = async () => {
      try {
        const [shopResponse, productsResponse, servicesResponse] = await Promise.all([
          shopsAPI.getById(shopId),
          productsAPI.getAll({ shop: shopId }),
          servicesAPI.getAll({ shop: shopId }),
        ]);
        setShop(shopResponse.data);
        setProducts(productsResponse.data.results);
        setServices(servicesResponse.data.results);
      } catch (error) {
        console.error('Error fetching shop data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchShopData();
  }, [shopId]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700 mx-auto"></div>
        <p className="mt-4 text-gray-600">Chargement...</p>
      </div>
    );
  }

  if (!shop) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <Store className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600">Boutique non trouvée</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Shop Header */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
        {shop.banner ? (
          <img 
            src={shop.banner} 
            alt={shop.name}
            className="w-full h-48 object-cover"
          />
        ) : (
          <div className="w-full h-48 bg-gradient-to-r from-green-400 to-green-600"></div>
        )}
        
        <div className="relative px-6 pb-6">
          <div className="absolute -top-16 left-6">
            {shop.logo ? (
              <img 
                src={shop.logo} 
                alt={shop.name}
                className="w-32 h-32 rounded-full border-4 border-white object-cover bg-white shadow-lg"
              />
            ) : (
              <div className="w-32 h-32 rounded-full border-4 border-white bg-green-100 flex items-center justify-center shadow-lg">
                <Store className="w-16 h-16 text-green-700" />
              </div>
            )}
            {shop.is_verified && (
              <div className="absolute -top-2 -right-2 bg-blue-500 rounded-full p-2">
                <Star className="w-6 h-6 text-white fill-white" />
              </div>
            )}
          </div>
          
          <div className="pt-20">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{shop.name}</h1>
                {shop.is_verified && (
                  <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                    <Star className="w-4 h-4 mr-1 fill-current" />
                    Boutique vérifiée
                  </span>
                )}
              </div>
              <div className="mt-4 md:mt-0 flex gap-2">
                <span className="px-4 py-2 bg-green-100 text-green-800 rounded-lg">
                  {shop.product_count} produits
                </span>
                <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-lg">
                  {shop.service_count} services
                </span>
              </div>
            </div>
            
            <p className="text-gray-600 mb-6">{shop.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-green-600" />
                <div>
                  <p className="font-medium">Adresse</p>
                  <p>{shop.address}, {shop.city}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 mr-2 text-green-600" />
                <div>
                  <p className="font-medium">Téléphone</p>
                  <p>{shop.phone}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 mr-2 text-green-600" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="truncate">{shop.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6 border-b border-gray-200">
        <div className="flex space-x-8">
          <button
            onClick={() => setActiveTab('products')}
            className={`pb-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'products'
                ? 'border-green-500 text-green-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Produits ({products.length})
          </button>
          <button
            onClick={() => setActiveTab('services')}
            className={`pb-4 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'services'
                ? 'border-green-500 text-green-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Services ({services.length})
          </button>
        </div>
      </div>

      {/* Products Tab */}
      {activeTab === 'products' && (
        <div>
          {products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map(product => (
                <Link key={product.id} href={`/products/${product.id}`}>
                  <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
                    {product.image ? (
                      <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                    ) : (
                      <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                        <Package className="w-12 h-12 text-gray-400" />
                      </div>
                    )}
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">{product.name}</h3>
                      <p className="text-green-600 font-bold mb-2">{Number(product.price).toLocaleString()} FCFA</p>
                      {product.in_stock ? (
                        <span className="text-sm text-green-600">En stock</span>
                      ) : (
                        <span className="text-sm text-red-600">Rupture de stock</span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Aucun produit disponible</p>
            </div>
          )}
        </div>
      )}

      {/* Services Tab */}
      {activeTab === 'services' && (
        <div>
          {services.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map(service => (
                <Link key={service.id} href={`/services/${service.id}`}>
                  <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
                    {service.image ? (
                      <img src={service.image} alt={service.name} className="w-full h-48 object-cover" />
                    ) : (
                      <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                        <Store className="w-12 h-12 text-gray-400" />
                      </div>
                    )}
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{service.name}</h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{service.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-green-600 font-bold">{Number(service.price).toLocaleString()} FCFA</span>
                        <span className="text-sm text-gray-500">{service.duration_minutes} min</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Store className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">Aucun service disponible</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
