import { Request, Response, NextFunction } from "express";
import transactionSchema from "../schemas/transactionSchema";

export default async function transactionValidation(req:Request, 
    res:Response, 
    next:NextFunction) {
            const { error } = transactionSchema.validate(req.body, {abortEarly:false});

            if(error) return res.status(422).send(error.details.map(detail => detail.message));

            next();
};