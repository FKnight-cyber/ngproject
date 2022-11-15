import { IUserInfo } from '../types/userTypes';
import { ReceiverInfo, ITransactionData  } from '../types/transactionTypes';
import { checkError } from '../middlewares/errorHandler';
import authRepository from '../repositories/authRepository';
import transactionsRepository from '../repositories/transactionRepository';
import accountsRepository from '../repositories/accountRepository';

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

const transactionServices = {
    cashOut
};

export default transactionServices;