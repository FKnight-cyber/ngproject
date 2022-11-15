import { Router } from "express";
import authentication from "../middlewares/authentication";

const accountRouter = Router();

accountRouter.get("/account/info", authentication);

export default accountRouter;