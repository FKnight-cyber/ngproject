import { Transactions } from '@prisma/client';

export type ITransactionData = Omit<Transactions, "id" | "createdAt">;

export type ReceiverInfo = {
    username:string,
    value:number
};