import express from "express";
import 'dotenv/config';
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
const app = express();
connectDB()
//Middleware
app.use(express.json());
app.use('/api/auth', authRoutes);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));