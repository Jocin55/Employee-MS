import express from "express";
import { login,verify } from "../controllers/authController.js";
import authMiddileware from "../middleware/authMiddileware.js";


const router = express.Router();

router.post("/login", login)
router.get("/verify", authMiddileware, verify)


export default router;
