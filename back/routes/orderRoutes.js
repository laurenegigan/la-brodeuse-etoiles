import express from 'express'
import { placeOrder, getMyOrders } from '../controllers/orderController.js'
import { verifyToken } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.post('/', verifyToken, placeOrder)
router.get('/', verifyToken, getMyOrders)

export default router