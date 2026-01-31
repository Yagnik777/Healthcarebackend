// import express from "express";
// import { 
//   getAvailability, 
//   saveAvailability, 
//   getDoctorSlots, 
//   getAvailableDoctors, 
//   getDoctorProfile 
//     , createOrUpdateDoctorProfile
// } from "../controllers/doctor.controller.js";
// import { auth } from "../middleware/auth.js";

// const router = express.Router();

// // Ahiya dhyan rakho: Route '/availability' j hovo joye
// router.get("/profile", auth, getDoctorProfile);
// router.get("/available", getAvailableDoctors);
// router.get("/slots/:id", getDoctorSlots);
// router.post("/profile", auth, createOrUpdateDoctorProfile);

// // Aa be routes tamara dashboard mate mahatvana che
// router.get("/availability", auth, getAvailability); // Dashboard fetch mate
// router.post("/availability", auth, saveAvailability); // Dashboard save mate

// export default router;
import express from "express";
import { 
  getAvailability, 
  saveAvailability, 
  getDoctorSlots, 
  getAvailableDoctors, 
  getDoctorProfile, 
  createOrUpdateDoctorProfile
} from "../controllers/doctor.controller.js"; // .js એક્સટેન્શન હટાવ્યું છે
import { auth } from "../middleware/auth.js"; // .js એક્સટેન્શન હટાવ્યું છે

const router = express.Router();

// --- Profile Routes ---
/** @route GET /api/doctor/profile */
router.get("/profile", auth, getDoctorProfile);

/** @route POST /api/doctor/profile */
router.post("/profile", auth, createOrUpdateDoctorProfile);

// --- Public Routes (પેશન્ટ માટે) ---
/** @route GET /api/doctor/available */
router.get("/available", getAvailableDoctors);

/** @route GET /api/doctor/slots/:id */
router.get("/slots/:id", getDoctorSlots);

// --- Dashboard / Availability Routes ---
/** @route GET /api/doctor/availability */
router.get("/availability", auth, getAvailability); 

/** @route POST /api/doctor/availability */
router.post("/availability", auth, saveAvailability); 

export default router;