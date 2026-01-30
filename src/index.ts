
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.routes.js";
import "dotenv/config";
import doctorRoutes from "./routes/doctor.routes.js";
import doctorAvailabilityRoutes from "./routes/doctorAvailability.routes.js";
import availabilityRoutes from "./routes/availability.routes.js";
import appointmentRoutes from "./routes/appointment.routes.js";
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/availability", availabilityRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/doctor", doctorRoutes);
app.use("/api/appointment", appointmentRoutes);
app.use("/api/doctorAvailability", doctorAvailabilityRoutes);


mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => console.log("MongoDB connected (ENV)"))
  .catch((err) => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT ERROR:", err);
});
app.use(cors({
  origin: "http://localhost:3000", // તમારા વરસેલની લિંક અહીં મૂકો
  credentials: true
}));
export default app;