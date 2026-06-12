import pool from '../config/db.js'

// Récupérer tous les produits (avec le nom de la catégorie)
export async function getAllProducts() {
  const [rows] = await pool.query(`
    SELECT p.*, c.nom AS categorie_nom
    FROM produits p
    LEFT JOIN categories c ON p.categorie_id = c.id
    ORDER BY p.date_creation DESC
  `)
  return rows
}

// Récupérer un produit par son id
export async function getProductById(id) {
  const [rows] = await pool.query(`
    SELECT p.*, c.nom AS categorie_nom
    FROM produits p
    LEFT JOIN categories c ON p.categorie_id = c.id
    WHERE p.id = ?
  `, [id])
  return rows[0]
}

// Récupérer les produits par catégorie
export async function getProductsByCategory(categorieNom) {
  const [rows] = await pool.query(`
    SELECT p.*, c.nom AS categorie_nom
    FROM produits p
    LEFT JOIN categories c ON p.categorie_id = c.id
    WHERE c.nom = ?
    ORDER BY p.date_creation DESC
  `, [categorieNom])
  return rows
}