import prisma from '../database';
import { ITransactionData } from '../types/transactionTypes';

async function insert(transaction:ITransactionData) {
    await prisma.transactions.create({data:transaction});
};

const transactionsRepository = {
    insert
};

export default transactionsRepository;