import { Router } from "express";
import authValidation from "../middlewares/authValidation";
import { signUp } from "../controllers/authController";

const authRouter = Router();

authRouter.post("/sign-up", authValidation, signUp);

export default authRouter;