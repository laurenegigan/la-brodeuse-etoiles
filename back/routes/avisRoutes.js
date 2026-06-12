import express from 'express'
import { getAvisByProduct, createAvis, deleteAvis, respondToAvis } from '../controllers/avisController.js'
import { verifyToken, verifyAdmin } from '../middlewares/authMiddleware.js'

const router = express.Router()

// Routes liées aux produits
router.get('/produits/:id/avis', getAvisByProduct)
router.post('/produits/:id/avis', verifyToken, createAvis)

// Routes liées aux avis directement
router.delete('/avis/:id', verifyToken, deleteAvis)
router.patch('/avis/:id/reponse', verifyToken, verifyAdmin, respondToAvis)

export default router