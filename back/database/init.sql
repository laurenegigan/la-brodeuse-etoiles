-- Création de la base de données
CREATE DATABASE IF NOT EXISTS brodeuse_etoiles
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE brodeuse_etoiles;

-- ============================================
-- TABLE : categories
-- ============================================
CREATE TABLE categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(50) NOT NULL UNIQUE
);

-- ============================================
-- TABLE : collections
-- ============================================
CREATE TABLE collections (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(100) NOT NULL,
  description TEXT,
  slug VARCHAR(100) NOT NULL UNIQUE
);

-- ============================================
-- TABLE : produits
-- ============================================
CREATE TABLE produits (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(150) NOT NULL,
  description TEXT,
  prix DECIMAL(10,2) NOT NULL,
  image_url VARCHAR(255),
  stock INT NOT NULL DEFAULT 0,
  categorie_id INT,
  date_creation DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (categorie_id) REFERENCES categories(id) ON DELETE SET NULL
);

-- ============================================
-- TABLE : produit_collection (relation N-N)
-- ============================================
CREATE TABLE produit_collection (
  produit_id INT NOT NULL,
  collection_id INT NOT NULL,
  PRIMARY KEY (produit_id, collection_id),
  FOREIGN KEY (produit_id) REFERENCES produits(id) ON DELETE CASCADE,
  FOREIGN KEY (collection_id) REFERENCES collections(id) ON DELETE CASCADE
);

-- ============================================
-- TABLE : utilisateurs
-- ============================================
CREATE TABLE utilisateurs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  prenom VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  mot_de_passe VARCHAR(255),
  google_id VARCHAR(255),
  role ENUM('user', 'admin') DEFAULT 'user',
  date_inscription DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- TABLE : commandes
-- ============================================
CREATE TABLE commandes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  utilisateur_id INT NOT NULL,
  date_commande DATETIME DEFAULT CURRENT_TIMESTAMP,
  statut ENUM('en_attente', 'envoye', 'livre') DEFAULT 'en_attente',
  total DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (utilisateur_id) REFERENCES utilisateurs(id) ON DELETE CASCADE
);

-- ============================================
-- TABLE : commande_produits (relation N-N)
-- ============================================
CREATE TABLE commande_produits (
  id INT AUTO_INCREMENT PRIMARY KEY,
  commande_id INT NOT NULL,
  produit_id INT NOT NULL,
  quantite INT NOT NULL DEFAULT 1,
  prix_unitaire DECIMAL(10,2) NOT NULL,
  FOREIGN KEY (commande_id) REFERENCES commandes(id) ON DELETE CASCADE,
  FOREIGN KEY (produit_id) REFERENCES produits(id) ON DELETE CASCADE
);

-- ============================================
-- TABLE : mailclub_inscrits
-- ============================================
CREATE TABLE mailclub_inscrits (
  id INT AUTO_INCREMENT PRIMARY KEY,
  utilisateur_id INT NOT NULL UNIQUE,
  email VARCHAR(150) NOT NULL,
  prenom VARCHAR(100) NOT NULL,
  statut ENUM('actif', 'en_pause', 'resilie') DEFAULT 'actif',
  date_inscription DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (utilisateur_id) REFERENCES utilisateurs(id) ON DELETE CASCADE
);

-- ============================================
-- TABLE : desabonnements
-- ============================================
CREATE TABLE desabonnements (
  id INT AUTO_INCREMENT PRIMARY KEY,
  mailclub_id INT NOT NULL,
  raison ENUM('trop_cher', 'peu_contenu', 'autre') NOT NULL,
  commentaire TEXT,
  date_desabonnement DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (mailclub_id) REFERENCES mailclub_inscrits(id) ON DELETE CASCADE
);

-- ============================================
-- TABLE : messages_contact
-- ============================================
CREATE TABLE messages_contact (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL,
  message TEXT NOT NULL,
  date_envoi DATETIME DEFAULT CURRENT_TIMESTAMP
);

USE brodeuse_etoiles;

-- ============================================
-- CATÉGORIES
-- ============================================
INSERT INTO categories (nom) VALUES
('Illustration'),
('Papeterie'),
('Sticker');

-- ============================================
-- COLLECTIONS
-- ============================================
INSERT INTO collections (nom, description, slug) VALUES
('Les Royaumes Oubliés', 'Une collection inspirée des terres fantastiques perdues', 'royaumes-oublies'),
('Spooky', 'Créatures et ambiances mystérieuses', 'spooky');

-- ============================================
-- PRODUITS
-- ============================================
INSERT INTO produits (nom, description, prix, image_url, stock, categorie_id) VALUES
('La Forêt des Songes', 'Une illustration fantastique représentant une forêt enchantée baignée de lumière dorée. Imprimée sur papier mat 300g, format A4.', 14.00, 'product-1.jpg', 12, 1),
('Carnet "Lune de Minuit"', 'Un carnet à couverture illustrée inspiré des nuits fantastiques. Pages blanches, idéal pour vos notes, croquis et pensées magiques.', 9.00, 'product-2.jpg', 3, 2),
('Pack "Créatures des Bois"', 'Un pack de 5 stickers illustrés représentant les créatures fantastiques des forêts enchantées. Vinyle waterproof, finition mate.', 6.00, 'product-3.jpg', 0, 3),
('Le Royaume Oublié', 'Une illustration épique d\'un royaume fantastique perdu dans les brumes du temps. Imprimée sur papier mat 300g, format A4.', 14.00, 'product-4.jpg', 8, 1);

-- ============================================
-- LIAISON PRODUIT <-> COLLECTION
-- ============================================
INSERT INTO produit_collection (produit_id, collection_id) VALUES
(1, 1),
(4, 1);

-- ============================================
-- UTILISATEUR ADMIN DE TEST
-- ============================================
-- mot de passe : admin123 (sera hashé plus tard avec bcrypt)
INSERT INTO utilisateurs (prenom, email, mot_de_passe, role) VALUES
('Laurène', 'admin@brodeuse-etoiles.fr', 'admin123', 'admin'),
('Mathilde', 'mathilde@email.com', 'test1234', 'user');

-- ============================================
-- INSCRIPTION MAIL CLUB DE TEST
-- ============================================
INSERT INTO mailclub_inscrits (utilisateur_id, email, prenom, statut) VALUES
(2, 'mathilde@email.com', 'Mathilde', 'actif');