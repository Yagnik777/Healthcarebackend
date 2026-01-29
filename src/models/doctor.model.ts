import { Schema, model } from "mongoose";

export interface IDoctor {
  userId: string;
  name: string;
  specialization: string;
  experience: number;
  clinicAddress: string;
  profileCompleted: boolean;
  availability?: {
    date: String,
    from: string;
    to: string;
    slotDuration: number;
  };
}

const DoctorSchema = new Schema<IDoctor>({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  specialization: { type: String, required: true },
  experience: { type: Number, required: true },
  clinicAddress: { type: String, required: true },
  profileCompleted: { type: Boolean, default: false }, // 👈 Aa add karo
  availability: {
    date: String,
    from: String,
    to: String,
    slotDuration: Number,
  },

});

export const Doctor = model<IDoctor>("Doctor", DoctorSchema);
