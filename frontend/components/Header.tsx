'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { ShoppingCart, Package, LogIn } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Header() {
  const { getCartCount } = useCart();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check authentication status
    const token = localStorage.getItem('auth_token');
    setIsAuthenticated(!!token);
  }, []);

  return (
    <header className="bg-green-700 text-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Package className="h-8 w-8" />
            <div>
              <h1 className="text-2xl font-bold">Cosmétiques Marketplace</h1>
              <p className="text-sm text-green-100">Beauté & Bien-être</p>
            </div>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="hover:text-green-200 transition">
              Accueil
            </Link>
            <Link href="/products" className="hover:text-green-200 transition">
              Produits
            </Link>
            <Link href="/services" className="hover:text-green-200 transition">
              Services
            </Link>
            <Link href="/shops" className="hover:text-green-200 transition">
              Boutiques
            </Link>
            <Link href="/wholesale" className="hover:text-green-200 transition">
              Vente en Gros
            </Link>
            <Link href="/about" className="hover:text-green-200 transition">
              À Propos
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <Link
                href="/dashboard"
                className="flex items-center space-x-2 bg-green-600 hover:bg-green-500 px-4 py-2 rounded-lg transition"
              >
                <Package className="h-5 w-5" />
                <span className="hidden sm:inline">Tableau de bord</span>
              </Link>
            ) : (
              <Link
                href="/auth/login"
                className="flex items-center space-x-2 bg-green-600 hover:bg-green-500 px-4 py-2 rounded-lg transition"
              >
                <LogIn className="h-5 w-5" />
                <span className="hidden sm:inline">Connexion</span>
              </Link>
            )}
            
            <Link
              href="/cart"
              className="relative flex items-center space-x-2 bg-green-600 hover:bg-green-500 px-4 py-2 rounded-lg transition"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="hidden sm:inline">Panier</span>
              {getCartCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                  {getCartCount()}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
