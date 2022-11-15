import prisma from '../database';
import { ITransactionData } from '../types/transactionTypes';

async function insert(transaction:ITransactionData) {
    await prisma.transactions.create({data:transaction});
};

async function getUserTransactions(id:number) {
    return prisma.transactions.findMany({where:{
        OR:[
            { creditedAccountId: id }, 
            { debitedAccountId: id }
        ]
    }});
};

async function transactionsByDate(id:number, dateInit:Date, dateEnd:number) {
    return prisma.transactions.findMany({
        where:{
            OR:[
                { creditedAccountId: id }, 
                { debitedAccountId: id }
            ],
            createdAt: {
                gte: new Date(dateInit),
                lte: new Date(dateEnd)
            }
        }
    });
};

const transactionsRepository = {
    insert,
    getUserTransactions,
    transactionsByDate
};

export default transactionsRepository;