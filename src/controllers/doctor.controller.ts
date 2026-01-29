  // // import type { Response } from "express";
  // // import { Doctor } from "../models/doctor.model.js";
  // // import Availability from "../models/availability.model.js"; // New Model for Date-wise slots
  // // import type { AuthRequest } from "../middleware/auth.js";

  // // // 1. Get doctor profile
  // // export const getDoctorProfile = async (req: AuthRequest, res: Response) => {
  // //   try {
  // //     const doctor = await Doctor.findOne({ userId: req.user!.id });
  // //     if (!doctor) return res.json({ profileCompleted: false });
  // //     res.json({ ...doctor.toObject(), profileCompleted: true });
  // //   } catch (err) {
  // //     res.status(500).json({ message: "Error fetching profile" });
  // //   }
  // // };

  // // // 2. Create or update profile
  // // export const createOrUpdateDoctorProfile = async (req: AuthRequest, res: Response) => {
  // //   try {
  // //     const data = {
  // //       userId: req.user!.id,
  // //       name: req.body.name,
  // //       specialization: req.body.specialization,
  // //       experience: req.body.experience,
  // //       phone: req.body.phone,
  // //       clinicAddress: req.body.clinicAddress,
  // //       profileCompleted: true, 
  // //     };

  // //     const doctor = await Doctor.findOneAndUpdate(
  // //       { userId: req.user!.id }, 
  // //       data, 
  // //       { new: true, upsert: true }
  // //     );
  // //     res.json(doctor);
  // //   } catch (err) {
  // //     res.status(500).json({ message: "Error saving profile" });
  // //   }
  // // };

  // // // 3. Get availability (FIXED: Fetch based on date)
  // // export const getAvailability = async (req: AuthRequest, res: Response) => {
  // //   try {
  // //     const { date } = req.query; // Query string mathi date avse
  // //     const userId = req.user!.id;

  // //     if (!date) return res.status(400).json({ message: "Date is required" });

  // //     const avail = await Availability.findOne({ doctor: userId, date });
  // //     res.json(avail || null);
  // //   } catch (err) {
  // //     res.status(500).json({ message: "Error fetching availability" });
  // //   }
  // // };

  // // // 4. Save availability (FIXED: Save for specific date)
  // // export const saveAvailability = async (req: AuthRequest, res: Response) => {
  // //   try {
  // //     const { from, to, slotDuration, date } = req.body;
  // //     const userId = req.user!.id;

  // //     if (!date || !from || !to) {
  // //       return res.status(400).json({ message: "Missing required fields" });
  // //     }

  // //     const avail = await Availability.findOneAndUpdate(
  // //       { doctor: userId, date },
  // //       { from, to, slotDuration: slotDuration || 30 },
  // //       { new: true, upsert: true }
  // //     );
  // //     res.json(avail);
  // //   } catch (err) {
  // //     res.status(500).json({ message: "Error saving availability" });
  // //   }
  // // };

  // // // 5. Get ALL doctors
  // // export const getAvailableDoctors = async (_req: any, res: Response) => {
  // //   try {
  // //     const doctors = await Doctor.find({}); 
  // //     res.status(200).json(doctors);
  // //   } catch (err) {
  // //     res.status(500).json({ message: "Error fetching doctors list" });
  // //   }
  // // };

  // // // 6. Generate Slots logic (FIXED: Specific to the selected date)
  // // export const getDoctorSlots = async (req: any, res: Response) => {
  // //   try {
  // //     const { id } = req.params; // Doctor ID
  // //     const { date } = req.query; // Selected Date from Patient

  // //     if (!date) return res.status(400).json({ message: "Please select a date" });

  // //     // Doctor na profile mathi nahi, pan Availability collection mathi date wise slots lavvana
  // //     const avail = await Availability.findOne({ doctor: id, date });

  // //     if (!avail || !avail.from || !avail.to) {
  // //       return res.json([]); // Jo e date mate schedule nathi to empty array
  // //     }

  // //     const { from, to, slotDuration } = avail;
  // //     const slots = [];
      
  // //     // Time generation logic
  // //     let start = new Date(`2000-01-01T${from}:00`);
  // //     const end = new Date(`2000-01-01T${to}:00`);
  // //     const duration = slotDuration || 30;

  // //     while (start < end) {
  // //       const timeString = start.toTimeString().substring(0, 5);
  // //       slots.push(timeString);
  // //       start.setMinutes(start.getMinutes() + duration);
  // //     }

  // //     res.json(slots);
  // //   } catch (err) {
  // //     console.error("Slot Error:", err);
  // //     res.status(500).json({ message: "Server error generating slots" });
  // //   }
  // // };
  // import type { Response } from "express";
  // import { Doctor } from "../models/doctor.model.js";
  // import Availability from "../models/availability.model.js";

  // // Profile Logic
  // export const getDoctorProfile = async (req: any, res: Response) => {
  //   try {
  //     const doctor = await Doctor.findOne({ userId: req.user.id });
  //     res.json(doctor || { profileCompleted: false });
  //   } catch (err) { res.status(500).json({ message: "Error" }); }
  // };

  // // Slots Generation Logic - FIXED
  // export const getDoctorSlots = async (req: any, res: Response) => {
  //   try {
  //     const { id } = req.params;
  //     const { date } = req.query;

  //     if (!date) return res.status(400).json({ message: "Date required" });

  //     const avail = await Availability.findOne({ doctor: id, date });
  //     if (!avail) return res.json([]); // No availability = No slots

  //     const { from, to, slotDuration } = avail;
  //     const slots = [];
  //     let start = new Date(`2000-01-01T${from}:00`);
  //     const end = new Date(`2000-01-01T${to}:00`);

  //     while (start < end) {
  //       slots.push(start.toTimeString().substring(0, 5));
  //       start.setMinutes(start.getMinutes() + (slotDuration || 30));
  //     }
  //     res.json(slots);
  //   } catch (err) { res.status(500).json({ message: "Error" }); }
  // };

  // // Save Availability Logic
  // // export const saveAvailability = async (req: any, res: Response) => {
  // //   try {
  // //     const { from, to, slotDuration, date } = req.body;
  // //     const doctor = await Availability.findOneAndUpdate(
  // //       { doctor: req.user.id, date },
  // //       { from, to, slotDuration },
  // //       { upsert: true, new: true }
  // //     );
  // //     res.json(doctor);
  // //   } catch (err) { res.status(500).json({ message: "Error" }); }
  // // };

  // // export const getAvailableDoctors = async (_req: any, res: Response) => {
  // //   const doctors = await Doctor.find({});
  // //   res.json(doctors);
  // // };
  // // 🔹 GET Availability
  // export const getAvailability = async (req: any, res: any) => {
  //   try {
  //     const { date } = req.query;
  //     const userId = req.user.id || req.user._id; // Dono check karo

  //     const avail = await Availability.findOne({ doctor: userId, date });
      
  //     // Jo data na male to 404 nahi, pan null moklavo (jethi frontend crash na thai)
  //     if (!avail) return res.status(200).json(null); 
      
  //     res.json(avail);
  //   } catch (err) {
  //     console.error("GET Avail Error:", err);
  //     res.status(500).json({ message: "Server error fetching availability" });
  //   }
  // };

  // // 🔹 POST (Save) Availability
  // export const saveAvailability = async (req: any, res: any) => {
  //   try {
  //     const { date, from, to, slotDuration } = req.body;
  //     const userId = req.user.id || req.user._id;

  //     if (!date || !from || !to) {
  //       return res.status(400).json({ message: "Missing fields" });
  //     }

  //     // findOneAndUpdate use karvathi 500 error aavi shake jo unique index clash thai
  //     const updated = await Availability.findOneAndUpdate(
  //       { doctor: userId, date: date },
  //       { from, to, slotDuration: slotDuration || 30 },
  //       { upsert: true, new: true }
  //     );

  //     res.json(updated);
  //   } catch (err) {
  //     console.error("SAVE Avail Error:", err);
  //     res.status(500).json({ message: "Server error saving availability" });
  //   }
  // };
