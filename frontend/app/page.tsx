"use client";

import { useEffect, useState } from "react";
import { productsAPI, Product } from "@/lib/api";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import { Sparkles, Package, Users, Award } from "lucide-react";

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await productsAPI.getFeatured();
        setFeaturedProducts(response.data);
      } catch (error) {
        console.error("Error fetching featured products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-800 text-white">
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Savon de Marseille Authentique
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Découvrez notre collection de savons de Marseille traditionnels,
            fabriqués selon des méthodes ancestrales avec des ingrédients
            naturels.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="bg-white text-green-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Voir nos produits
            </Link>
            <Link
              href="/wholesale"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-700 transition"
            >
              Vente en gros
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-8 w-8 text-green-700" />
              </div>
              <h3 className="text-lg font-semibold mb-2">100% Naturel</h3>
              <p className="text-gray-600">
                Ingrédients naturels et biodégradables
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="h-8 w-8 text-green-700" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Livraison Rapide</h3>
              <p className="text-gray-600">Expédition sous 24-48h</p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-green-700" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Vente en Gros</h3>
              <p className="text-gray-600">
                Prix avantageux pour les professionnels
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-green-700" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Qualité Garantie</h3>
              <p className="text-gray-600">
                Fabrication traditionnelle marseillaise
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Nos Produits Vedettes
          </h2>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-700"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              href="/products"
              className="inline-block bg-green-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-600 transition"
            >
              Voir tous les produits
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Notre Histoire</h2>
            <p className="text-lg text-gray-700 mb-4">
              Le savon de Marseille est un produit traditionnel français
              fabriqué depuis des siècles. Notre engagement est de perpétuer
              cette tradition en utilisant uniquement des ingrédients naturels
              et en suivant les méthodes de fabrication ancestrales.
            </p>
            <p className="text-lg text-gray-700">
              Chaque savon est soigneusement fabriqué à Marseille, garantissant
              une qualité exceptionnelle et un respect de l'environnement.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
