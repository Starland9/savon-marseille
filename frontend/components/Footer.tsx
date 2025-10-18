'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Cosmétiques Marketplace</h3>
            <p className="text-gray-400">
              Votre marketplace de produits cosmétiques et services de beauté au Cameroun.
              Achetez et vendez en toute simplicité.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Email: contact@marketplace-cosmetiques.cm</li>
              <li>Téléphone: +237 6 XX XX XX XX</li>
              <li>Adresse: Douala, Cameroun</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Liens Rapides</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/products" className="hover:text-white transition">Nos Produits</Link></li>
              <li><Link href="/wholesale" className="hover:text-white transition">Vente en Gros</Link></li>
              <li><Link href="/about" className="hover:text-white transition">À Propos</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Cosmétiques Marketplace Cameroun. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
