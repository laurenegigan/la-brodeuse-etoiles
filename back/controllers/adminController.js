import { getAllOrders } from '../models/orderModel.js'
import { getAllSubscribers, getDesabonnementStats } from '../models/mailclubModel.js'
import { getAllContactMessages } from '../models/contactModel.js'
import { createProduct, updateProduct, deleteProduct } from '../models/productModel.js'

// GET /admin/commandes
export async function listAllOrders(req, res) {
  try {
    const commandes = await getAllOrders()
    res.json(commandes)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erreur serveur lors de la récupération des commandes' })
  }
}

// GET /admin/mailclub
export async function listAllSubscribers(req, res) {
  try {
    const abonnes = await getAllSubscribers()
    res.json(abonnes)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erreur serveur lors de la récupération des abonnés' })
  }
}

// GET /admin/mailclub/stats
export async function subscribersStats(req, res) {
  try {
    const stats = await getDesabonnementStats()
    res.json(stats)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erreur serveur lors de la récupération des statistiques' })
  }
}

// GET /admin/messages
export async function listAllMessages(req, res) {
  try {
    const messages = await getAllContactMessages()
    res.json(messages)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erreur serveur lors de la récupération des messages' })
  }
}

// POST /admin/produits
export async function addProduct(req, res) {
  try {
    const { nom, description, prix, image_url, stock, categorie_id } = req.body

    if (!nom || !prix || stock === undefined) {
      return res.status(400).json({ error: 'Nom, prix et stock sont requis' })
    }

    const id = await createProduct(nom, description, prix, image_url, stock, categorie_id)
    res.status(201).json({ message: 'Produit créé', id })

  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erreur serveur lors de la création du produit' })
  }
}

// PUT /admin/produits/:id
export async function editProduct(req, res) {
  try {
    const { id } = req.params
    const { nom, description, prix, image_url, stock, categorie_id } = req.body

    if (!nom || !prix || stock === undefined) {
      return res.status(400).json({ error: 'Nom, prix et stock sont requis' })
    }

    await updateProduct(id, nom, description, prix, image_url, stock, categorie_id)
    res.json({ message: 'Produit mis à jour' })

  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erreur serveur lors de la modification du produit' })
  }
}

// DELETE /admin/produits/:id
export async function removeProduct(req, res) {
  try {
    const { id } = req.params
    await deleteProduct(id)
    res.json({ message: 'Produit supprimé' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erreur serveur lors de la suppression du produit' })
  }
}