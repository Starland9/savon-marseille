# Savon de Marseille - Documentation des Fonctionnalités

## 📚 Vue d'Ensemble

Cette plateforme e-commerce complète permet la vente de savon de Marseille authentique avec support pour la vente au détail et en gros.

## 🎯 Fonctionnalités Principales

### 1. Catalogue de Produits
- **Affichage de produits** avec images, descriptions, prix
- **Filtrage par catégorie** (Traditionnel, Parfumé, Artisanal)
- **Recherche textuelle** dans les noms et descriptions
- **Tri des produits** par prix, date de création, nom
- **Pagination automatique** (12 produits par page)
- **Gestion du stock** en temps réel

### 2. Pages Produits
- **Page de liste** avec grille responsive
- **Page de détail** pour chaque produit avec:
  - Image en grand format
  - Description complète
  - Liste d'ingrédients
  - Prix de détail et prix de gros
  - Niveau de stock
  - Avis clients avec notes
  - Ajout au panier avec sélection de quantité

### 3. Panier d'Achat
- **Persistance locale** (localStorage)
- **Mise à jour en temps réel** du nombre d'articles
- **Modification des quantités** directement dans le panier
- **Suppression d'articles**
- **Calcul automatique** des totaux
- **Sélection du type de commande** (détail/gros) avec mise à jour des prix

### 4. Processus de Commande
- **Formulaire de commande** complet avec:
  - Informations client (nom, email, téléphone)
  - Adresse de livraison complète
  - Type de commande (détail/gros)
  - Notes optionnelles
- **Validation des données**
- **Création automatique de commande** via API
- **Confirmation de commande** avec numéro
- **Mise à jour automatique du stock**

### 5. Vente en Gros
- **Page dédiée** aux professionnels
- **Prix réduits** affichés clairement
- **Avantages expliqués** (prix, stock, support)
- **Formulaire de contact** pour commandes personnalisées

### 6. Interface Utilisateur
- **Design responsive** (mobile, tablette, desktop)
- **Navigation intuitive** avec menu clair
- **Indicateur de panier** avec badge de nombre d'articles
- **Messages de confirmation** visuels
- **Animations fluides** pour les interactions
- **Thème vert** rappelant le naturel et l'authenticité

## 🔧 Fonctionnalités Backend

### API REST (Django REST Framework)

#### Endpoints Produits
```
GET  /api/products/categories/          # Liste des catégories
GET  /api/products/products/            # Liste des produits (avec filtres)
GET  /api/products/products/{id}/       # Détail d'un produit
GET  /api/products/products/featured/   # Produits vedettes
GET  /api/products/reviews/             # Avis clients
POST /api/products/reviews/             # Créer un avis
```

#### Endpoints Commandes
```
POST /api/orders/orders/                # Créer une commande
GET  /api/orders/orders/{id}/           # Détail d'une commande
POST /api/orders/orders/{id}/cancel/    # Annuler une commande
```

### Modèles de Données

#### Category (Catégorie)
- Nom
- Description
- Dates de création/modification

#### Product (Produit)
- Nom
- Description
- Catégorie
- Poids (100g, 300g, 600g, 1kg)
- Prix de détail
- Prix de gros
- Stock
- Image
- Ingrédients
- Statut actif/inactif
- Dates de création/modification

#### ProductReview (Avis)
- Produit associé
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
- Montant total
- Notes
- Dates de création/modification

#### OrderItem (Article de commande)
- Commande associée
- Produit
- Quantité
- Prix au moment de l'achat

### Administration Django
- **Interface admin complète** pour gérer:
  - Catégories
  - Produits (avec modification en ligne du stock et statut)
  - Avis clients
  - Commandes (avec items en ligne)
- **Recherche et filtres** sur tous les modèles
- **Statistiques** de commandes par statut

## 🎨 Pages Frontend

### 1. Page d'Accueil (/)
- Hero section avec appel à l'action
- Section avantages (4 points forts)
- Produits vedettes (8 premiers)
- Section "Notre Histoire"

### 2. Page Produits (/products)
- Barre de recherche
- Filtre par catégorie
- Grille de produits
- Pagination

### 3. Page Détail Produit (/products/[id])
- Image produit
- Informations complètes
- Prix détail et gros
- Sélection quantité
- Ajout au panier
- Section avis clients

### 4. Page Panier (/cart)
- Liste des articles
- Modification quantités
- Suppression d'articles
- Sélection type de commande
- Récapitulatif avec total
- Bouton vers paiement

### 5. Page Paiement (/checkout)
- Formulaire complet
- Récapitulatif de commande
- Confirmation de commande
- Numéro de commande

### 6. Page Vente en Gros (/wholesale)
- Présentation des avantages
- Tous les produits avec prix de gros
- Section contact

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
