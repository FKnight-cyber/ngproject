import { Router } from "express";
import authRouter from "./authRouter";
import accountRouter from "./accountRouter";
import transactionRouter from "./transactionRouter";

const mainRouter = Router();

mainRouter.use(authRouter);
mainRouter.use(accountRouter);
mainRouter.use(transactionRouter);

export default mainRouter;