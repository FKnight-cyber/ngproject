import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { checkError } from "./errorHandler";

export default async function authentication(req:Request, res:Response, next:NextFunction) {
    let token:any = req.headers['x-access-token'];

    if(token){
        token = token.toString();
    }

    if(!token) throw checkError(401, "You must send authorization token!");

    const secret = process.env.JWT_SECRET!.toString();

    try {
        jwt.verify(token, secret);

        const data = jwt.decode(token, { complete: true });

        res.locals.userInfo = data?.payload;
        
        next();
    } catch (error) {
        throw checkError(401, "Invalid token or has expired!")
    }
};