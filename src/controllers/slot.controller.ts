import { generateSlots } from "../utils/generateSlots.js";
import Availability from "../models/availability.model.js";

export const getSlots = async (req: any, res: any) => {
  try {
    const { doctorId, date } = req.query;
    const avail = await Availability.findOne({ doctor: doctorId, date });

    if (!avail) return res.json([]);

    // Galti ahiya hati: avail.from nahi, pan avail.timeSlots use karvu padse
    let slots: string[] = [];
    avail.timeSlots.forEach((s: any) => {
      const generated = generateSlots(s.from, s.to, s.slotDuration);
      slots = [...slots, ...generated];
    });

    res.json(slots);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};