import { Router } from "express";
import authentication from "../middlewares/authentication";
import { cashOut } from "../controllers/transactionController";
import transactionValidation from "../middlewares/transactionValidation";

const transactionRouter = Router();

transactionRouter.post("/transactions", transactionValidation, authentication, cashOut);

export default transactionRouter;