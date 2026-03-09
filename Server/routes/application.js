import express from 'express'
import { getApplication, addAplication, updateApplication, deleteApplication, upload, countApplication, countApplicationBasedOnStatus } from '../controllers/applicationController.js'

const router = express.Router()

router.get('/:userID', getApplication)
router.put('/:userID', updateApplication)
router.delete('/:userID', deleteApplication)
router.post('/', upload.single("usedResume"), addAplication)
router.get('/count/:userID', countApplication)
router.get('/statuscount/:userID', countApplicationBasedOnStatus)

export default router