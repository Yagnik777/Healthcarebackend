// import { Router } from "express";
// //import  getFreeSlots  from "../controllers/slot.controller.js";
// import { bookAppointment } from "../controllers/appointment.controller.js";
// import { getSlots } from "../controllers/slot.controller.js";
// const router = Router();

// //router.get("/slots/:doctorId", getFreeSlots);
// router.post("/appointment", bookAppointment);
// router.get("/slots", getSlots);
// export default router;
import { Router } from "express";
import { bookAppointment } from "../controllers/appointment.controller.js"; // .js હટાવ્યું છે
import { getSlots } from "../controllers/slot.controller.js"; // .js હટાવ્યું છે

const router = Router();

/**
 * @route   GET /api/slots
 * @desc    ડોક્ટરના ખાલી સ્લોટ્સ જોવા માટે (Query params: doctorId, date)
 */
router.get("/slots", getSlots);

/**
 * @route   POST /api/appointment
 * @desc    નવી એપોઈન્ટમેન્ટ બુક કરવા માટે
 */
router.post("/appointment", bookAppointment);

// નોંધ: જો જરૂર હોય તો તમે ભવિષ્યમાં getFreeSlots વાળો રાઉટ અહી અન-કમેન્ટ કરી શકો છો.

export default router;