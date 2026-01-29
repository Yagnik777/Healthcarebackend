// import mongoose from "mongoose";

// export interface Slot {
//   day: "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";
//   from: string;
//   to: string;
// }

// export interface IAvailability {
//   doctor: mongoose.Types.ObjectId;
//   from: string;
//   to: string;
//   slotDuration: number;
//   slots?: Slot[];
// }

// const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

// const availabilitySchema = new mongoose.Schema<IAvailability>(
//   {
//     doctor: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//       unique: true,
//     },
//     from: {
//       type: String,
//       required: true,
//       match: timeRegex,
//     },
//     to: {
//       type: String,
//       required: true,
//       match: timeRegex,
//     },
//     slotDuration: {
//       type: Number,
//       required: true,
//       min: 5,
//     },
//     slots: [
//       {
//         day: {
//           type: String,
//           enum: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
//         },
//         from: { type: String, match: timeRegex },
//         to: { type: String, match: timeRegex },
//       },
//     ],
//   },
//   { timestamps: true }
// );

// export const Availability = mongoose.model<IAvailability>(
//   "Availability",
//   availabilitySchema
// );
// models/availability.model.ts
import mongoose from "mongoose";

const availabilitySchema = new mongoose.Schema({
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  date: { type: String, required: true },
  timeSlots: [{
    from: { type: String, required: true },
    to: { type: String, required: true },
    slotDuration: { type: Number, default: 30 }
  }]
}, { timestamps: true });

// AA LINE NAAM NA KHOTO INDEX BANAVA DE SHE (doctor + date combination unique rakhse)
availabilitySchema.index({ doctor: 1, date: 1 }, { unique: true });

export default mongoose.model("Availability", availabilitySchema);