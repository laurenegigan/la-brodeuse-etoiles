import { getAllCategories } from '../models/categoryModel.js'

export async function listCategories(req, res) {
  try {
    const categories = await getAllCategories()
    res.json(categories)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erreur serveur lors de la récupération des catégories' })
  }
}