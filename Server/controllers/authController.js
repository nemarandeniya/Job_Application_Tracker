import User from "../models/User.js";
import multer from "multer";
import path from 'path'
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";

const storage = multer.diskStorage({//diskStorage tells multer where and how to store uploaded files.
    destination: (req, file, cb) => {
        cb(null, "public/uploads")//this is where image stores
    },

    //rename image file(timestamp + file extension)
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

//create upload middleware
const upload = multer({ storage: storage })

const register = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const existsUser = await User.findOne({ email })
        if (existsUser) {
            return res.status(401).json({ success: false, message: "User already exists!" })
        }
        //hash password
        const hashPassword = await bcrypt.hash(password, 10)

        let profileImage = null;
        if (req.file) {
            profileImage = `/uploads/${req.file.filename}`
        }

        //save user
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashPassword,
            profilePhoto: profileImage
        })
        await newUser.save()
        res.status(201).json({ success: true, message: "User Added Successfully!" })
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

export { register, upload }