# Cosmétiques Marketplace - Documentation des Fonctionnalités

## 📚 Vue d'Ensemble

Cette plateforme marketplace complète permet la vente de produits cosmétiques et services de beauté avec support multi-vendeurs et système de vente au détail et en gros.

## 🎯 Fonctionnalités Principales

### 1. Marketplace Multi-vendeurs

- **Inscription vendeur** - Création de compte pour devenir vendeur
- **Création de boutique** - Chaque vendeur peut créer sa boutique personnalisée
- **Gestion de profil boutique** - Logo, bannière, description, coordonnées
- **Vérification de boutique** - Les boutiques peuvent être vérifiées par les administrateurs
- **Statut boutique** - Actif/Inactif pour contrôler la visibilité

### 2. Catalogue de Produits Cosmétiques

- **Types de produits variés** :
  - Savons naturels et artisanaux
  - Huiles corporelles et essentielles
  - Parfums et eaux de toilette
  - Vernis à ongles et soins des ongles
  - Maquillage (fond de teint, rouge à lèvres, etc.)
  - Soins des cheveux (shampoings, masques)
  - Soins de la peau (crèmes, sérums)
  - Perruques naturelles et synthétiques
  - Autres produits cosmétiques

- **Affichage de produits** avec images, descriptions, prix en FCFA
- **Filtrage** par catégorie, type de produit, boutique
- **Recherche textuelle** dans les noms et descriptions
- **Tri des produits** par prix, date de création, nom
- **Pagination automatique** (12 produits par page)
- **Gestion du stock** en temps réel

### 3. Services de Beauté

- **Types de services** :
  - Pose d'ongles et nail art
  - Manucure et pédicure
  - Pose de perruque
  - Coiffure et styling
  - Maquillage professionnel
  - Soins du visage
  - Massage
  - Épilation
  - Autres services

- **Système de réservation** avec date et heure
- **Durée estimée** pour chaque service
- **Prix en FCFA**
- **Confirmation de réservation** par le vendeur
- **Annulation** possible par le client ou le vendeur

### 4. Pages Produits

- **Page de liste** avec grille responsive
- **Page de détail** pour chaque produit avec:
  - Image en grand format
  - Description complète
  - Type de produit et catégorie
  - Boutique vendeur
  - Quantité et unité (grammes, millilitres, unités)
  - Prix de détail et prix de gros en FCFA
  - Niveau de stock
  - Avis clients avec notes
  - Ajout au panier avec sélection de quantité

### 5. Panier d'Achat

- **Persistance locale** (localStorage)
- **Mise à jour en temps réel** du nombre d'articles
- **Modification des quantités** directement dans le panier
- **Suppression d'articles**
- **Calcul automatique** des totaux en FCFA
- **Sélection du type de commande** (détail/gros) avec mise à jour des prix

### 6. Processus de Commande

- **Achat sans inscription** - Les clients peuvent commander sans créer de compte
- **Formulaire de commande** complet avec:
  - Informations client (nom, email, téléphone)
  - Adresse de livraison complète au Cameroun
  - Type de commande (détail/gros)
  - Notes optionnelles
- **Validation des données**
- **Création automatique de commande** via API
- **Confirmation de commande** avec numéro
- **Mise à jour automatique du stock**

### 7. Vente en Gros

- **Page dédiée** aux professionnels
- **Prix réduits** affichés clairement en FCFA
- **Avantages expliqués** (prix, stock, support)
- **Tous les produits** avec prix de gros

### 8. Interface Utilisateur

- **Design responsive** (mobile, tablette, desktop)
- **Navigation intuitive** avec menu clair
- **Indicateur de panier** avec badge de nombre d'articles
- **Messages de confirmation** visuels
- **Animations fluides** pour les interactions
- **Thème vert** moderne et professionnel
- **Localisation Cameroun** - Prix en FCFA, pays par défaut Cameroun

## 🔧 Fonctionnalités Backend

### API REST (Django REST Framework)

#### Endpoints Produits
```
GET  /api/products/categories/          # Liste des catégories
GET  /api/products/products/            # Liste des produits (avec filtres)
GET  /api/products/products/{id}/       # Détail d'un produit
GET  /api/products/products/featured/   # Produits vedettes
GET  /api/products/reviews/             # Avis clients sur produits
POST /api/products/reviews/             # Créer un avis sur un produit
```

#### Endpoints Services
```
GET  /api/products/services/            # Liste des services
GET  /api/products/services/{id}/       # Détail d'un service
GET  /api/products/services/featured/   # Services vedettes
GET  /api/products/service-reviews/     # Avis clients sur services
POST /api/products/service-reviews/     # Créer un avis sur un service
```

#### Endpoints Boutiques
```
GET  /api/users/shops/                  # Liste des boutiques
GET  /api/users/shops/{id}/             # Détail d'une boutique
POST /api/users/shops/                  # Créer une boutique (auth requise)
PUT  /api/users/shops/{id}/             # Modifier une boutique (auth requise)
GET  /api/users/shops/my_shops/         # Mes boutiques (auth requise)
```

#### Endpoints Commandes
```
POST /api/orders/orders/                # Créer une commande
GET  /api/orders/orders/{id}/           # Détail d'une commande
POST /api/orders/orders/{id}/cancel/    # Annuler une commande
```

#### Endpoints Réservations
```
POST /api/orders/bookings/              # Créer une réservation de service
GET  /api/orders/bookings/{id}/         # Détail d'une réservation
POST /api/orders/bookings/{id}/cancel/  # Annuler une réservation
POST /api/orders/bookings/{id}/confirm/ # Confirmer une réservation
```

### Modèles de Données

