import { Request, Response } from "express";
import accountServices from "../services/accountService";

export async function getBalance(req:Request, res:Response) {
    const { userInfo } = res.locals;

    const balance = await accountServices.userBalance(userInfo.data);

    res.status(200).send(balance.toString());
};