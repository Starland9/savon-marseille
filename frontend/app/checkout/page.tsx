'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { ordersAPI, Order } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { CheckCircle } from 'lucide-react';

export default function CheckoutPage() {
  const { cart, clearCart, getCartTotal } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderId, setOrderId] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    shipping_address: '',
    shipping_city: '',
    shipping_postal_code: '',
    shipping_country: 'France',
    order_type: 'retail' as 'retail' | 'wholesale',
    notes: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const order: Order = {
        ...formData,
        items: cart.map(item => ({
          product_id: item.product.id,
          quantity: item.quantity,
        })),
      };

      const response = await ordersAPI.create(order);
      setOrderId(response.data.id);
      setOrderSuccess(true);
      clearCart();
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Une erreur est survenue lors de la création de votre commande. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0 && !orderSuccess) {
    router.push('/cart');
    return null;
  }

  if (orderSuccess) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <CheckCircle className="h-24 w-24 text-green-600 mx-auto mb-6" />
        <h1 className="text-4xl font-bold mb-4">Commande confirmée !</h1>
        <p className="text-gray-600 mb-2">
          Merci pour votre commande. Nous vous avons envoyé un email de confirmation.
        </p>
        <p className="text-gray-600 mb-8">
          Numéro de commande: <span className="font-bold">#{orderId}</span>
        </p>
        <button
          onClick={() => router.push('/products')}
          className="bg-green-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-600 transition"
        >
          Retour aux produits
        </button>
      </div>
    );
  }

  const total = getCartTotal(formData.order_type === 'wholesale');

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Finaliser la commande</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-6">
            {/* Customer Information */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">Informations client</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Nom complet *</label>
                  <input
                    type="text"
                    name="customer_name"
                    value={formData.customer_name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email *</label>
                  <input
                    type="email"
                    name="customer_email"
                    value={formData.customer_email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Téléphone *</label>
                  <input
                    type="tel"
                    name="customer_phone"
                    value={formData.customer_phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">Adresse de livraison</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Adresse *</label>
                  <input
                    type="text"
                    name="shipping_address"
                    value={formData.shipping_address}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Ville *</label>
                    <input
                      type="text"
                      name="shipping_city"
                      value={formData.shipping_city}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Code postal *</label>
                    <input
                      type="text"
                      name="shipping_postal_code"
                      value={formData.shipping_postal_code}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Pays *</label>
                  <input
                    type="text"
                    name="shipping_country"
                    value={formData.shipping_country}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Order Type */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">Type de commande</h2>
              <select
                name="order_type"
                value={formData.order_type}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="retail">Vente au détail</option>
                <option value="wholesale">Vente en gros</option>
              </select>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium mb-2">Notes (optionnel)</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Ajoutez des notes pour votre commande..."
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-700 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition disabled:bg-gray-400"
            >
              {loading ? 'Traitement...' : 'Confirmer la commande'}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
            <h2 className="text-2xl font-bold mb-6">Résumé</h2>

            <div className="space-y-4 mb-6">
              {cart.map((item) => {
                const price = formData.order_type === 'wholesale'
                  ? parseFloat(item.product.wholesale_price)
                  : parseFloat(item.product.price);
                
                return (
                  <div key={item.product.id} className="flex justify-between text-sm">
                    <span>
                      {item.product.name} x {item.quantity}
                    </span>
                    <span>€{(price * item.quantity).toFixed(2)}</span>
                  </div>
                );
              })}
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-green-700">€{total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
