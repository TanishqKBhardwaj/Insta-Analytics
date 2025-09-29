import express from "express"
import {authenticate} from "../middleware/auth.middleware.js"
import { getPostsByInfluencer,getPostByPostId, analyzePostImages } from "../controllers/posts.controller.js";

const router=express.Router()


router.get("/",authenticate,getPostsByInfluencer);
router.get("/:id",authenticate,getPostByPostId)
router.get("/analyze-post/:postId",authenticate,analyzePostImages)


export default router