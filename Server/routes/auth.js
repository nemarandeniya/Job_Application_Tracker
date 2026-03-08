import express from "express"
import { register, upload, login } from '../controllers/authController.js'


const router = express.Router()

router.post('/register', upload.single('profilePhoto'), register)//upload.single-->upload 1 file
router.post('/login', login)


export default router