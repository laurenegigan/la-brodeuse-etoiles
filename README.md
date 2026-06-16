# La Brodeuse d'Étoiles ✦

Boutique artisanale en ligne — stickers, papeterie, illustrations et club d'abonnement mensuel, dans un univers fantastique et gothique.

Projet réalisé dans le cadre du titre professionnel **Développeur Web et Web Mobile (DWWM)**.

---

## Stack technique

| Couche | Technologies |
|---|---|
| Front-end | React (Vite), React Router |
| Back-end | Node.js, Express (architecture MVC) |
| Base de données SQL | MySQL |
| Base de données NoSQL | MongoDB (Mongoose) — avis produits |
| Authentification | JWT, bcrypt, Passport.js (Google OAuth 2.0) |
| Conteneurisation | Docker, Docker Compose |

---

## Prérequis

- [Node.js](https://nodejs.org/) v20 ou supérieur
- [npm](https://www.npmjs.com/)
- [MySQL](https://www.mysql.com/) (en local) — ou Docker
- Un compte [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (cluster gratuit M0)
- [Docker](https://www.docker.com/) et Docker Compose (optionnel, pour le lancement conteneurisé)

---

## Variables d'environnement

Le projet utilise deux fichiers `.env`, qui ne sont jamais commités sur le repo.

### `back/.env`

```env
PORT=3001

# Base de données MySQL
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=votre_mot_de_passe_mysql
DB_NAME=brodeuse_etoiles

# JWT
JWT_SECRET=une_chaine_secrete_longue_et_aleatoire

# MongoDB Atlas
MONGO_URI=mongodb+srv://utilisateur:motdepasse@cluster0.xxxxx.mongodb.net/brodeuse_etoiles?retryWrites=true&w=majority

# Google OAuth 2.0
GOOGLE_CLIENT_ID=votre_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=votre_client_secret
GOOGLE_CALLBACK_URL=http://localhost:3001/auth/google/callback
SESSION_SECRET=une_autre_chaine_secrete

# Front-end (pour les redirections OAuth)
FRONT_URL=http://localhost:5173
```

### `.env` (à la racine, pour Docker Compose uniquement)

```env
DB_USER=root
DB_PASSWORD=votre_mot_de_passe_mysql
DB_NAME=brodeuse_etoiles
```

---

## Installation et lancement classique (sans Docker)

### 1. Cloner le repo

```bash
git clone https://github.com/laurenegigan/la-brodeuse-etoiles.git
cd la-brodeuse-etoiles
```

### 2. Base de données MySQL

Créer la base et les tables à partir du script fourni :

```bash
mysql -u root -p < back/database/init.sql
```

Ou exécuter le contenu de `back/database/init.sql` directement dans MySQL Workbench.

### 3. Base de données MongoDB

Créer un cluster gratuit sur [MongoDB Atlas](https://www.mongodb.com/cloud/atlas), récupérer l'URI de connexion et l'ajouter dans `back/.env` (variable `MONGO_URI`).

Penser à autoriser l'accès réseau dans **Network Access** (IP de la machine, ou `0.0.0.0/0` en développement).

### 4. Back-end

```bash
cd back
npm install
npm run dev
```

Le serveur démarre sur `http://localhost:3001`.

### 5. Front-end

Dans un second terminal :

```bash
cd front
npm install
npm run dev
```

Le site est accessible sur `http://localhost:5173`.

---

## Lancement avec Docker

Le projet peut être lancé entièrement avec Docker Compose, qui orchestre 3 services : le front-end, le back-end et MySQL. MongoDB reste hébergé sur Atlas (cloud) et n'est pas conteneurisé.

### 1. Configurer les `.env`

Suivre la section [Variables d'environnement](#variables-denvironnement) ci-dessus : `back/.env` et `.env` à la racine doivent être créés.

### 2. Lancer les conteneurs

À la racine du projet :

```bash
docker compose up --build
```

Cette commande :
- construit l'image du back-end (Node/Express)
- construit l'image du front-end (build React puis serveur statique)
- démarre un conteneur MySQL et initialise automatiquement la base avec `back/database/init.sql`

### 3. Accéder à l'application

- Front-end : `http://localhost:5173`
- API back-end : `http://localhost:3001`
- MySQL (accessible depuis l'hôte) : `localhost:3309`

### 4. Arrêter les conteneurs

```bash
docker compose down
```

Pour réinitialiser complètement la base de données (supprime le volume) :

```bash
docker compose down -v
```

### Limitation connue

Un problème d'encodage affecte actuellement l'affichage des caractères accentués (é, è, à...) dans les réponses de l'API **uniquement lorsque le back-end communique avec MySQL via le réseau interne Docker**. Les données en base sont correctes (vérifié via le client MySQL en ligne de commande), et l'application fonctionne normalement en lancement classique (sans Docker) ou en connexion locale au conteneur MySQL exposé. Ce point est identifié comme axe d'amélioration.

---

## Structure du projet

```
la-brodeuse-etoiles/
├── front/                  # Application React (Vite)
│   ├── public/
│   └── src/
│       ├── components/     # Composants réutilisables (Navbar, Footer...)
│       ├── pages/          # Pages de l'application
│       └── styles/         # Feuilles de style CSS
│
├── back/                   # API Node.js / Express (MVC)
│   ├── config/             # Connexions MySQL, MongoDB, Passport
│   ├── controllers/        # Logique métier
│   ├── models/             # Accès aux données (SQL + Mongoose)
│   ├── routes/             # Définition des routes API
│   ├── middlewares/        # Authentification JWT, vérification admin
│   ├── utils/               # Filtre de modération
│   └── database/           # Script SQL d'initialisation
│
├── docker-compose.yml
└── README.md
```

---

## Comptes de test

| Rôle | Email | Mot de passe |
|---|---|---|
| Administratrice | laurene.admin@brodeuse-etoiles.fr | admin123 |
| Utilisatrice | camille@test.com | test1234 |

---

## Fonctionnalités principales

- Catalogue de produits filtrable par catégorie
- Fiche produit avec système d'avis (notes, commentaires, réponse de l'administratrice)
- Club d'abonnement mensuel (inscription, mise en pause, désabonnement avec motif)
- Authentification classique (JWT + bcrypt) et via Google OAuth 2.0
- Espace personnel (historique de commandes, gestion de l'abonnement)
- Espace d'administration (gestion des commandes, des abonnés, des produits et du stock, modération des avis)
- Filtre de modération automatique sur les pseudonymes et le contenu des avis
