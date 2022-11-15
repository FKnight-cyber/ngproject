import { Router } from "express";
import authentication from "../middlewares/authentication";
import { cashOut } from "../controllers/transactionController";
import transactionValidation from "../middlewares/transactionValidation";
import { myTransactions } from "../controllers/transactionController";

const transactionRouter = Router();

transactionRouter.post("/transactions", transactionValidation, authentication, cashOut);
transactionRouter.get("/my/transactions", authentication, myTransactions);

export default transactionRouter;