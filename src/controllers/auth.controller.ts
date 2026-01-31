// import type{ Request, Response } from "express";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import { User } from "../models/User.js";

// export const register = async (req: Request, res: Response) => {
//   try {
//     const { name, email, password, role } = req.body;

//     // check existing user
//     const existing = await User.findOne({ email });
//     if (existing) return res.status(400).json({ message: "Email already registered" });

//     // hash password
//     const hashed = await bcrypt.hash(password, 10);

//     const user = await User.create({ name, email, password: hashed, role });

//     res.status(201).json({ message: "User registered successfully" });
//   } catch (err) {
//     res.status(500).json({ message: "Server error", error: err });
//   }
// };

// export const login = async (req: Request, res: Response) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ message: "Invalid credentials" });

//     const match = await bcrypt.compare(password, user.password);
//     if (!match) return res.status(400).json({ message: "Invalid credentials" });

//     // JWT with role
//     const token = jwt.sign(
//       { id: user._id, email: user.email, role: user.role },
//       process.env.JWT_SECRET!,
//       { expiresIn: "1h" }
//     );

//     res.json({ token, role: user.role, name: user.name });
//   } catch (err) {
//     res.status(500).json({ message: "Server error", error: err });
//   }
// };
import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js"; // TS માં .js વગર ઈમ્પોર્ટ કરવું વધુ સેફ છે

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;

    // ૧. ચેક કરો કે યુઝર પહેલેથી છે કે નહીં
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // ૨. પાસવર્ડ હેશિંગ
    const hashed = await bcrypt.hash(password, 10);

    // ૩. યુઝર ક્રિએશન
    const user = await User.create({ 
      name, 
      email, 
      password: hashed, 
      role: role || "patient" // ડિફોલ્ટ રોલ પેશન્ટ રાખવો સેફ છે
    });

    res.status(201).json({ 
      message: "User registered successfully",
      userId: user._id 
    });
  } catch (err: any) {
    console.error("Registration Error:", err.message);
    res.status(500).json({ message: "Server error during registration" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // 🔍 Debugging: આ ટર્મિનલમાં દેખાશે
    //console.log("Login attempt for:", email);

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials (User not found)" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: "Invalid credentials (Password mismatch)" });
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      return res.status(500).json({ message: "Server configuration error" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      secret,
      { expiresIn: "1h" }
    );

    res.json({ 
      token, 
      role: user.role, 
      name: user.name,
      id: user._id 
    });
  } catch (err: any) {
    console.error("Login Error:", err.message);
    res.status(500).json({ message: "Server error during login" });
  }
};