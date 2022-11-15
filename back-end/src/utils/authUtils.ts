import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { IUserInfo } from '../types/userTypes';

dotenv.config();

export function generateUserToken(data:IUserInfo){
    const secret:string = process.env.JWT_SECRET || "";
    return (
        jwt.sign({
            expiresIn: '24h',
            data
          }, secret)
    );
};

export function encrypt(password:string){
    return bcrypt.hashSync(password,10);
};

export function decrypt(password:string, hashPassword:string){
    return bcrypt.compareSync(password, hashPassword);
};