import mongoose from "mongoose";

const schema = new mongoose.Schema({
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true },
  day: String,
  from: String,
  to: String,
  slotDuration: { type: Number, default: 30 }
});

export default mongoose.model("DoctorAvailability", schema);
