import {Router} from "express";
import {login, verification} from "../controllers/authController";
import { checkJwt } from "../middlewares/checkJwt";
const router = Router();

router.post("/login", login);
router.post("/verification", verification);

router.get("/secret", [checkJwt],(req, res) => {
    res.status(200).send({
        message: "Success"
    });
});

export default router;