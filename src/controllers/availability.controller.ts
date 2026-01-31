// import Availability from "../models/availability.model.js";
// import { Doctor } from "../models/doctor.model.js"; // Doctor model import કરજો
// import type { Response } from "express";

// export const saveAvailability = async (req: any, res: Response) => {
//   try {
//     const { date, from, to, slotDuration } = req.body; // 'date' અહિયાં હોવી જોઈએ
//     const userId = req.user.id;

//     if (!date || !from || !to) {
//       return res.status(400).json({ message: "તારીખ અને સમય આપવો જરૂરી છે." });
//     }

//     // 1. પેલા ડોક્ટરની સાચી ID શોધો
//     const doctorProfile = await Doctor.findOne({ userId });
//     if (!doctorProfile) {
//       return res.status(404).json({ message: "ડોક્ટર પ્રોફાઇલ મળી નથી." });
//     }

//     const newTimeSlot = { 
//       from, 
//       to, 
//       slotDuration: Number(slotDuration) || 30 
//     };

//     // 2. $push વાપરો જેથી એક જ દિવસમાં ડોક્ટર સવારે અને સાંજે એમ બે વાર સ્લોટ્સ એડ કરી શકે
//     const availability = await Availability.findOneAndUpdate(
//       { doctor: doctorProfile._id, date: date }, // Doctor ID અને Date બંને મેચ થવા જોઈએ
//       { $push: { timeSlots: newTimeSlot } }, 
//       { upsert: true, new: true }
//     );

//     res.json({ message: "સ્લોટ્સ સફળતાપૂર્વક સેવ થયા!", availability });
//   } catch (error: any) {
//     console.error("Save error:", error);
//     res.status(500).json({ message: "સર્વર એરર", error: error.message });
//   }
// };

// export const getMyAvailability = async (req: any, res: Response) => {
//   try {
//     const userId = req.user.id;
//     const { date } = req.query; // Query માંથી ડેટ લો

//     const doctorProfile = await Doctor.findOne({ userId });
//     if (!doctorProfile) return res.json({});

//     const availability = await Availability.findOne({ 
//       doctor: doctorProfile._id, 
//       date: date 
//     });
    
//     res.json(availability || {});
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching availability" });
//   }
// };
import Availability from "../models/availability.model.js"; // .js કાઢી નાખ્યું છે
import { Doctor } from "../models/doctor.model.js";
import type { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware.js"; // તમારા AuthRequest નો ઉપયોગ કરો

export const saveAvailability = async (req: AuthRequest, res: Response) => {
  try {
    const { date, from, to, slotDuration } = req.body;
    const userId = req.user?.id; // Auth middleware માંથી આવે છે

    if (!userId) {
      return res.status(401).json({ message: "તમારે લોગિન કરવું જરૂરી છે." });
    }

    if (!date || !from || !to) {
      return res.status(400).json({ message: "તારીખ અને સમય આપવો જરૂરી છે." });
    }

    // 1. પેલા ડોક્ટરની સાચી ID શોધો (User ID થી Profile ID)
    const doctorProfile = await Doctor.findOne({ userId });
    if (!doctorProfile) {
      return res.status(404).json({ message: "ડોક્ટર પ્રોફાઇલ મળી નથી." });
    }

    const newTimeSlot = { 
      from, 
      to, 
      slotDuration: Number(slotDuration) || 30 
    };

    // 2. $push વાપરો જેથી એક જ દિવસમાં અલગ અલગ સમયના સ્લોટ્સ એડ થઈ શકે
    // Production Safety: upsert true હોવાથી જો તે દિવસનો રેકોર્ડ નહીં હોય તો નવો બની જશે
    const availability = await Availability.findOneAndUpdate(
      { doctor: doctorProfile._id, date: date }, 
      { $push: { timeSlots: newTimeSlot } }, 
      { upsert: true, new: true }
    );

    res.json({ message: "સ્લોટ્સ સફળતાપૂર્વક સેવ થયા!", availability });
  } catch (error: any) {
    console.error("❌ Save Availability Error:", error.message);
    res.status(500).json({ message: "સર્વર એરર", error: error.message });
  }
};

export const getMyAvailability = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    const { date } = req.query; // Query માંથી ડેટ લો (દા.ત. /api/availability?date=2024-05-20)

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const doctorProfile = await Doctor.findOne({ userId });
    if (!doctorProfile) {
      return res.status(404).json({ message: "ડોક્ટર પ્રોફાઇલ મળી નથી." });
    }

    // જો તારીખ આપી હોય તો એ તારીખનું ફિલ્ટર કરો, નહીંતર બધું બતાવો
    const filter: any = { doctor: doctorProfile._id };
    if (date) filter.date = date;

    const availability = await Availability.findOne(filter);
    
    res.json(availability || { message: "આ તારીખ માટે કોઈ સ્લોટ્સ મળ્યા નથી.", timeSlots: [] });
  } catch (error: any) {
    console.error("❌ Get Availability Error:", error.message);
    res.status(500).json({ message: "Error fetching availability" });
  }
};