'use client';

import { useEffect, useState } from 'react';
import { productsAPI, Product } from '@/lib/api';
import ProductCard from '@/components/ProductCard';
import { TrendingUp, Package, Users } from 'lucide-react';

export default function WholesalePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productsAPI.getAll();
        setProducts(response.data.results);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">Vente en Gros</h1>
            <p className="text-xl mb-8">
              Commandez en gros et profitez de prix avantageux pour votre entreprise.
              Parfait pour les hôtels, restaurants, boutiques et revendeurs.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Avantages de la vente en gros</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-blue-700" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Prix Réduits</h3>
              <p className="text-gray-600">
                Bénéficiez de prix avantageux sur toutes nos commandes en gros.
                Plus vous achetez, plus vous économisez.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="h-8 w-8 text-blue-700" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Stock Disponible</h3>
              <p className="text-gray-600">
                Large stock disponible pour répondre à tous vos besoins.
                Livraison rapide et fiable.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-blue-700" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Support Dédié</h3>
              <p className="text-gray-600">
                Une équipe dédiée pour vous accompagner dans vos commandes
                et répondre à vos questions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Nos Produits en Gros
          </h2>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} isWholesale={true} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              Besoin d'une commande personnalisée ?
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              Contactez-nous pour discuter de vos besoins spécifiques.
              Nous proposons des solutions sur mesure pour les grandes commandes.
            </p>
            <a
              href="mailto:contact@savon-marseille.fr"
              className="inline-block bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 transition"
            >
              Nous contacter
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
