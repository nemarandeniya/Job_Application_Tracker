import express from 'express'
import { getApplication, addAplication } from '../controllers/applicationController.js'

const router = express.Router()

router.get('/', getApplication)
router.post('/', addAplication)

export default router