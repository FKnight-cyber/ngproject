import { Router } from "express";
import authRouter from "./authRouter";
import accountRouter from "./accountRouter";

const mainRouter = Router();

mainRouter.use(authRouter);
mainRouter.use(accountRouter);

export default mainRouter;