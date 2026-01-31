// import type { Request, Response, NextFunction } from "express";
// import jwt from "jsonwebtoken";
// import {User} from "../models/User.js";

// export interface AuthRequest extends Request {
//   user?: any;
// }

// export const auth = async (req: AuthRequest, res: Response, next: NextFunction) => {
//   const token = req.headers.authorization?.split(" ")[1];
//   if (!token) return res.status(401).json({ message: "No token" });

//   try {
//     const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
//     const user = await User.findById(decoded.id);
//     if (!user) return res.status(401).json({ message: "Invalid token" });

//     req.user ={
//       id: decoded.id, // 👈 THIS IS CRITICAL
//     };
//     next();
//   } catch {
//     res.status(401).json({ message: "Unauthorized" });
//   }
// };
import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js"; // .js કાઢી નાખ્યું છે (TS માટે વધુ સારું)

// Request Interface ને એક્સટેન્ડ કર્યું
export interface AuthRequest extends Request {
  user?: any;
}

export const auth = async (req: AuthRequest, res: Response, next: NextFunction) => {
  // ૧. ટોકન મેળવો (Bearer Token pattern)
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : authHeader;

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    // ૨. JWT Secret ચેક (Local/Production safety)
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.error("❌ JWT_SECRET is missing in environment variables!");
      return res.status(500).json({ message: "Server configuration error" });
    }

    // ૩. વેરીફિકેશન
    const decoded: any = jwt.verify(token, secret);
    
    // ૪. યુઝર શોધો (તમારું મૂળ લોજિક)
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "User not found, invalid token" });
    }

    // ૫. રિક્વેસ્ટમાં ડેટા એડ કરો (CRITICAL STEP)
    req.user = {
      id: decoded.id,
    };

    next();
  } catch (error: any) {
    console.error("🔒 Auth Middleware Error:", error.message);
    res.status(401).json({ message: "Unauthorized: Token is not valid" });
  }
};