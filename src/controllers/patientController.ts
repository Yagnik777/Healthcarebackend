// import type { Request, Response } from "express";
// import { Patient } from "../models/Patient.js";

// export const getPatients = async (req: Request, res: Response) => {
//   const patients = await Patient.find();
//   res.json(patients);
// };

// export const createPatient = async (req: Request, res: Response) => {
//   const newPatient = new Patient(req.body);
//   await newPatient.save();
//   res.status(201).json(newPatient);
// };
import type { Request, Response } from "express";
import { Patient } from "../models/Patient.js"; // .js કાઢી નાખ્યું છે (TS માટે)

// 1. Get All Patients
export const getPatients = async (req: Request, res: Response) => {
  try {
    // Production Safety: .find() સાથે .lean() વાપરવાથી ક્વેરી ફાસ્ટ થશે
    const patients = await Patient.find().lean();
    res.status(200).json(patients);
  } catch (err: any) {
    console.error("❌ Fetch Patients Error:", err.message);
    res.status(500).json({ message: "સર્વર એરર: દર્દીઓની યાદી મળી શકી નથી." });
  }
};

// 2. Create New Patient
export const createPatient = async (req: Request, res: Response) => {
  try {
    // Production Safety: રિક્વેસ્ટ બોડી ખાલી નથી ને તે ચેક કરવું
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "દર્દીનો ડેટા જરૂરી છે." });
    }

    const newPatient = new Patient(req.body);
    const savedPatient = await newPatient.save();
    
    res.status(201).json(savedPatient);
  } catch (err: any) {
    console.error("❌ Create Patient Error:", err.message);
    
    // જો ડુપ્લીકેટ ઈમેલ હોય તો તે માટેની એરર
    if (err.code === 11000) {
      return res.status(400).json({ message: "આ દર્દી પહેલેથી જ નોંધાયેલ છે." });
    }
    
    res.status(500).json({ message: "સર્વર એરર: દર્દીની નોંધણી થઈ શકી નથી." });
  }
};