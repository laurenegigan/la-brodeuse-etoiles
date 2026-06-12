import { getAllProducts, getProductById, getProductsByCategory } from '../models/productModel.js'

export async function listProducts(req, res) {
  try {
    const { categorie } = req.query

    let produits
    if (categorie) {
      produits = await getProductsByCategory(categorie)
    } else {
      produits = await getAllProducts()
    }

    res.json(produits)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erreur serveur lors de la récupération des produits' })
  }
}

export async function getProduct(req, res) {
  try {
    const { id } = req.params
    const produit = await getProductById(id)

    if (!produit) {
      return res.status(404).json({ error: 'Produit introuvable' })
    }

    res.json(produit)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erreur serveur lors de la récupération du produit' })
  }
}