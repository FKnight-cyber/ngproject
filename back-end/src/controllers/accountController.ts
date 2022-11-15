import { Request, Response } from "express";

export async function getBalance(req:Request, res:Response) {
    const { userInfo } = res.locals;
    const id:number = Number(req.params.id);

    res.status(201).send('Registered!');
};