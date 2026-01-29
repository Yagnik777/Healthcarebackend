// // src/routes/appointment.routes.ts
// import express from "express";
// import { bookAppointment, getFreeSlots } from "../controllers/appointment.controller.js";

// const router = express.Router();

// router.post("/book", bookAppointment);           // POST /api/appointment/book
// router.get("/slots/:doctorId", getFreeSlots);    // GET /api/appointment/slots/:doctorId?date=YYYY-MM-DD

// export default router;
import express from "express";
import { auth } from "../middleware/auth.js";
import { 
  bookAppointment, 
  getDoctorAppointments, 
  updateAppointmentStatus,
  getPatientAppointments 
} from "../controllers/appointment.controller.js";

const router = express.Router();

router.post("/book", auth, bookAppointment);
router.get("/doctor-list", auth, getDoctorAppointments);
router.get("/patient-list", auth, getPatientAppointments);
router.patch("/update-status/:id", auth, updateAppointmentStatus);
router.put("/status/:id", auth, updateAppointmentStatus);
export default router;