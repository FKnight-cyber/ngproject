import { Request, Response } from "express";
import authServices from "../services/authService";

export async function signUp(req:Request, res:Response) {
    const { username, password } : { username:string, password:string} = req.body;

    const user = {
        username,
        password
    }

    await authServices.registerUser(user);

    res.status(201).send('Registered!');
};

export async function signIn(req:Request, res:Response) {
    const { username, password } : { username:string, password:string} = req.body;

    const user = {
        username,
        password
    }

    const token = await authServices.login(user);

    res.status(200).send(token);
};