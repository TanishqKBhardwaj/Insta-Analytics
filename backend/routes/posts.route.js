import express from "express"
import {authenticate} from "../middleware/auth.middleware.js"
import { getPostsByInfluencer } from "../controllers/posts.controller.js";

const router=express.Router()


router.get("/",authenticate,getPostsByInfluencer);


export default router