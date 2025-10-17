'use client';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Savon de Marseille</h3>
            <p className="text-gray-400">
              Votre source de savon de Marseille authentique et naturel.
              Fabriqué selon la tradition marseillaise depuis des générations.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Email: contact@savon-marseille.fr</li>
              <li>Téléphone: +33 4 91 00 00 00</li>
              <li>Adresse: Marseille, France</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Liens Rapides</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/products" className="hover:text-white transition">Nos Produits</a></li>
              <li><a href="/wholesale" className="hover:text-white transition">Vente en Gros</a></li>
              <li><a href="/about" className="hover:text-white transition">À Propos</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Savon de Marseille. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
