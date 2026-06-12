import pool from '../config/db.js'

// Créer un utilisateur
export async function createUser(prenom, email, motDePasseHash) {
  const [result] = await pool.query(
    'INSERT INTO utilisateurs (prenom, email, mot_de_passe, role) VALUES (?, ?, ?, ?)',
    [prenom, email, motDePasseHash, 'user']
  )
  return result.insertId
}

// Trouver un utilisateur par email
export async function findUserByEmail(email) {
  const [rows] = await pool.query(
    'SELECT * FROM utilisateurs WHERE email = ?',
    [email]
  )
  return rows[0]
}

// Trouver un utilisateur par id
export async function findUserById(id) {
  const [rows] = await pool.query(
    'SELECT id, prenom, email, role, date_inscription FROM utilisateurs WHERE id = ?',
    [id]
  )
  return rows[0]
}