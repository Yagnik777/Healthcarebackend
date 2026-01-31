
// import express from "express";
// import cors from "cors";
// import mongoose from "mongoose";
// import authRoutes from "./routes/auth.routes.js";
// import "dotenv/config";
// import doctorRoutes from "./routes/doctor.routes.js";
// import doctorAvailabilityRoutes from "./routes/doctorAvailability.routes.js";
// import availabilityRoutes from "./routes/availability.routes.js";
// import appointmentRoutes from "./routes/appointment.routes.js";
// const app = express();

// app.use(cors());
// app.use(express.json());
// app.use("/api/availability", availabilityRoutes);
// app.use("/api/auth", authRoutes);
// app.use("/api/doctor", doctorRoutes);
// app.use("/api/appointment", appointmentRoutes);
// app.use("/api/doctorAvailability", doctorAvailabilityRoutes);


// mongoose
//   .connect(process.env.MONGO_URI!)
//   .then(() => console.log("MongoDB connected (ENV)"))
//   .catch((err) => console.error(err));

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// process.on("uncaughtException", (err) => {
//   console.log("UNCAUGHT ERROR:", err);
// });
// app.use(cors({
//   origin: "http://localhost:3000", // તમારા વરસેલની લિંક અહીં મૂકો
//   credentials: true
// }));
// export default app;
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";

// Routes Imports (.js હટાવ્યા છે TS સુસંગતતા માટે)
import authRoutes from "./routes/auth.routes.js";
import doctorRoutes from "./routes/doctor.routes.js";
import doctorAvailabilityRoutes from "./routes/doctorAvailability.routes.js";
import availabilityRoutes from "./routes/availability.routes.js";
import appointmentRoutes from "./routes/appointment.routes.js";

const app = express();

// --- 1. Middleware ---
// CORS Configuration: Local અને Production બંને માટે
const allowedOrigins = [
  'https://healthcarefrontend-three.vercel.app',
  "http://localhost:3000",
  process.env.FRONTEND_URL
].filter(Boolean) as string[];

app.use(cors({
  origin: (origin, callback) => {
    // જો રિક્વેસ્ટ વગર origin (જેમ કે Postman) હોય અથવા origin લિસ્ટમાં હોય
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// --- 2. Routes ---
app.use("/api/auth", authRoutes);
app.use("/api/doctor", doctorRoutes);
app.use("/api/appointment", appointmentRoutes);
app.use("/api/availability", availabilityRoutes);
app.use("/api/doctorAvailability", doctorAvailabilityRoutes);

// Health Check Route (Vercel માટે જરૂરી)
app.get("/", (req, res) => {
  res.send("Hospital API is running...");
});

// --- 3. Database Connection ---
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("❌ MONGO_URI is not defined in ENV");
} else {
  mongoose
    .connect(MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch((err) => console.error("❌ MongoDB Connection Error:", err));
}

// --- 4. Server Setup ---
// Vercel Serverless માટે આ કંડિશનલ લિસનિંગ જરૂરી છે
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`🚀 Server running locally on port ${PORT}`));
}

// Error Handling
process.on("uncaughtException", (err) => {
  console.error("🔥 UNCAUGHT ERROR:", err);
});

// Vercel માટે app એક્સપોર્ટ કરવી જરૂરી છે
export default app;