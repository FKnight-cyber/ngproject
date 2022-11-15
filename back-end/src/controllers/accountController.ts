import { Request, Response } from "express";
import accountServices from "../services/accountService";

export async function getBalance(req:Request, res:Response) {
    const { userInfo } = res.locals;
    const id:number = Number(req.params.id);

    const balance = await accountServices.userBalance(userInfo.data, id);

    res.status(200).send(balance.toString());
};