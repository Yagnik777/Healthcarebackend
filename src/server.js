// const express = require("express");
// const cors = require("cors");

// const app = express();
// app.use(cors());
// app.use(express.json());

// // ================== TEMP DATA ==================
// let doctors = [
//   { id: 1, name: "Dr. Patel", available: false, slots: [] }
// ];

// let appointments = [];

// // ================== DOCTOR LOGIN ==================
// app.post("/api/doctor/login", (req, res) => {
//   res.json({ success: true, doctorId: 1 });
// });

// // ================== SET AVAILABILITY ==================
// app.post("/api/doctor/availability", (req, res) => {
//   const { doctorId, from, to } = req.body;

//   const doctor = doctors.find(d => d.id === doctorId);
//   if (!doctor) return res.status(404).json({ message: "Doctor not found" });

//   doctor.available = true;
//   doctor.slots = [{ from, to }];

//   res.json({ message: "Availability set", doctor });
// });

// // ================== GET DOCTORS (PATIENT SIDE) ==================
// app.get("/api/doctors", (req, res) => {
//   res.json(doctors);
// });

// // ================== BOOK APPOINTMENT ==================
// app.post("/api/appointment/request", (req, res) => {
//   const { doctorId } = req.body;

//   appointments.push({
//     id: appointments.length + 1,
//     doctorId,
//     status: "pending"
//   });

//   res.json({ message: "Appointment request sent" });
// });

// // ================== DOCTOR ACCEPT ==================
// app.post("/api/appointment/accept", (req, res) => {
//   const { appointmentId } = req.body;

//   const appt = appointments.find(a => a.id === appointmentId);
//   if (!appt) return res.status(404).json({ message: "Not found" });

//   appt.status = "accepted";
//   res.json({ message: "Appointment accepted" });
// });

// // ================== PATIENT CHECK STATUS ==================
// app.get("/api/appointment/status/:id", (req, res) => {
//   const appt = appointments.find(a => a.id == req.params.id);
//   res.json(appt);
// });

// // ================== SERVER ==================
// app.listen(5000, () => {
//   console.log("Backend running on http://localhost:5000");
// });
