import express from "express";
import authMiddileware from "../middleware/authMiddileware.js";
import {addDepartment, getDepartments, editDepartment, updateDepartment,deleteDepartment} from '../controllers/departmentController.js'

const router = express.Router();


router.get("/", authMiddileware, getDepartments )
router.post("/add", authMiddileware, addDepartment )
router.get("/:id", authMiddileware, editDepartment)
router.put("/:id", authMiddileware, updateDepartment)
router.delete("/:id", authMiddileware, deleteDepartment)






export default router;
