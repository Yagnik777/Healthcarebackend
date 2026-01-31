// import express from "express";
// import { getPatients, createPatient } from "../controllers/patientController.js";
// import { auth}  from "../middleware/auth.js";

// const router = express.Router();

// router.get("/", auth, getPatients);
// router.post("/", auth, createPatient);

// export default router;
import express from "express";
import { getPatients, createPatient } from "../controllers/patientController.js"; // .js હટાવ્યું છે
import { auth } from "../middleware/auth.js"; // .js હટાવ્યું છે

const router = express.Router();

/**
 * @route   GET /api/patients
 * @desc    બધા પેશન્ટ્સની લિસ્ટ મેળવવા માટે (ફક્ત ઓથોરાઈઝ્ડ યુઝર માટે)
 */
router.get("/", auth, getPatients);

/**
 * @route   POST /api/patients
 * @desc    નવા પેશન્ટની એન્ટ્રી કરવા માટે
 */
router.post("/", auth, createPatient);

export default router;