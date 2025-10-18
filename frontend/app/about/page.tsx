export default function AboutPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-800 text-white">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">À Propos de Nous</h1>
            <p className="text-xl">
              Découvrez l'histoire et la tradition du savon de Marseille authentique
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Notre Histoire</h2>
            <div className="space-y-4 text-lg text-gray-700">
              <p>
                Le savon de Marseille est un produit emblématique de la tradition française,
                fabriqué depuis le 17ème siècle dans la région de Marseille. Notre entreprise
                perpétue cette tradition ancestrale en proposant des savons authentiques,
                fabriqués selon les méthodes traditionnelles.
              </p>
              <p>
                Nous utilisons uniquement des ingrédients naturels de haute qualité,
                principalement de l'huile d'olive pure, garantissant ainsi un produit
                100% naturel et biodégradable, respectueux de votre peau et de l'environnement.
              </p>
              <p>
                Chaque savon est fabriqué avec soin et attention, suivant un processus
                de saponification traditionnel qui prend plusieurs semaines. Ce procédé
                unique garantit la qualité exceptionnelle de nos savons.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Nos Valeurs</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🌿</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Naturel</h3>
              <p className="text-gray-600">
                Ingrédients 100% naturels et biodégradables, sans produits chimiques nocifs
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🏛️</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Tradition</h3>
              <p className="text-gray-600">
                Fabrication selon les méthodes traditionnelles marseillaises
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">✨</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Qualité</h3>
              <p className="text-gray-600">
                Contrôle qualité rigoureux pour garantir l'excellence de chaque savon
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Production Process */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Notre Processus de Fabrication</h2>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Sélection des ingrédients</h3>
                  <p className="text-gray-600">
                    Nous sélectionnons rigoureusement nos matières premières, en privilégiant
                    l'huile d'olive de Provence pour sa qualité exceptionnelle.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Saponification</h3>
                  <p className="text-gray-600">
                    Le mélange d'huile et de soude est chauffé dans de grandes cuves,
                    suivant le procédé traditionnel marseillais.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Moulage et découpe</h3>
                  <p className="text-gray-600">
                    Le savon est coulé dans des moules puis découpé à la main
                    selon les formats traditionnels.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Séchage</h3>
                  <p className="text-gray-600">
                    Les savons sont séchés à l'air libre pendant plusieurs semaines,
                    garantissant leur dureté et leur longévité.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 bg-green-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Contactez-nous</h2>
            <p className="text-xl mb-8">
              Vous avez des questions ? N'hésitez pas à nous contacter !
            </p>
            <div className="space-y-2">
              <p>Email: contact@savon-marseille.fr</p>
              <p>Téléphone: +33 4 91 00 00 00</p>
              <p>Adresse: Marseille, France</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
