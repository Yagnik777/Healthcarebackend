// import type { Response } from "express";
// import type { AuthRequest } from "../middleware/auth.js";
// import Appointment from "../models/appointment.model.js";
// import {Doctor} from "../models/doctor.model.js";
// import { generateSlots } from "../utils/generateSlots.js";

// // Book appointment
// export const bookAppointment = async (req: AuthRequest, res: Response) => {
//   const { doctorId, date, slot, patientName, patientEmail } = req.body;

//   const exists = await Appointment.findOne({ doctor: doctorId, date, slot });
//   if (exists) return res.status(400).json({ message: "Slot already booked" });

//   const appt = await Appointment.create({ doctor: doctorId, date, slot, patientName, patientEmail });
//   res.status(201).json(appt);
// };

// // Get free slots
// export const getFreeSlots = async (req: AuthRequest, res: Response) => {
//   const { doctorId } = req.params;
//   const { date } = req.query;

//   const doctor = await Doctor.findById(doctorId);
//   if (!doctor || !doctor.availability) return res.json([]);

//   const { from, to, slotDuration } = doctor.availability;
//   const allSlots = generateSlots(from, to, slotDuration);

//   const booked = await Appointment.find({ doctor: doctorId, date });
//   const bookedSlots = booked.map(b => b.slot);

//   const freeSlots = allSlots.filter(s => !bookedSlots.includes(s));
//   res.json(freeSlots);
// };
import Appointment from "../models/appointment.model.js"; // .js કાઢી નાખ્યું છે
import { Doctor } from "../models/doctor.model.js";
import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware.js"; // તમે આગળ બનાવેલું AuthRequest ઈન્ટરફેસ

// 1. Patient request mokle
export const bookAppointment = async (req: AuthRequest, res: Response) => {
  try {
    const { doctorId, date, slot, patientName } = req.body;

    // Production Safety: ચેક કરો કે યુઝર ડેટા છે કે નહીં
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const newAppt = await Appointment.create({
      doctor: doctorId,
      patient: req.user.id,
      patientName,
      date,
      slot,
      status: "pending"
    });

    res.status(201).json(newAppt);
  } catch (err: any) {
    console.error("❌ Booking Error:", err.message);
    res.status(500).json({ message: "Error booking appointment", error: err.message });
  }
};

// 2. Doctor badhi requests joi shake
export const getDoctorAppointments = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    
    // 1. પેલા યુઝરની ડોક્ટર પ્રોફાઇલ શોધો
    const doctor = await Doctor.findOne({ userId });
    
    if (!doctor) {
      return res.status(404).json({ message: "Doctor profile not found" });
    }

    // 2. ડોક્ટરની પ્રોફાઇલ ID થી સર્ચ કરો
    const appointments = await Appointment.find({ doctor: doctor._id })
      .populate("patient", "name email") // પેશન્ટની ડિટેલ્સ જોવા માટે
      .sort({ createdAt: -1 });
      
    res.json(appointments);
  } catch (err: any) {
    console.error("❌ Fetch Doctor Appt Error:", err.message);
    res.status(500).json({ message: "Error fetching doctor appointments" });
  }
};

// 3. Doctor Status change kare (Accept/Reject)
export const updateAppointmentStatus = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // status: "accepted" or "rejected"
    
    // Safety check
    if (!["accepted", "rejected", "pending"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const updated = await Appointment.findByIdAndUpdate(
      id, 
      { status }, 
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.json(updated);
  } catch (err: any) {
    res.status(500).json({ message: "Error updating status" });
  }
};

// 4. Patient potana booking nu status joi shake
export const getPatientAppointments = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const appointments = await Appointment.find({ patient: userId })
      .populate("doctor", "name specialization") 
      .sort({ createdAt: -1 });

    res.json(appointments);
  } catch (error: any) {
    console.error("❌ Fetch Patient Appt Error:", error.message);
    res.status(500).json({ message: "Error fetching appointments" });
  }
};