import mongoose from "mongoose";
import { URI_MONGO } from "../";

export const connectDB = async () => {
    try {
        await mongoose.connect(URI_MONGO as string);
        console.log('Database connect');
    } catch (error) {
        console.error('Error at connect DB, error:', error)
    }

}