'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { productsAPI, Product } from '@/lib/api';
import { useCart } from '@/context/CartContext';
import { ShoppingCart, ArrowLeft, Star, Package } from 'lucide-react';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await productsAPI.getById(Number(params.id));
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchProduct();
    }
  }, [params.id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-700"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Produit non trouvé</h1>
        <button
          onClick={() => router.push('/products')}
          className="text-green-700 hover:underline"
        >
          Retour aux produits
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => router.back()}
        className="flex items-center text-green-700 hover:text-green-600 mb-8"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Retour
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="bg-gray-200 rounded-lg flex items-center justify-center" style={{ minHeight: '400px' }}>
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            <Package className="h-48 w-48 text-gray-400" />
          )}
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
          
          <div className="flex items-center gap-4 mb-6">
            <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded">
              {product.category_name}
            </span>
            <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded">
              {product.weight}
            </span>
            {product.average_rating > 0 && (
              <div className="flex items-center">
                <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                <span className="ml-1 text-sm text-gray-600">
                  {product.average_rating.toFixed(1)} ({product.reviews.length} avis)
                </span>
              </div>
            )}
          </div>

          <p className="text-gray-700 mb-6 text-lg leading-relaxed">
            {product.description}
          </p>

          {product.ingredients && (
            <div className="mb-6">
              <h3 className="font-semibold text-lg mb-2">Ingrédients</h3>
              <p className="text-gray-600">{product.ingredients}</p>
            </div>
          )}

          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Prix de détail</p>
                <p className="text-3xl font-bold text-green-700">{parseFloat(product.price).toFixed(0)} FCFA</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Prix de gros</p>
                <p className="text-2xl font-bold text-blue-700">{parseFloat(product.wholesale_price).toFixed(0)} FCFA</p>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <p className="text-sm text-gray-600 mb-2">
              Stock disponible: <span className="font-semibold">{product.stock} unités</span>
            </p>
            {!product.in_stock && (
              <p className="text-red-600 font-semibold">Rupture de stock</p>
            )}
          </div>

          {product.in_stock && (
            <div className="flex items-center gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Quantité</label>
                <input
                  type="number"
                  min="1"
                  max={product.stock}
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, Math.min(product.stock, parseInt(e.target.value) || 1)))}
                  className="w-24 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium mb-2">&nbsp;</label>
                <button
                  onClick={handleAddToCart}
                  className={`w-full py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2 ${
                    added
                      ? 'bg-green-500 text-white'
                      : 'bg-green-700 hover:bg-green-600 text-white'
                  }`}
                >
                  {added ? (
                    <>
                      <span>✓</span>
                      <span>Ajouté au panier</span>
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="h-5 w-5" />
                      <span>Ajouter au panier</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Reviews Section */}
      {product.reviews && product.reviews.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Avis clients</h2>
          <div className="space-y-4">
            {product.reviews.map((review) => (
              <div key={review.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="font-semibold">{review.user_name}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(review.created_at).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < review.rating
                            ? 'text-yellow-500 fill-yellow-500'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
