import { IUserData, IRegisterUserData } from '../types/userTypes';
import accountRepository from '../repositories/accountRepository';
import authRepository from '../repositories/authRepository';
import { checkError } from '../middlewares/errorHandler';
import { encrypt, decrypt, generateUserToken } from '../utils/authUtils';

async function registerUser(user:IUserData) {
    user.username = user.username.trim();
    user.password = user.password.trim();
    
    const checkUser = await authRepository.findUserByName(user.username);
    if(checkUser) throw checkError(409, "Username already registered!");

    await accountRepository.insert(10000);

    const accountId = (await accountRepository.getLastAccount()).id;

    const validUser:IRegisterUserData = {
        username: user.username,
        password: encrypt(user.password),
        accountId
    };

    await authRepository.insert(validUser);
};

async function login(user:IUserData) {
    const checkUser = await authRepository.findUserByName(user.username);
    if(!checkUser) throw checkError(404, "User not registered!");

    if(!decrypt(user.password, checkUser.password)) throw checkError(401,"Wrong password!");

    const userInfo = {
        id: checkUser.id,
        username: checkUser.username
    };

    const token = generateUserToken(userInfo);

    return token;
};

const authServices = {
    registerUser,
    login
};

export default authServices;