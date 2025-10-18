'use client';

import { Product } from '@/lib/api';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import { ShoppingCart, Package } from 'lucide-react';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
  isWholesale?: boolean;
}

export default function ProductCard({ product, isWholesale = false }: ProductCardProps) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const price = isWholesale ? parseFloat(product.wholesale_price) : parseFloat(product.price);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <Link href={`/products/${product.id}`}>
        <div className="relative h-64 bg-gray-200 flex items-center justify-center">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <Package className="h-24 w-24 text-gray-400" />
          )}
          {!product.in_stock && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="text-white font-bold text-lg">Rupture de stock</span>
            </div>
          )}
        </div>
      </Link>
      
      <div className="p-4">
        <Link href={`/products/${product.id}`}>
          <h3 className="text-lg font-semibold text-gray-800 hover:text-green-700 transition mb-2">
            {product.name}
          </h3>
        </Link>
        
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
        
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-gray-500">{product.weight}</span>
          <span className="text-sm text-gray-500">{product.category_name}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-green-700">
              €{price.toFixed(2)}
            </p>
            {isWholesale && (
              <p className="text-xs text-gray-500">Prix de gros</p>
            )}
          </div>
          
          {product.in_stock && (
            <div className="flex items-center space-x-2">
              <input
                type="number"
                min="1"
                max={product.stock}
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-16 px-2 py-1 border border-gray-300 rounded text-center"
              />
              <button
                onClick={handleAddToCart}
                className={`px-4 py-2 rounded-lg transition ${
                  added
                    ? 'bg-green-500 text-white'
                    : 'bg-green-700 hover:bg-green-600 text-white'
                }`}
              >
                {added ? '✓' : <ShoppingCart className="h-5 w-5" />}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
