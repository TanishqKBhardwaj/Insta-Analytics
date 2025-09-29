import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import influencerRoutes from './routes/influencer.routes.js'
import userRoutes from './routes/auth.route.js'
import postsRoutes from './routes/posts.route.js'
import cookieParser from "cookie-parser";
import axios from "axios"


dotenv.config();
connectDB();

const app = express();
app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
app.use("/api/influencers",influencerRoutes)
app.use("/api/users",userRoutes);
app.use("/api/posts",postsRoutes);






const PORT = process.env.PORT || 5000;


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
