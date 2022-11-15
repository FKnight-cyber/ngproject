import { Router } from "express";
import authentication from "../middlewares/authentication";
import { cashOut, cashOutInfo, cashInInfo } from "../controllers/transactionController";
import transactionValidation from "../middlewares/transactionValidation";
import dateValidation from "../middlewares/dateValidation";
import { myTransactions, transactionsByDate } from "../controllers/transactionController";

const transactionRouter = Router();

transactionRouter.post("/transactions", transactionValidation, authentication, cashOut);
transactionRouter.post("/my/transactions/date", dateValidation, authentication, transactionsByDate);
transactionRouter.get("/my/transactions", authentication, myTransactions);
transactionRouter.get("/my/transactions/in", authentication, cashInInfo);
transactionRouter.get("/my/transactions/out", authentication, cashOutInfo);

export default transactionRouter;