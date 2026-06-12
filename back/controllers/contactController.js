import { createContactMessage } from '../models/contactModel.js'

export async function sendMessage(req, res) {
  try {
    const { nom, email, message } = req.body

    if (!nom || !email || !message) {
      return res.status(400).json({ error: 'Tous les champs sont requis' })
    }

    // Validation basique de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Email invalide' })
    }

    const id = await createContactMessage(nom, email, message)
    res.status(201).json({ message: 'Message envoyé avec succès', id })

  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erreur serveur lors de l\'envoi du message' })
  }
}