import prisma from "../database";
import { IRegisterUserData } from "../types/userTypes";

async function insert(user:IRegisterUserData) {
    await prisma.users.create({data:user})
};

async function findUserByName(username:string) {
    return prisma.users.findUnique({where:{username}});
}

async function findUserById(id:number) {
    return prisma.users.findUnique({where:{id}});
}

const authRepository = {
    insert,
    findUserByName,
    findUserById
};

export default authRepository;