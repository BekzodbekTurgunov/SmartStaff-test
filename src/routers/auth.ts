import { Router } from "express";
import {login} from "../controllers/authController";

const router = Router();
//Login route
router.post("/login", login);

//Change my password
router.post("/change-password", changePassword);

export default router;