# Cosmétiques Marketplace - Plateforme E-Commerce

Plateforme marketplace de vente de produits cosmétiques et services de beauté au Cameroun.

## 🌟 Fonctionnalités

- **Marketplace multi-vendeurs** - Les vendeurs peuvent créer des boutiques et publier leurs produits/services
- **Produits cosmétiques variés** - Savons, huiles, parfums, vernis à ongles, maquillage, perruques, etc.
- **Services de beauté** - Pose d'ongles, manucure, pédicure, coiffure, pose de perruque, etc.
- **Achat sans inscription** - Les clients peuvent commander sans créer de compte
- **Vente avec inscription** - Les vendeurs doivent créer un compte et une boutique
- **Catalogue de produits** avec filtres et recherche
- **Panier d'achat** persistant
- **Système de commande** complet
- **Réservation de services** avec prise de rendez-vous
- **Vente au détail et en gros** avec prix différenciés
- **Interface responsive** et professionnelle
- **Administration Django** pour gérer les boutiques, produits, services et commandes
- **API REST** pour le frontend
- **Devise locale** - FCFA (XAF)

## 🛠️ Technologies

### Backend

- **Django 5.0** - Framework web Python
- **Django REST Framework** - API REST
- **SQLite** - Base de données (facilement remplaçable par PostgreSQL)
- **Pillow** - Traitement d'images

### Frontend

- **Next.js 15** - Framework React
- **TypeScript** - Typage statique
- **Tailwind CSS** - Styles
- **Lucide React** - Icônes
- **Axios** - Requêtes HTTP

## 📋 Prérequis

- Python 3.8+
- Node.js 18+
- npm ou yarn

## 🚀 Installation et Démarrage

### Backend (Django)

1. **Naviguer vers le dossier backend**

```bash
cd backend
```

2. **Créer un environnement virtuel**

```bash
python -m venv venv
source venv/bin/activate  # Sur Windows: venv\Scripts\activate
```

3. **Installer les dépendances**

```bash
pip install -r requirements.txt
```

4. **Appliquer les migrations**

```bash
python manage.py migrate
```

5. **Créer un superutilisateur (optionnel)**

```bash
python manage.py createsuperuser
```

6. **Charger les données d'exemple**

```bash
python manage.py populate_db
```

7. **Démarrer le serveur**

```bash
python manage.py runserver
```

Le backend sera accessible sur `http://localhost:8000`
L'administration Django sur `http://localhost:8000/admin`

### Frontend (Next.js)

1. **Naviguer vers le dossier frontend**

```bash
cd frontend
```

2. **Installer les dépendances**

```bash
npm install
```

3. **Copier le fichier d'environnement**

```bash
cp .env.example .env.local
```

4. **Démarrer le serveur de développement**

```bash
npm run dev
```

Le frontend sera accessible sur `http://localhost:3000`

## 📁 Structure du Projet

```
savon-marseille/
├── backend/
│   ├── savon_marseille/          # Configuration Django
│   ├── products/                  # App produits et services
│   │   ├── models.py             # Modèles Category, Product, Service, Reviews
│   │   ├── serializers.py        # Serializers API
│   │   ├── views.py              # ViewSets API
│   │   └── admin.py              # Admin Django
│   ├── orders/                    # App commandes et réservations
│   │   ├── models.py             # Modèles Order, OrderItem, ServiceBooking
│   │   ├── serializers.py        # Serializers API
│   │   ├── views.py              # ViewSets API
│   │   └── admin.py              # Admin Django
│   ├── users/                     # App utilisateurs et boutiques
│   │   ├── models.py             # Modèle Shop
│   │   ├── serializers.py        # Serializers API
│   │   ├── views.py              # ViewSets API
│   │   └── admin.py              # Admin Django
│   └── manage.py
├── frontend/
│   ├── app/                       # Pages Next.js
│   │   ├── page.tsx              # Page d'accueil
│   │   ├── products/             # Page produits
│   │   ├── cart/                 # Page panier
│   │   ├── checkout/             # Page paiement
│   │   ├── wholesale/            # Page vente en gros
│   │   └── about/                # Page à propos
│   ├── components/                # Composants réutilisables
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── ProductCard.tsx
│   ├── context/                   # Context React
│   │   └── CartContext.tsx       # Gestion du panier
│   └── lib/
│       └── api.ts                # Client API
└── README.md
```

## 🔧 API Endpoints

### Produits

- `GET /api/products/categories/` - Liste des catégories
- `GET /api/products/products/` - Liste des produits
- `GET /api/products/products/{id}/` - Détails d'un produit
- `GET /api/products/products/featured/` - Produits vedettes
- `GET /api/products/reviews/` - Avis clients sur produits

### Services

- `GET /api/products/services/` - Liste des services
- `GET /api/products/services/{id}/` - Détails d'un service
- `GET /api/products/services/featured/` - Services vedettes
- `GET /api/products/service-reviews/` - Avis clients sur services

