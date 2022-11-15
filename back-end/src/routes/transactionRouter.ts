import { Router } from "express";
import authentication from "../middlewares/authentication";
import { cashOut } from "../controllers/transactionController";
import transactionValidation from "../middlewares/transactionValidation";
import dateValidation from "../middlewares/dateValidation";
import { myTransactions, transactionsByDate } from "../controllers/transactionController";

const transactionRouter = Router();

transactionRouter.post("/transactions", transactionValidation, authentication, cashOut);
transactionRouter.get("/my/transactions", authentication, myTransactions);
transactionRouter.post("/my/transactions/date", dateValidation, authentication, transactionsByDate);

export default transactionRouter;