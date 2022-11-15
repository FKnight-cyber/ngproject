import { Request, Response } from "express";
import transactionServices from "../services/transactionService";
import { ReceiverInfo } from "../types/transactionTypes";

export async function cashOut(req:Request, res:Response) {
    const { userInfo } = res.locals;
    const transactionInfo:ReceiverInfo = req.body;

    await transactionServices.cashOut(userInfo.data, transactionInfo)

    res.status(201).send('done');
};