import { Request, Response } from "express";
import transactionServices from "../services/transactionService";
import { ReceiverInfo } from "../types/transactionTypes";

export async function cashOut(req:Request, res:Response) {
    const { userInfo } = res.locals;
    const transactionInfo:ReceiverInfo = req.body;

    await transactionServices.cashOut(userInfo.data, transactionInfo)

    res.status(201).send('Transaction completed!');
};

export async function myTransactions(req:Request, res:Response) {
    const { userInfo } = res.locals;
    const transactions = await transactionServices.getTransactions(userInfo.data.id);

    res.status(200).send(transactions);
};

export async function transactionsByDate(req:Request, res:Response) {
    const { userInfo } = res.locals;
    const { date } = req.body;

    const transactions = await transactionServices.filterByDate(userInfo.data, date);

    res.status(200).send(transactions)
};