import express from "express";
import authMiddileware from "../middleware/authMiddileware.js";
import { addEmployee, upload } from "../controllers/employeeController.js";
const router = express.Router();


router.post("/add", authMiddileware, upload.single("image"), addEmployee);

export default router;
