import { IUserData, IRegisterUserData } from '../types/userTypes';
import accountRepository from '../repositories/accountRepository';
import authRepository from '../repositories/authRepository';
import { checkError } from '../middlewares/errorHandler';
import { encrypt } from '../utils/authUtils';

async function registerUser(user:IUserData) {
    user.username = user.username.trim();
    user.password = user.password.trim();
    
    const checkUser = await authRepository.findUserByName(user.username);
    if(checkUser) throw checkError(409, "Username already registered!");

    await accountRepository.insert(100);

    const accountId = (await accountRepository.getLastAccount()).id;

    const validUser:IRegisterUserData = {
        username: user.username,
        password: encrypt(user.password),
        accountId
    };

    await authRepository.insert(validUser);
};

const authServices = {
    registerUser
};

export default authServices;