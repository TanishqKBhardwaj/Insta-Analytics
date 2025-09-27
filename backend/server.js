import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import influencerRoutes from './routes/influencer.routes.js'
import userRoutes from './routes/auth.route.js'
import postsRoutes from './routes/posts.route.js'
import cookieParser from "cookie-parser";
import axios from "axios"
import NodeCache from "node-cache";


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


const imageCache = new NodeCache({ stdTTL: 3600 });
app.get("/proxy-image", async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).send("Missing image URL");

  try {
    // Check if cached
    const cachedImage = imageCache.get(url);
    if (cachedImage) {
      console.log("✅ Serving from cache:", url);
      res.set("Content-Type", cachedImage.contentType);
      return res.send(cachedImage.data);
    }

    // Fetch from Instagram if not cached
    const response = await axios.get(url, { responseType: "arraybuffer" });

    // Store in cache
    imageCache.set(url, {
      data: response.data,
      contentType: response.headers["content-type"],
    });

    // Send response
    res.set("Content-Type", response.headers["content-type"]);
    res.send(response.data);
  } catch (error) {
    console.error("❌ Error fetching image:", error.message);
    res.status(500).send("Could not fetch image");
  }
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
