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
import Appointment from "../models/appointment.model.js";
import { Doctor } from "../models/doctor.model.js";

// 1. Patient request mokle
export const bookAppointment = async (req: any, res: any) => {
  try {
    const { doctorId, date, slot, patientName } = req.body;
    const newAppt = await Appointment.create({
      doctor: doctorId,
      patient: req.user.id, // Auth middleware mathi aavse
      patientName,
      date,
      slot,
      status: "pending"
    });
    res.status(201).json(newAppt);
  } catch (err) {
    res.status(500).json({ message: "Error booking appointment" });
  }
};

// 2. Doctor badhi requests joi shake
// controllers/appointment.controller.ts

export const getDoctorAppointments = async (req: any, res: any) => {
  try {
    const userId = req.user.id;
    // 1. પેલા યુઝરની ડોક્ટર પ્રોફાઇલ શોધો
    const doctor = await Doctor.findOne({ userId });
    
    if (!doctor) {
      return res.status(404).json({ message: "Doctor profile not found" });
    }

    // 2. ડોક્ટરની પ્રોફાઇલ ID થી સર્ચ કરો
    const appointments = await Appointment.find({ doctor: doctor._id })
      .sort({ createdAt: -1 });
      
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: "Error" });
  }
};
// 3. Doctor Status change kare (Accept/Reject)
export const updateAppointmentStatus = async (req: any, res: any) => {
  const { id } = req.params;
  const { status } = req.body; // status: "accepted" or "rejected"
  
  const updated = await Appointment.findByIdAndUpdate(id, { status }, { new: true });
  res.json(updated);
};

// 4. Patient potana booking nu status joi shake
export const getPatientAppointments = async (req: any, res: any) => {
  try {
    const userId = req.user.id;
    
    // ખાતરી કરો કે populate માં જે નામ આપો છો તે મોડેલ સાથે મેચ થાય છે
    const appointments = await Appointment.find({ patient: userId })
      .populate("doctor", "name specialization") 
      .sort({ createdAt: -1 });

    res.json(appointments);
  } catch (error) {
    console.error("Fetch Error:", error);
    res.status(500).json({ message: "Error fetching appointments" });
  }
};