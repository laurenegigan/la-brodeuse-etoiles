import express from 'express'
import { verifyToken, verifyAdmin } from '../middlewares/authMiddleware.js'
import {
  listAllOrders,
  listAllSubscribers,
  subscribersStats,
  listAllMessages,
  addProduct,
  editProduct,
  removeProduct
} from '../controllers/adminController.js'

const router = express.Router()

// Toutes les routes admin nécessitent JWT + rôle admin
router.use(verifyToken, verifyAdmin)

router.get('/commandes', listAllOrders)
router.get('/mailclub', listAllSubscribers)
router.get('/mailclub/stats', subscribersStats)
router.get('/messages', listAllMessages)

router.post('/produits', addProduct)
router.put('/produits/:id', editProduct)
router.delete('/produits/:id', removeProduct)

export default router