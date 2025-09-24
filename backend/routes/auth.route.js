import express from "express";
import {
  registerUser,signIn,signOut
} from "../controllers/auth.controller.js";

const router = express.Router();


router.post("/register",registerUser)
router.post("/signIn",signIn)
router.post("/signOut",signOut)


export default router