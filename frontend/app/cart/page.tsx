'use client';

import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useState } from 'react';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const [orderType, setOrderType] = useState<'retail' | 'wholesale'>('retail');

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <ShoppingBag className="h-24 w-24 text-gray-400 mx-auto mb-6" />
        <h1 className="text-3xl font-bold mb-4">Votre panier est vide</h1>
        <p className="text-gray-600 mb-8">
          Découvrez nos produits et ajoutez-les à votre panier
        </p>
        <Link
          href="/products"
          className="inline-block bg-green-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-600 transition"
        >
          Voir nos produits
        </Link>
      </div>
    );
  }

  const total = getCartTotal(orderType === 'wholesale');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Votre Panier</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => {
            const price = orderType === 'wholesale' 
              ? parseFloat(item.product.wholesale_price) 
              : parseFloat(item.product.price);
            
            return (
              <div key={item.product.id} className="bg-white rounded-lg shadow-md p-4">
                <div className="flex items-center gap-4">
                  <div className="w-24 h-24 bg-gray-200 rounded flex items-center justify-center flex-shrink-0">
                    {item.product.image ? (
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover rounded"
                      />
                    ) : (
                      <ShoppingBag className="h-12 w-12 text-gray-400" />
                    )}
                  </div>

                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{item.product.name}</h3>
                    <p className="text-sm text-gray-600">{item.product.weight}</p>
                    <p className="text-green-700 font-bold mt-2">
                      €{price.toFixed(2)}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-12 text-center font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="p-1 hover:bg-gray-100 rounded"
                      disabled={item.quantity >= item.product.stock}
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="text-right">
                    <p className="font-bold text-lg">
                      €{(price * item.quantity).toFixed(2)}
                    </p>
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-red-500 hover:text-red-700 mt-2"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
            <h2 className="text-2xl font-bold mb-6">Résumé</h2>

            {/* Order Type Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Type de commande</label>
              <div className="space-y-2">
                <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="orderType"
                    value="retail"
                    checked={orderType === 'retail'}
                    onChange={(e) => setOrderType(e.target.value as 'retail')}
                    className="mr-3"
                  />
                  <div>
                    <div className="font-semibold">Vente au détail</div>
                    <div className="text-sm text-gray-600">Prix standard</div>
                  </div>
                </label>
                <label className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="orderType"
                    value="wholesale"
                    checked={orderType === 'wholesale'}
                    onChange={(e) => setOrderType(e.target.value as 'wholesale')}
                    className="mr-3"
                  />
                  <div>
                    <div className="font-semibold">Vente en gros</div>
                    <div className="text-sm text-gray-600">Prix réduits</div>
                  </div>
                </label>
              </div>
            </div>

            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-green-700">€{total.toFixed(2)}</span>
              </div>
            </div>

            <Link
              href="/checkout"
              className="block w-full bg-green-700 text-white text-center py-3 rounded-lg font-semibold hover:bg-green-600 transition"
            >
              Procéder au paiement
            </Link>

            <Link
              href="/products"
              className="block w-full text-center text-green-700 py-3 hover:underline mt-4"
            >
              Continuer mes achats
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
