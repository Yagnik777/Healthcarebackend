import type { Request, Response } from "express";
import { Patient } from "../models/Patient.js";

export const getPatients = async (req: Request, res: Response) => {
  const patients = await Patient.find();
  res.json(patients);
};

export const createPatient = async (req: Request, res: Response) => {
  const newPatient = new Patient(req.body);
  await newPatient.save();
  res.status(201).json(newPatient);
};
