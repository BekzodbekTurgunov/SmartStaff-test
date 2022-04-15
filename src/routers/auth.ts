import {Router} from "express";
import {login, verification} from "../controllers/authController";

const router = Router();

router.post("/login", login);
router.post("/verification", verification);

export default router;