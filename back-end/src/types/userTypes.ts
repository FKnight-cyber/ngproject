import { Users } from "@prisma/client";

export type IUserData = Omit<Users, "id" | "accountId">

export type IRegisterUserData = Omit<Users, "id">

export type IUserInfo = {
    id:number,
    username:string,
    balance:number
}