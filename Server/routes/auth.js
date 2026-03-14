import express from "express"
import { register, upload, login, updateUser } from '../controllers/authController.js'


const router = express.Router()

router.put('/:id', upload.single("profilePhoto"), updateUser)
router.post('/register', upload.single('profilePhoto'), register)//upload.single-->upload 1 file
router.post('/login', login)


export default router