import type { Response } from "express";
import { Doctor } from "../models/doctor.model.js";
import Availability from "../models/availability.model.js";
import { generateSlots } from "../utils/generateSlots.js";
// 1. Get Doctor Profile
export const getDoctorProfile = async (req: any, res: Response) => {
  try {
    const userId = req.user.id || req.user._id;
    const doctor = await Doctor.findOne({ userId });
    
    if (!doctor) {
      return res.json({ profileCompleted: false });
    }
    
    res.json({ ...doctor.toObject(), profileCompleted: true });
  } catch (err) {
    console.error("Profile Fetch Error:", err);
    res.status(500).json({ message: "Error fetching profile" });
  }
};

// 2. Create or Update Doctor Profile
export const createOrUpdateDoctorProfile = async (req: any, res: Response) => {
  try {
    const userId = req.user.id || req.user._id;
    const data = {
      userId,
      name: req.body.name,
      specialization: req.body.specialization,
      experience: req.body.experience,
      phone: req.body.phone,
      clinicAddress: req.body.clinicAddress,
      profileCompleted: true,
    };

    const doctor = await Doctor.findOneAndUpdate(
      { userId },
      data,
      { new: true, upsert: true }
    );
    res.json(doctor);
  } catch (err) {
    console.error("Profile Save Error:", err);
    res.status(500).json({ message: "Error saving profile" });
  }
};

