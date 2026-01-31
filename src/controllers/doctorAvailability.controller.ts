// //backend/src/controllers/doctorAvailability.controller.ts
// import type { Request, Response } from "express";
// import Availability from "../models/availability.model.js";

// export const getAvailability = async (req: Request, res: Response) => {
//   try {
//     // @ts-ignore
//     const userId = req.user._id;
//     const { date } = req.query; // Date query mathi aavshe

//     if (!date) {
//       return res.status(400).json({ message: "Date is required" });
//     }

//     const availability = await Availability.findOne({ doctor: userId, date: date });
//     res.json(availability || null);
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// };

// export const setAvailability = async (req: Request, res: Response) => {
//   try {
//     // @ts-ignore
//     const userId = req.user._id;
//     const { from, to, slotDuration, date } = req.body;

//     if (!from || !to || !slotDuration || !date) {
//       return res.status(400).json({ message: "All fields including date are required" });
//     }

//     const availability = await Availability.findOneAndUpdate(
//       { doctor: userId, date: date }, // Doctor + Date check
//       { from, to, slotDuration },
//       { upsert: true, new: true }
//     );

//     res.json(availability);
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// };
import type { Request, Response } from "express";
import Availability from "../models/availability.model.js"; // .js કાઢી નાખ્યું છે (TS માટે)

// TS Type Safety માટે Interface
interface AuthRequest extends Request {
  user?: {
    id: string;
    _id?: string;
  };
}

export const getAvailability = async (req: AuthRequest, res: Response) => {
  try {
    // Local અને Production બંનેમાં ID મળી રહે તે માટે Check
    const userId = req.user?.id || req.user?._id;
    const { date } = req.query;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: User ID not found" });
    }

    if (!date) {
      return res.status(400).json({ message: "Date is required" });
    }

    // Doctor અને Date ના આધારે ડેટા શોધો
    const availability = await Availability.findOne({ doctor: userId, date: date });
    
    // જો ડેટા ના મળે તો 404 નહીં પણ null મોકલો જેથી ફ્રન્ટએન્ડ ક્રેશ ના થાય
    res.json(availability || null);
  } catch (err: any) {
    console.error("❌ Get Availability Error:", err.message);
    res.status(500).json({ message: "Server error while fetching availability" });
  }
};

export const setAvailability = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id || req.user?._id;
    const { from, to, slotDuration, date } = req.body;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!from || !to || !slotDuration || !date) {
      return res.status(400).json({ message: "All fields including date are required" });
    }

    // findOneAndUpdate: જો રેકોર્ડ હશે તો અપડેટ કરશે, નહીં હોય તો નવો બનાવશે (upsert)
    const availability = await Availability.findOneAndUpdate(
      { doctor: userId, date: date }, 
      { from, to, slotDuration: Number(slotDuration) },
      { upsert: true, new: true, runValidators: true }
    );

    res.json(availability);
  } catch (err: any) {
    console.error("❌ Set Availability Error:", err.message);
    res.status(500).json({ message: "Server error while saving availability" });
  }
};