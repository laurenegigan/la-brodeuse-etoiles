import pool from '../config/db.js'

export async function createContactMessage(nom, email, message) {
  const [result] = await pool.query(
    'INSERT INTO messages_contact (nom, email, message) VALUES (?, ?, ?)',
    [nom, email, message]
  )
  return result.insertId
}

export async function getAllContactMessages() {
  const [rows] = await pool.query(
    'SELECT * FROM messages_contact ORDER BY date_envoi DESC'
  )
  return rows
}