import { Router } from "express";
import authentication from "../middlewares/authentication";
import { getBalance } from "../controllers/accountController";

const accountRouter = Router();

accountRouter.get("/account/info", authentication, getBalance);

export default accountRouter;