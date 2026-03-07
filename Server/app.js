import express from 'express'
import cors from 'cors'
import connectDatabase from './database/db.js'
import authRoutes from './routes/auth.js'

const app = express()

app.use(cors())
app.use(express.json())

app.use("/auth", authRoutes)

app.listen(5000, () => {
    console.log("Server is listening!");
    connectDatabase()
})
