// import { IUser } from "../models/user.model.js";

// declare global {
//   namespace Express {
//     interface Request {
//       user?: IUser & { _id: string };
//     }
//   }
// }
import { IUser } from "../models/user.model"; // .js કાઢી નાખ્યું છે

// declare global નો ઉપયોગ પ્રોડક્શનમાં બિલ્ડ વખતે એરર રોકે છે
declare global {
  namespace Express {
    // Request Interface ને Extend કરીએ છીએ
    interface Request {
      // User ઓપ્શનલ રાખવો જરૂરી છે કારણ કે બધા રાઉટ્સમાં Auth મિડલવેર નથી હોતું
      user?: IUser & { _id: string; id?: string };
    }
  }
}

// આ લાઈન ખૂબ મહત્વની છે. 
// TypeScript આ ફાઈલને 'Module' ગણે તે માટે ખાલી export જરૂરી છે.
export {};