// import { Router } from "express";
// import { login, register } from "../controllers/auth.controller.js";

// const router = Router();

// router.post("/register", register);
// router.post("/login", login);

// export default router;
import { Router } from "express";
import { login, register } from "../controllers/auth.controller.js"; // .js કાઢી નાખ્યું છે

const router = Router();

/**
 * @route   POST /api/auth/register
 * @desc    નવા યુઝરની નોંધણી કરવા માટે
 */
router.post("/register", register);

/**
 * @route   POST /api/auth/login
 * @desc    લોગિન કરીને JWT ટોકન મેળવવા માટે
 */
router.post("/login", login);

export default router;