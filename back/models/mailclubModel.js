import pool from '../config/db.js'

// Inscrire un utilisateur au mail club
export async function subscribeMailclub(utilisateurId, email, prenom) {
  const [result] = await pool.query(
    'INSERT INTO mailclub_inscrits (utilisateur_id, email, prenom, statut) VALUES (?, ?, ?, ?)',
    [utilisateurId, email, prenom, 'actif']
  )
  return result.insertId
}

// Trouver l'abonnement d'un utilisateur
export async function findMailclubByUserId(utilisateurId) {
  const [rows] = await pool.query(
    'SELECT * FROM mailclub_inscrits WHERE utilisateur_id = ?',
    [utilisateurId]
  )
  return rows[0]
}

// Mettre en pause
export async function pauseMailclub(utilisateurId) {
  await pool.query(
    'UPDATE mailclub_inscrits SET statut = ? WHERE utilisateur_id = ?',
    ['en_pause', utilisateurId]
  )
}

// Réactiver
export async function resumeMailclub(utilisateurId) {
  await pool.query(
    'UPDATE mailclub_inscrits SET statut = ? WHERE utilisateur_id = ?',
    ['actif', utilisateurId]
  )
}

// Résilier
export async function cancelMailclub(mailclubId) {
  await pool.query(
    'UPDATE mailclub_inscrits SET statut = ? WHERE id = ?',
    ['resilie', mailclubId]
  )
}

// Enregistrer la raison du désabonnement
export async function createDesabonnement(mailclubId, raison, commentaire) {
  await pool.query(
    'INSERT INTO desabonnements (mailclub_id, raison, commentaire) VALUES (?, ?, ?)',
    [mailclubId, raison, commentaire || null]
  )
}

// Tous les abonnés avec raison de désabonnement (admin)
export async function getAllSubscribers() {
  const [rows] = await pool.query(`
    SELECT m.*, d.raison, d.commentaire AS commentaire_desabo
    FROM mailclub_inscrits m
    LEFT JOIN desabonnements d ON d.mailclub_id = m.id
    ORDER BY m.date_inscription DESC
  `)
  return rows
}

// Statistiques des raisons de désabonnement
export async function getDesabonnementStats() {
  const [rows] = await pool.query(`
    SELECT raison, COUNT(*) AS count
    FROM desabonnements
    GROUP BY raison
  `)
  return rows
}