// import express from "express";
// import { saveAvailability, getAvailability } from "../controllers/availability.controller.js";
// import { auth } from "../middleware/auth.js";

// const router = express.Router();

// router.get("/", auth, getAvailability);   // GET handler
// router.post("/", auth, saveAvailability); // POST handler

// export default router;
import express from "express";
import { auth } from "../middleware/auth.js";
import { saveAvailability, getMyAvailability } from "../controllers/availability.controller.js";

const router = express.Router();

router.get("/me", auth, getMyAvailability);
router.post("/set", auth, saveAvailability);

export default router;