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



app.get("/proxy-image", async (req, res) => {
  const { url } = req.query; // Instagram CDN URL
  try {
    const response = await axios.get(url, { responseType: "arraybuffer" }); 
    // responseType: "arraybuffer" is needed for binary image data

    // Set proper Content-Type header (jpeg/png/etc.)
    res.set("Content-Type", response.headers["content-type"]);

    // Send the raw image back to the browser
    res.send(response.data);
  } catch (error) {
    console.error("Error fetching image:", error.message);
    res.status(500).send("Could not fetch image");
  }
});




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
