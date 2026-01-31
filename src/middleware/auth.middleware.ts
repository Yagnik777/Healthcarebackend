// import type { Request, Response, NextFunction } from "express";
// import jwt from "jsonwebtoken";

// interface JwtPayload {
//   id: string;
//   role: string;
// }

// const authMiddleware = (
//   req: any,
//   res: Response,
//   next: NextFunction
// ) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res.status(401).json({ message: "No token provided" });
//   }

//   const token = authHeader.split(" ")[1];

//   try {
//     const decoded = jwt.verify(
//       token,
//       process.env.JWT_SECRET as string
//     ) as JwtPayload;

//     req.user = decoded; // { id, role }
//     next();
//   } catch (err) {
//     return res.status(401).json({ message: "Invalid token" });
//   }
// };

// export default authMiddleware;
import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// TypeScript માટે Request ઈન્ટરફેસને એક્સટેન્ડ કરો
export interface AuthRequest extends Request {
  user?: {
    id: string;
    role: string;
  };
}

interface JwtPayload {
  id: string;
  role: string;
}

const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    // 1. ચેક કરો કે હેડર છે કે નહીં
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ 
        message: "Access Denied: No token provided",
        suggestion: "Please provide a token in the format: Bearer <token>"
      });
    }

    const token = authHeader.split(" ")[1]!; // '!' ઉમેર્યું જેથી TS ને ખબર પડે કે token મળશે જ

    // 2. JWT_SECRET ચેક કરો અને તેને string તરીકે ફિક્સ કરો
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.error("❌ ERROR: JWT_SECRET is not defined in environment variables!");
      return res.status(500).json({ message: "Internal server configuration error" });
    }

    // 3. ટોકન વેરિફાઈ કરો (અહીં secret નો ઉપયોગ કર્યો છે જે આપણે ઉપર ચેક કરી લીધો છે)
    // 'as JwtPayload' વાપરવાથી એરર સોલ્વ થઈ જશે
    const decoded = jwt.verify(token, secret) as unknown as JwtPayload;

    // 4. રિક્વેસ્ટ ઓબ્જેક્ટમાં યુઝર ડેટા એડ કરો
    req.user = {
      id: decoded.id,
      role: decoded.role
    };

    next();
  } catch (err: any) {
    console.error("🔒 Auth Error:", err.message);
    
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token has expired, please login again" });
    }

    return res.status(401).json({ message: "Invalid or tampered token" });
  }
};

export default authMiddleware;