### Boutiques

- `GET /api/users/shops/` - Liste des boutiques
- `GET /api/users/shops/{id}/` - Détails d'une boutique
- `POST /api/users/shops/` - Créer une boutique (authentification requise)
- `GET /api/users/shops/my_shops/` - Mes boutiques (authentification requise)

### Commandes

- `POST /api/orders/orders/` - Créer une commande
- `GET /api/orders/orders/{id}/` - Détails d'une commande
- `POST /api/orders/orders/{id}/cancel/` - Annuler une commande

### Réservations de services

- `POST /api/orders/bookings/` - Créer une réservation
- `GET /api/orders/bookings/{id}/` - Détails d'une réservation
- `POST /api/orders/bookings/{id}/cancel/` - Annuler une réservation
- `POST /api/orders/bookings/{id}/confirm/` - Confirmer une réservation

## 🎨 Fonctionnalités Principales

### Pour les Clients

1. **Navigation intuitive** - Menu clair avec accès facile aux différentes sections
2. **Recherche et filtres** - Trouvez rapidement les produits et services souhaités
3. **Panier intelligent** - Sauvegarde automatique, mise à jour en temps réel
4. **Checkout simplifié** - Processus de commande en une seule page, sans besoin de créer un compte
5. **Prix différenciés** - Prix de détail et prix de gros clairement affichés
6. **Réservation de services** - Prenez rendez-vous pour des services de beauté
7. **Devise locale** - Prix affichés en FCFA (XAF)

### Pour les Vendeurs

1. **Création de boutique** - Inscription et création de votre boutique personnalisée
2. **Gestion de produits** - Ajoutez et gérez vos produits cosmétiques
3. **Gestion de services** - Proposez des services de beauté avec réservation
4. **Suivi des commandes** - Visualisez et gérez vos commandes
5. **Profil de boutique** - Logo, bannière, description et informations de contact
6. **Vérification** - Les boutiques peuvent être vérifiées par les administrateurs

### Pour les Administrateurs

1. **Interface d'administration Django** - Gestion complète de la plateforme
2. **Gestion des boutiques** - Approbation et modération des boutiques
3. **Gestion des produits et services** - Modération et organisation
4. **Gestion des commandes** - Suivi du statut des commandes
5. **Gestion des réservations** - Suivi des réservations de services
6. **Catégorisation** - Organisation des produits et services par catégories

## 🎯 Prochaines Étapes Possibles

- Intégration d'un système de paiement mobile (Mobile Money, Orange Money)
- Système d'authentification utilisateur complet avec tableau de bord
- Tableau de bord vendeur avec statistiques de ventes
- Historique des commandes pour les clients
- Notifications par email et SMS
- Gestion des promotions et codes promo
- Export des commandes en PDF
- Tableau de bord analytique
- Support multilingue (Français, Anglais)
- Application mobile (React Native)

## 🐳 Déploiement avec Docker

Le projet inclut une configuration Docker pour un déploiement facile.

### Prérequis

- Docker
- Docker Compose

### Démarrage avec Docker

1. **Cloner le repository**

```bash
git clone https://github.com/Starland9/savon-marseille.git
cd savon-marseille
```

2. **Modifier les variables d'environnement**
Éditez le fichier `docker-compose.yml` et changez `SECRET_KEY` en production.

3. **Construire et démarrer les services**

```bash
docker-compose up --build
```

L'application sera accessible sur:

- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- Admin Django: http://localhost:8000/admin

### Arrêter les services
```bash
docker-compose down
```

## 🎯 Prochaines Étapes Possibles

- Intégration d'un système de paiement (Stripe, PayPal)
- Système d'authentification utilisateur
- Historique des commandes pour les clients
- Notifications par email
- Gestion des promotions et codes promo
- Export des commandes en PDF
- Tableau de bord analytique
- Support multilingue

## 📝 Personnalisation

### Ajouter des Produits

1. Accédez à l'admin Django: `http://localhost:8000/admin`
2. Connectez-vous avec vos identifiants superutilisateur
3. Naviguez vers "Products" > "Add"
4. Remplissez les informations du produit

### Modifier les Styles
Les styles sont gérés avec Tailwind CSS dans le frontend. Modifiez les classes dans les composants pour personnaliser l'apparence.

### Configurer la Base de Données
Par défaut, SQLite est utilisé. Pour passer à PostgreSQL:

1. Installez `psycopg2-binary`
2. Modifiez `DATABASES` dans `backend/savon_marseille/settings.py`

## 🤝 Support

Pour toute question ou problème:

- Email: contact@savon-marseille.fr
- Ouvrez une issue sur le repository

## 📄 Licence

Ce projet est sous licence MIT.

---

Développé avec ❤️ pour la tradition marseillaise
