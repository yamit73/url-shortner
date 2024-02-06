import { Router } from "express";
const router = Router();
import User from "../Controllers/User.js";
const { signup, signin } = User;

router.post("/signup", signup);
router.post("/signin", signin);

export default router;
