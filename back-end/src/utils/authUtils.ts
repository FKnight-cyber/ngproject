import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

export function encrypt(password:string){
    return bcrypt.hashSync(password,10);
};

export function decrypt(password:string, hashPassword:string){
    return bcrypt.compareSync(password, hashPassword);
};