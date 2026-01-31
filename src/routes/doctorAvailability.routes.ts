// import express from "express";
// import { getAvailability, setAvailability } from "../controllers/doctorAvailability.controller.js";
// import  {auth}  from "../middleware/auth.js"; // named export

// const router = express.Router();

// // Get doctor's availability
// router.get("/", auth, getAvailability);

// // Set/update doctor's availability
// router.post("/", auth, setAvailability);

// export default router;
import express from "express";
import { getAvailability, setAvailability } from "../controllers/doctorAvailability.controller.js"; // .js હટાવ્યું છે
import { auth } from "../middleware/auth.js"; // TS સુસંગતતા માટે .js હટાવ્યું છે

const router = express.Router();

/**
 * @route   GET /api/doctor-availability
 * @desc    લોગિન થયેલ ડોક્ટરની ઉપલબ્ધતા મેળવવા
 * @access  Private (Doctor only)
 */
router.get("/", auth, getAvailability);

/**
 * @route   POST /api/doctor-availability
 * @desc    ડોક્ટરની ઉપલબ્ધતા સેટ અથવા અપડેટ કરવા
 * @access  Private (Doctor only)
 */
router.post("/", auth, setAvailability);

export default router;