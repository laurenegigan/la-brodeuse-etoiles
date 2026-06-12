import express from 'express'
import { subscribe, getStatus, pause, resume, cancel } from '../controllers/mailclubController.js'
import { verifyToken } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.post('/', verifyToken, subscribe)
router.get('/', verifyToken, getStatus)
router.patch('/pause', verifyToken, pause)
router.patch('/resume', verifyToken, resume)
router.delete('/', verifyToken, cancel)

export default router