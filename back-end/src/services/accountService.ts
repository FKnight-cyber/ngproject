import { IUserInfo } from '../types/userTypes';
import accountRepository from '../repositories/accountRepository';

async function userBalance(userInfo:IUserInfo) {
    const { balance } = await accountRepository.getAccountById(userInfo.id);

    return balance;
};

const accountServices = {
    userBalance
};

export default accountServices;