// import { generateSlots } from "../utils/generateSlots.js";
// import Availability from "../models/availability.model.js";

// export const getSlots = async (req: any, res: any) => {
//   try {
//     const { doctorId, date } = req.query;
//     const avail = await Availability.findOne({ doctor: doctorId, date });

//     if (!avail) return res.json([]);

//     // Galti ahiya hati: avail.from nahi, pan avail.timeSlots use karvu padse
//     let slots: string[] = [];
//     avail.timeSlots.forEach((s: any) => {
//       const generated = generateSlots(s.from, s.to, s.slotDuration);
//       slots = [...slots, ...generated];
//     });

//     res.json(slots);
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// };
import type { Request, Response } from "express";
import { generateSlots } from "../utils/generateSlots.js"; // .js કાઢી નાખ્યું છે
import Availability from "../models/availability.model.js";

export const getSlots = async (req: Request, res: Response) => {
  try {
    const { doctorId, date } = req.query;

    // 1. Validation: જો ID અથવા તારીખ ગાયબ હોય
    if (!doctorId || !date) {
      return res.status(400).json({ message: "Doctor ID and date are required" });
    }

    // 2. ડેટાબેઝ ક્વેરી
    const avail = await Availability.findOne({ doctor: doctorId, date });

    // 3. જો તે દિવસે કોઈ ઉપલબ્ધતા ન હોય
    if (!avail || !avail.timeSlots || avail.timeSlots.length === 0) {
      return res.json([]);
    }

    // 4. તમારું મૂળ લોજિક: timeSlots માંથી સ્લોટ્સ જનરેટ કરવા
    let slots: string[] = [];
    
    avail.timeSlots.forEach((s: any) => {
      // સુરક્ષા માટે ચેક કરો કે from અને to અસ્તિત્વ ધરાવે છે
      if (s.from && s.to) {
        const generated = generateSlots(s.from, s.to, s.slotDuration || 30);
        slots = [...slots, ...generated];
      }
    });

    // 5. ડુપ્લીકેટ સ્લોટ્સ કાઢી નાખવા અને સૉર્ટ કરવા (Optional but Recommended)
    const uniqueSlots = Array.from(new Set(slots)).sort();

    res.json(uniqueSlots);

  } catch (err: any) {
    // Production માં console.error વરસેલ લોગ્સમાં દેખાશે
    console.error("❌ Get Slots Error:", err.message);
    res.status(500).json({ message: "Server error while generating slots" });
  }
};