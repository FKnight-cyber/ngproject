import prisma from "../database";
import { IRegisterUserData } from "../types/userTypes";

async function insert(user:IRegisterUserData) {
    await prisma.users.create({data:user})
};

async function findUserByName(username:string) {
    return prisma.users.findUnique({where:{username}});
}

const authRepository = {
    insert,
    findUserByName
};

export default authRepository;