import { Router } from "express";
//import  getFreeSlots  from "../controllers/slot.controller.js";
import { bookAppointment } from "../controllers/appointment.controller.js";
import { getSlots } from "../controllers/slot.controller.js";
const router = Router();

//router.get("/slots/:doctorId", getFreeSlots);
router.post("/appointment", bookAppointment);
router.get("/slots", getSlots);
export default router;
