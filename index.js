import express from "express";
import 'dotenv/config';
import mongoose from "mongoose";
import connectDB from "./config/db.js";
import { toJSON } from "@reis/mongoose-to-json";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js"
import cartRoutes from './routes/cart.js';
const app = express();
connectDB()
//Middleware
app.use(express.json());
app.use(cors());
app.use('/api/auth', authRoutes);
app.use('/api/product', productRoutes);
app.use('/api/cart', cartRoutes);
mongoose.plugin(toJSON);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

