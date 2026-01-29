import express from "express";
import { getPatients, createPatient } from "../controllers/patientController.js";
import { auth}  from "../middleware/auth.js";

const router = express.Router();

router.get("/", auth, getPatients);
router.post("/", auth, createPatient);

export default router;
