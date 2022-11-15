import { Request, Response, NextFunction } from "express";
import dateSchema from "../schemas/dateSchema";

export default async function dateValidation(req:Request, 
    res:Response, 
    next:NextFunction) {
            const { error } = dateSchema.validate(req.body);

            if(error) return res.status(422).send(error.details.map(detail => detail.message));

            next();
};