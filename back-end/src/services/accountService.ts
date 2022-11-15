import { IUserInfo } from '../types/userTypes';
import { checkError } from '../middlewares/errorHandler';
import accountRepository from '../repositories/accountRepository';

async function userBalance(userInfo:IUserInfo, userId:number) {
    if(userInfo.id !== userId) throw checkError(401, 'Unauthorized request!');
    
    const { balance } = await accountRepository.getAccountById(userId);

    return balance;
};

const accountServices = {
    userBalance
};

export default accountServices;