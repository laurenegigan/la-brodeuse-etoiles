import pool from '../config/db.js'

// Créer une commande
export async function createOrder(utilisateurId, total) {
  const [result] = await pool.query(
    'INSERT INTO commandes (utilisateur_id, total, statut) VALUES (?, ?, ?)',
    [utilisateurId, total, 'en_attente']
  )
  return result.insertId
}

// Ajouter des produits à une commande
export async function addOrderItems(commandeId, items) {
  // items = [{ produit_id, quantite, prix_unitaire }, ...]
  const values = items.map(item => [commandeId, item.produit_id, item.quantite, item.prix_unitaire])

  await pool.query(
    'INSERT INTO commande_produits (commande_id, produit_id, quantite, prix_unitaire) VALUES ?',
    [values]
  )
}

// Récupérer les commandes d'un utilisateur
export async function getOrdersByUserId(utilisateurId) {
  const [commandes] = await pool.query(
    'SELECT * FROM commandes WHERE utilisateur_id = ? ORDER BY date_commande DESC',
    [utilisateurId]
  )

  // Pour chaque commande, récupérer ses produits
  for (const commande of commandes) {
    const [produits] = await pool.query(`
      SELECT cp.quantite, cp.prix_unitaire, p.nom, p.image_url
      FROM commande_produits cp
      JOIN produits p ON cp.produit_id = p.id
      WHERE cp.commande_id = ?
    `, [commande.id])
    commande.produits = produits
  }

  return commandes
}

// Vérifier le stock d'un produit
export async function getProductStock(produitId) {
  const [rows] = await pool.query('SELECT stock FROM produits WHERE id = ?', [produitId])
  return rows[0]?.stock
}

// Décrémenter le stock
export async function decrementStock(produitId, quantite) {
  await pool.query('UPDATE produits SET stock = stock - ? WHERE id = ?', [quantite, produitId])
}