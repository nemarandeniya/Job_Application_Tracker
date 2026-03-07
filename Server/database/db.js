import dotenv from "dotenv"
import mongoose from 'mongoose'

dotenv.config()

const connectDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Connected to database");

    } catch (error) {
        console.log("Can't Connected to database", error.message);
    }
}

export default connectDatabase;