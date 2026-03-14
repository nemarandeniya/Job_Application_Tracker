import express from 'express'
import { getApplication, addAplication, updateApplication, deleteApplication, countApplication, countApplicationBasedOnStatus, interviewNotification } from '../controllers/applicationController.js'

const router = express.Router()

router.get('/interviewnotification', interviewNotification)
router.get('/:userID', getApplication)
router.put('/:id', updateApplication)
router.delete('/:id', deleteApplication)
router.post('/', addAplication)
router.get('/count/:userID', countApplication)
router.get('/statuscount/:userID', countApplicationBasedOnStatus)

export default router