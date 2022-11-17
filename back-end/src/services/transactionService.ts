import { IUserInfo } from '../types/userTypes';
import { ReceiverInfo, ITransactionData  } from '../types/transactionTypes';
import { checkError } from '../middlewares/errorHandler';
import authRepository from '../repositories/authRepository';
import transactionsRepository from '../repositories/transactionRepository';
import accountsRepository from '../repositories/accountRepository';
import { tomorrow } from '../utils/transactionUtils';

async function cashOut(user:IUserInfo, receiver:ReceiverInfo) {
    if(user.username === receiver.username) throw checkError(409, "Can`t cashout to yourself!");

    const sender = await accountsRepository.getAccountById(user.id);

    if(sender.balance < receiver.value) throw checkError(409, "Insufficient balance ;(");

    const checkReceiver = await authRepository.findUserByName(receiver.username);
    if(!checkReceiver) throw checkError(404, "User not registered!");

    await accountsRepository.cashOut(user.id,receiver.value);
    await accountsRepository.cashIn(checkReceiver.id, receiver.value);

    const transactionInfo:ITransactionData = {
        debitedAccountId: user.id,
        creditedAccountId: checkReceiver.id,
        value: Number(receiver.value)
    };

    await transactionsRepository.insert(transactionInfo);
};

async function getTransactions(id:number) {
    const transactions = await transactionsRepository.getUserTransactions(id);

    type Transactions = {
        id:number,
        debitedAccountId:number,
        creditedAccountId:number,
        value:number,
        createdAt:Date,
        username:string
    };

    const data:Transactions[] = [];

    for(let transaction of transactions) {
        if(transaction.debitedAccountId !== id){
            const user = await authRepository.findUserById(transaction.debitedAccountId);
            data.push({
                id: transaction.id,
                debitedAccountId: transaction.debitedAccountId,
                creditedAccountId: transaction.creditedAccountId,
                value: transaction.value,
                createdAt: transaction.createdAt,
                username: user.username
            });
        }
        if(transaction.creditedAccountId !== id){
            const user = await authRepository.findUserById(transaction.creditedAccountId);
            data.push({
                id: transaction.id,
                debitedAccountId: transaction.debitedAccountId,
                creditedAccountId: transaction.creditedAccountId,
                value: transaction.value,
                createdAt: transaction.createdAt,
                username: user.username
            });
        }
    }

    return data;
};

async function filterByDate(user:IUserInfo, date:Date) {
    return await transactionsRepository.transactionsByDate(user.id, date, tomorrow(date)) 
};

async function getCashOut(user:IUserInfo) {
    return await transactionsRepository.cashOutInfo(user.id);
};

async function getCashIn(user:IUserInfo) {
    return await transactionsRepository.cashInInfo(user.id);
};

const transactionServices = {
    cashOut,
    getTransactions,
    filterByDate,
    getCashOut,
    getCashIn
};

export default transactionServices;