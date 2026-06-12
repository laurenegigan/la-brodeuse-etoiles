import express from 'express'
import { register, login } from '../controllers/authController.js'
import { verifyToken } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.post('/register', register)
router.post('/login', login)

// Route de test protégée
router.get('/me', verifyToken, (req, res) => {
  res.json({ message: 'Tu es bien authentifié !', user: req.user })
})

export default router