// // src/routes/appointment.routes.ts
// import express from "express";
// import { bookAppointment, getFreeSlots } from "../controllers/appointment.controller.js";

// const router = express.Router();

// router.post("/book", bookAppointment);           // POST /api/appointment/book
// router.get("/slots/:doctorId", getFreeSlots);    // GET /api/appointment/slots/:doctorId?date=YYYY-MM-DD

// export default router;
// import express from "express";
// import { auth } from "../middleware/auth.js";
// import { 
//   bookAppointment, 
//   getDoctorAppointments, 
//   updateAppointmentStatus,
//   getPatientAppointments 
// } from "../controllers/appointment.controller.js";

// const router = express.Router();

// router.post("/book", auth, bookAppointment);
// router.get("/doctor-list", auth, getDoctorAppointments);
// router.get("/patient-list", auth, getPatientAppointments);
// router.patch("/update-status/:id", auth, updateAppointmentStatus);
// router.put("/status/:id", auth, updateAppointmentStatus);
// export default router;
import express from "express";
import { auth } from "../middleware/auth.js"; // .js કાઢી નાખ્યું છે (TS સુસંગતતા માટે)
import { 
  bookAppointment, 
  getDoctorAppointments, 
  updateAppointmentStatus,
  getPatientAppointments 
} from "../controllers/appointment.controller.js";

const router = express.Router();

/**
 * @route   POST /api/appointments/book
 * @desc    Patient appointments book કરવા માટે
 */
router.post("/book", auth, bookAppointment);

/**
 * @route   GET /api/appointments/doctor-list
 * @desc    Doctor પોતાની બધી requests જોઈ શકે
 */
router.get("/doctor-list", auth, getDoctorAppointments);

/**
 * @route   GET /api/appointments/patient-list
 * @desc    Patient પોતાના બધા bookings જોઈ શકે
 */
router.get("/patient-list", auth, getPatientAppointments);

/**
 * @route   PATCH/PUT /api/appointments/update-status/:id
 * @desc    Doctor appointment accept કે reject કરે
 */
router.patch("/update-status/:id", auth, updateAppointmentStatus);
router.put("/status/:id", auth, updateAppointmentStatus);

export default router;