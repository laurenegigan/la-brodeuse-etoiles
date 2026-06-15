import express from 'express'
import { register, login } from '../controllers/authController.js'
import { verifyToken } from '../middlewares/authMiddleware.js'
import passport from '../config/passport.js'
import jwt from 'jsonwebtoken'

const router = express.Router()

router.post('/register', register)
router.post('/login', login)

// Route de test protégée
router.get('/me', verifyToken, (req, res) => {
  res.json({ message: 'Tu es bien authentifié !', user: req.user })
})

// Démarre le flow Google OAuth
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'], session: false })
)

// Callback Google
router.get('/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/connexion' }),
  (req, res) => {
    const user = req.user

    const token = jwt.sign(
      { id: user.id, prenom: user.prenom, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    // Redirige vers le front avec le token en query param
    res.redirect(`${process.env.FRONT_URL}/connexion?token=${token}`)
  }
)
export default router