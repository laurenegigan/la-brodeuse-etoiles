import { createOrder, addOrderItems, getOrdersByUserId, getProductStock, decrementStock } from '../models/orderModel.js'

// POST /commandes - Créer une commande
export async function placeOrder(req, res) {
  try {
    const { id: utilisateurId } = req.user
    const { items } = req.body
    // items = [{ produit_id: 1, quantite: 2 }, ...]

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'La commande doit contenir au moins un produit' })
    }

    // Vérifier le stock et récupérer les prix
    const { default: pool } = await import('../config/db.js')
    const itemsAvecPrix = []
    let total = 0

    for (const item of items) {
      const [rows] = await pool.query('SELECT prix, stock FROM produits WHERE id = ?', [item.produit_id])
      const produit = rows[0]

      if (!produit) {
        return res.status(404).json({ error: `Produit ${item.produit_id} introuvable` })
      }

      if (produit.stock < item.quantite) {
        return res.status(400).json({ error: `Stock insuffisant pour le produit ${item.produit_id}` })
      }

      const prixUnitaire = parseFloat(produit.prix)
      itemsAvecPrix.push({ ...item, prix_unitaire: prixUnitaire })
      total += prixUnitaire * item.quantite
    }

    // Créer la commande
    const commandeId = await createOrder(utilisateurId, total.toFixed(2))
    await addOrderItems(commandeId, itemsAvecPrix)

    // Décrémenter le stock
    for (const item of itemsAvecPrix) {
      await decrementStock(item.produit_id, item.quantite)
    }

    res.status(201).json({ message: 'Commande créée avec succès', id: commandeId, total: total.toFixed(2) })

  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erreur serveur lors de la création de la commande' })
  }
}

// GET /user/commandes - Historique des commandes
export async function getMyOrders(req, res) {
  try {
    const { id: utilisateurId } = req.user
    const commandes = await getOrdersByUserId(utilisateurId)
    res.json(commandes)

  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erreur serveur lors de la récupération des commandes' })
  }
}