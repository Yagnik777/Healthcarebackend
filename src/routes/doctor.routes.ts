import express from "express";
import { 
  getAvailability, 
  saveAvailability, 
  getDoctorSlots, 
  getAvailableDoctors, 
  getDoctorProfile 
    , createOrUpdateDoctorProfile
} from "../controllers/doctor.controller.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

// Ahiya dhyan rakho: Route '/availability' j hovo joye
router.get("/profile", auth, getDoctorProfile);
router.get("/available", getAvailableDoctors);
router.get("/slots/:id", getDoctorSlots);
router.post("/profile", auth, createOrUpdateDoctorProfile);

// Aa be routes tamara dashboard mate mahatvana che
router.get("/availability", auth, getAvailability); // Dashboard fetch mate
router.post("/availability", auth, saveAvailability); // Dashboard save mate

export default router;