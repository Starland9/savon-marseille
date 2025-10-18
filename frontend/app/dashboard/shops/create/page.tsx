'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { shopsAPI } from '@/lib/api';
import { Store, MapPin, Phone, Mail, FileText, Image as ImageIcon, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function CreateShopPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    phone: '',
    email: '',
    address: '',
    city: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await shopsAPI.create(formData);
      setSuccess(true);
      setTimeout(() => {
        router.push('/dashboard/shops');
      }, 2000);
    } catch (err: any) {
      console.error('Error creating shop:', err);
      setError(err.response?.data?.detail || 'Une erreur est survenue. Veuillez réessayer.');
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/dashboard" className="inline-flex items-center text-green-600 hover:text-green-700 mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Retour au tableau de bord
      </Link>

      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Créer une boutique</h1>
          <p className="text-lg text-gray-600">
            Remplissez les informations ci-dessous pour créer votre boutique
          </p>
        </div>

        {success && (
          <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
            <p className="font-medium">Boutique créée avec succès !</p>
            <p className="text-sm">Redirection en cours...</p>
          </div>
        )}

        {error && (
          <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <p>{error}</p>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="flex items-center text-gray-700 font-medium mb-2">
                <Store className="w-4 h-4 mr-2" />
                Nom de la boutique *
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Ma Boutique de Cosmétiques"
              />
            </div>

            <div>
              <label htmlFor="description" className="flex items-center text-gray-700 font-medium mb-2">
                <FileText className="w-4 h-4 mr-2" />
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                required
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Décrivez votre boutique et vos produits..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="email" className="flex items-center text-gray-700 font-medium mb-2">
                  <Mail className="w-4 h-4 mr-2" />
                  Email de contact *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="contact@maboutique.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="flex items-center text-gray-700 font-medium mb-2">
                  <Phone className="w-4 h-4 mr-2" />
                  Téléphone *
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="+237 6XX XX XX XX"
                />
              </div>
            </div>

            <div>
              <label htmlFor="address" className="flex items-center text-gray-700 font-medium mb-2">
                <MapPin className="w-4 h-4 mr-2" />
                Adresse *
              </label>
              <input
                id="address"
                name="address"
                type="text"
                required
                value={formData.address}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="123 Rue de la Beauté"
              />
            </div>

            <div>
              <label htmlFor="city" className="flex items-center text-gray-700 font-medium mb-2">
                <MapPin className="w-4 h-4 mr-2" />
                Ville *
              </label>
              <input
                id="city"
                name="city"
                type="text"
                required
                value={formData.city}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Douala"
              />
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start">
                <ImageIcon className="w-5 h-5 text-blue-600 mt-0.5 mr-3" />
                <div>
                  <h4 className="font-medium text-blue-900 mb-1">Logo et bannière</h4>
                  <p className="text-sm text-blue-700">
                    Après la création de votre boutique, vous pourrez ajouter un logo et une bannière 
                    depuis l&apos;interface d&apos;administration Django ou via l&apos;API.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Création en cours...' : 'Créer la boutique'}
              </button>
              <Link
                href="/dashboard"
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition"
              >
                Annuler
              </Link>
            </div>
          </form>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Note importante</h3>
            <p className="text-gray-600 text-sm">
              Pour créer une boutique, vous devez être authentifié. Cette fonctionnalité nécessite 
              une intégration complète avec le backend Django et un système d&apos;authentification JWT ou session.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
