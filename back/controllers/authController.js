import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { createUser, findUserByEmail } from '../models/userModel.js'
import { containsForbiddenWords } from '../utils/moderation.js'

export async function register(req, res) {
  try {
    const { prenom, email, motdepasse } = req.body

    // Validation basique
    if (!prenom || !email || !motdepasse) {
      return res.status(400).json({ error: 'Tous les champs sont requis' })
    }

    if (motdepasse.length < 6) {
      return res.status(400).json({ error: 'Le mot de passe doit contenir au moins 6 caractères' })
    }

    if (containsForbiddenWords(prenom)) {
      return res.status(400).json({ error: 'Le prénom choisi n\'est pas autorisé' })
    }

    // Vérifier si l'email existe déjà
    const existingUser = await findUserByEmail(email)
    if (existingUser) {
      return res.status(409).json({ error: 'Un compte existe déjà avec cet email' })
    }

    // Hacher le mot de passe
    const hash = await bcrypt.hash(motdepasse, 10)

    // Créer l'utilisateur
    const userId = await createUser(prenom, email, hash)

    // Générer le token JWT
    const token = jwt.sign(
      { id: userId, prenom, email, role: 'user' },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.status(201).json({
      token,
      user: { id: userId, prenom, email, role: 'user' }
    })

  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erreur serveur lors de l\'inscription' })
  }
}

export async function login(req, res) {
  try {
    const { email, motdepasse } = req.body

    if (!email || !motdepasse) {
      return res.status(400).json({ error: 'Email et mot de passe requis' })
    }

    // Trouver l'utilisateur
    const user = await findUserByEmail(email)
    if (!user) {
      return res.status(401).json({ error: 'Email ou mot de passe incorrect' })
    }

    // Vérifier le mot de passe
    const isValid = await bcrypt.compare(motdepasse, user.mot_de_passe)
    if (!isValid) {
      return res.status(401).json({ error: 'Email ou mot de passe incorrect' })
    }

    // Générer le token JWT
    const token = jwt.sign(
      { id: user.id, prenom: user.prenom, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.json({
      token,
      user: { id: user.id, prenom: user.prenom, email: user.email, role: user.role }
    })

  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erreur serveur lors de la connexion' })
  }
}