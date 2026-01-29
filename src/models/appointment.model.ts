import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema({
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
  patient: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  patientName: String,
  date: String, // YYYY-MM-DD
  slot: String, // HH:mm
  status: { 
    type: String, 
    enum: ["pending", "accepted", "rejected"], 
    default: "pending" 
  }
}, { timestamps: true });

export default mongoose.model("Appointment", AppointmentSchema);