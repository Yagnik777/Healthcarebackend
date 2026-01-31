// import express from "express";
// import { saveAvailability, getAvailability } from "../controllers/availability.controller.js";
// import { auth } from "../middleware/auth.js";

// const router = express.Router();

// router.get("/", auth, getAvailability);   // GET handler
// router.post("/", auth, saveAvailability); // POST handler

// export default router;
// import express from "express";
// import { auth } from "../middleware/auth.js";
// import { saveAvailability, getMyAvailability } from "../controllers/availability.controller.js";

// const router = express.Router();

// router.get("/me", auth, getMyAvailability);
// router.post("/set", auth, saveAvailability);

// export default router;
import express from "express";
import { auth } from "../middleware/auth.js"; // .js કાઢી નાખ્યું છે
import { saveAvailability, getMyAvailability } from "../controllers/availability.controller.js";

const router = express.Router();

/**
 * @route   GET /api/availability/me
 * @desc    લોગિન થયેલ ડોક્ટર પોતાની ઉપલબ્ધતા જોઈ શકે
 */
router.get("/me", auth, getMyAvailability);

/**
 * @route   POST /api/availability/set
 * @desc    ડોક્ટર પોતાની નવી ઉપલબ્ધતા (slots) સેટ કરી શકે
 */
router.post("/set", auth, saveAvailability);

export default router;