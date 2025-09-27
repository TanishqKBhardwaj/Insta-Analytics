import express from "express"
import {authenticate} from "../middleware/auth.middleware.js"
import { getPostsByInfluencer,getPostByPostId } from "../controllers/posts.controller.js";

const router=express.Router()


router.get("/",authenticate,getPostsByInfluencer);
router.get("/:id",authenticate,getPostByPostId)


export default router