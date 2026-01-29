import express from "express";
import { getAvailability, setAvailability } from "../controllers/doctorAvailability.controller.js";
import  {auth}  from "../middleware/auth.js"; // named export

const router = express.Router();

// Get doctor's availability
router.get("/", auth, getAvailability);

// Set/update doctor's availability
router.post("/", auth, setAvailability);

export default router;
