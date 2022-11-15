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
    }})
}

const transactionsRepository = {
    insert,
    getUserTransactions
};

export default transactionsRepository;