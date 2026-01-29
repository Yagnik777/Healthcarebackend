//backend/src/controllers/doctorAvailability.controller.ts
import type { Request, Response } from "express";
import Availability from "../models/availability.model.js";

export const getAvailability = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const userId = req.user._id;
    const { date } = req.query; // Date query mathi aavshe

    if (!date) {
      return res.status(400).json({ message: "Date is required" });
    }

    const availability = await Availability.findOne({ doctor: userId, date: date });
    res.json(availability || null);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const setAvailability = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const userId = req.user._id;
    const { from, to, slotDuration, date } = req.body;

    if (!from || !to || !slotDuration || !date) {
      return res.status(400).json({ message: "All fields including date are required" });
    }

    const availability = await Availability.findOneAndUpdate(
      { doctor: userId, date: date }, // Doctor + Date check
      { from, to, slotDuration },
      { upsert: true, new: true }
    );

    res.json(availability);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};