#### Category (Catégorie)

- Nom
- Description
- Dates de création/modification

#### Shop (Boutique)

- Propriétaire (User)
- Nom de la boutique
- Description
- Logo et bannière
- Téléphone, email
- Adresse, ville
- Statut actif/inactif
- Statut vérifié/non vérifié
- Dates de création/modification

#### Product (Produit cosmétique)

- Nom
- Description
- Type de produit (savon, huile, parfum, vernis, maquillage, etc.)
- Catégorie
- Boutique vendeur
- Quantité et unité (g, ml, unité)
- Prix de détail (FCFA)
- Prix de gros (FCFA)
- Stock
- Image
- Ingrédients
- Statut actif/inactif
- Dates de création/modification

#### Service (Service de beauté)

- Nom
- Description
- Type de service (manucure, pédicure, coiffure, maquillage, etc.)
- Catégorie
- Boutique vendeur
- Prix (FCFA)
- Durée (minutes)
- Image
- Statut actif/inactif
- Dates de création/modification

#### ProductReview (Avis produit)

- Produit associé
- Nom de l'utilisateur
- Email
- Note (1-5)
- Commentaire
- Date de création

#### ServiceReview (Avis service)

- Service associé
- Nom de l'utilisateur
- Email
- Note (1-5)
- Commentaire
- Date de création

#### Order (Commande)

- Informations client (nom, email, téléphone)
- Adresse de livraison (adresse, ville, code postal, pays)
- Type de commande (détail/gros)
- Statut (en attente, en traitement, expédié, livré, annulé)
- Montant total (FCFA)
- Notes
- Dates de création/modification

#### OrderItem (Article de commande)

- Commande associée
- Produit (optionnel)
- Service (optionnel)
- Quantité
- Prix au moment de l'achat (FCFA)

#### ServiceBooking (Réservation de service)

- Service associé
- Informations client (nom, email, téléphone)
- Date de réservation
- Heure de réservation
- Statut (en attente, confirmé, terminé, annulé)
- Notes
- Dates de création/modification

### Administration Django

- **Interface admin complète** pour gérer:
  - Boutiques (avec modification en ligne du statut actif et vérifié)
  - Catégories
  - Produits (avec modification en ligne du stock et statut)
  - Services (avec modification en ligne du statut)
  - Avis clients (produits et services)
  - Commandes (avec items en ligne)
  - Réservations de services
- **Recherche et filtres** sur tous les modèles
- **Statistiques** de commandes par statut

## 🎨 Pages Frontend

### 1. Page d'Accueil (/)

- Hero section avec appel à l'action pour la marketplace
- Section avantages (4 points forts de la marketplace)
- Produits vedettes (8 premiers)
- Section "À propos de la marketplace"

### 2. Page Produits (/products)

- Barre de recherche
- Filtres par catégorie, type de produit, boutique
- Grille de produits
- Pagination
- Prix en FCFA

### 3. Page Détail Produit (/products/[id])

- Image produit
- Informations complètes (type, catégorie, boutique)
- Prix détail et gros en FCFA
- Quantité et unité
- Sélection quantité
- Ajout au panier
- Section avis clients

### 4. Page Panier (/cart)

- Liste des articles
- Modification quantités
- Suppression d'articles
- Sélection type de commande (détail/gros)
- Récapitulatif avec total en FCFA
- Bouton vers paiement

### 5. Page Paiement (/checkout)

- Formulaire complet (pays par défaut: Cameroun)
- Récapitulatif de commande
- Confirmation de commande
- Numéro de commande
- Prix en FCFA

### 6. Page Vente en Gros (/wholesale)

- Présentation des avantages
- Tous les produits avec prix de gros en FCFA
- Section pour créer sa boutique

### 7. Page À Propos (/about)

- Histoire du savon de Marseille
- Nos valeurs
- Processus de fabrication
- Informations de contact

## 🔐 Sécurité

- **CORS configuré** pour le frontend
- **Validation des données** côté backend
- **Protection CSRF** activée
- **Secret key** à changer en production
- **Variables d'environnement** pour configuration sensible

## 📦 Déploiement

### Docker

- **Backend Dockerfile** avec Gunicorn
- **Frontend Dockerfile** avec build optimisé
- **Docker Compose** pour orchestration facile
- **Volumes** pour persistance des données

### Variables d'Environnement

**Backend:**

- `DEBUG` - Mode debug (False en production)
- `SECRET_KEY` - Clé secrète Django
- `ALLOWED_HOSTS` - Hôtes autorisés

**Frontend:**

- `NEXT_PUBLIC_API_URL` - URL de l'API backend

## 🚀 Performance

- **Requêtes optimisées** avec select_related/prefetch_related
- **Pagination** pour limiter la charge
- **Images optimisables** via Next.js Image
- **Build statique** possible pour certaines pages
- **Cache** configurable

## 🎯 Améliorations Futures Possibles

1. **Paiement en ligne** (Stripe, PayPal)
2. **Authentification utilisateur**
3. **Profils clients** avec historique
4. **Notifications email** automatiques
5. **Tracking de livraison**
6. **Système de promotions**
7. **Programme de fidélité**
8. **Export PDF** des commandes
9. **Multilingue** (français, anglais)
10. **PWA** pour mobile
11. **Chat support** en direct
12. **Blog** sur le savon de Marseille
13. **Tests automatisés**
14. **CI/CD pipeline**
15. **Monitoring et analytics**

## 📊 Métriques Clés

- Temps de chargement optimisé
- Responsive design testé sur tous devices
- API REST complète et documentée
- Code TypeScript pour sécurité type
- Architecture modulaire et maintenable