// 3. Get ALL Doctors (Fix for the Route error)
export const getAvailableDoctors = async (_req: any, res: Response) => {
  try {
    const doctors = await Doctor.find({});
    res.status(200).json(doctors);
  } catch (err) {
    console.error("Fetch Doctors Error:", err);
    res.status(500).json({ message: "Error fetching doctors list" });
  }
};

// 4. Get Availability for a Specific Date (For Doctor Dashboard)
// export const getAvailability = async (req: any, res: Response) => {
//   try {
//     const { date } = req.query;
//     const userId = req.user.id || req.user._id;

//     if (!date) return res.status(400).json({ message: "Date is required" });

//     const avail = await Availability.findOne({ doctor: userId, date });
    
//     // Returns null if not found, preventing frontend crash
//     res.json(avail || null);
//   } catch (err) {
//     console.error("GET Avail Error:", err);
//     res.status(500).json({ message: "Error fetching availability" });
//   }
// };

// 5. Save/Update Availability (For Doctor Dashboard)
export const saveAvailability = async (req: any, res: Response) => {
  try {
    const { date, from, to, slotDuration } = req.body;
    const userId = req.user.id;

    const doctorProfile = await Doctor.findOne({ userId });
    
    if (!doctorProfile) {
      return res.status(404).json({ message: "Doctor profile not found" });
    }

    const newSlot = {
      from,
      to,
      slotDuration: Number(slotDuration) || 30
    };

    const availability = await Availability.findOneAndUpdate(
      { doctor: doctorProfile._id, date: date }, 
      { $push: { timeSlots: newSlot } }, 
      { upsert: true, new: true }
    );

    res.json({ message: "Availability saved successfully!", availability });

  } catch (error: any) { // અહિયાં ': any' ઉમેરવાથી 'unknown' વાળી એરર જતી રહેશે
    console.error("Save Error:", error);
    res.status(500).json({ 
      message: "Server error", 
      error: error.message // હવે અહિયાં error.message કામ કરશે
    });
  }
};
// Generate Slots for Patient with Multiple Ranges
// controllers/doctor.controller.ts

// controllers/doctor.controller.ts માં આ ચેક કરી લો
export const getDoctorSlots = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const { date } = req.query;

    console.log("Fetching slots for Doctor ID:", id, "on Date:", date);

    const avail = await Availability.findOne({ doctor: id, date });
    
    // જો ડેટાબેઝમાં એન્ટ્રી ના મળે
    if (!avail) {
      console.log("No availability found in DB for this doctor/date");
      return res.json([]); 
    }

    console.log("Found Availability Data:", avail);

    let allGeneratedSlots: string[] = [];
    
    // ખાતરી કરો કે timeSlots એરે છે
    if (avail.timeSlots && Array.isArray(avail.timeSlots)) {
      avail.timeSlots.forEach((session: any) => {
        const startTime = new Date(`2000-01-01T${session.from}:00`);
        const endTime = new Date(`2000-01-01T${session.to}:00`);
        const duration = session.slotDuration || 30;

        let current = new Date(startTime);
        while (current < endTime) {
          allGeneratedSlots.push(current.toTimeString().substring(0, 5));
          current.setMinutes(current.getMinutes() + duration);
        }
      });
    }

    const finalSlots = [...new Set(allGeneratedSlots)].sort();
    res.json(finalSlots);

  } catch (err: any) {
    console.error("SLOTS FETCH ERROR:", err.message); // અહિયાં એરર પ્રિન્ટ થશે
    res.status(500).json({ message: "Error", details: err.message });
  }
};
export const getAvailability = async (req: any, res: Response) => {
  try {
    const { date } = req.query;
    const userId = req.user.id;

    const doctorProfile = await Doctor.findOne({ userId });
    if (!doctorProfile) return res.status(404).json({ message: "Doctor profile not found" });

    // અહિયાં સાચી Doctor ID વાપરો
    const avail = await Availability.findOne({ doctor: doctorProfile._id, date });
    res.json(avail || null);
  } catch (err) {
    res.status(500).json({ message: "Error fetching availability" });
  }
};

// 6. Get Appointments Fix
export const getDoctorAppointments = async (req: any, res: Response) => {
  try {
    const userId = req.user.id;

    const doctor = await Doctor.findOne({ userId });
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    // 'appointment.find' ને બદલે 'Appointment.find' (Capital A)
    const appointments = await Appointment.find({ doctor: doctor._id })
      .sort({ createdAt: -1 });

    res.json(appointments);
  } catch (error) {
    console.error("Fetch Appt Error:", error);
    res.status(500).json({ message: "Error fetching appointments" });
  }
};