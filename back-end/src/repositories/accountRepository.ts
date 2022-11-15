import prisma from "../database";

async function insert(balance:number) {
    await prisma.accounts.create({data:{balance}})
};

async function getLastAccount() {
    return prisma.accounts.findFirst({orderBy:{id:'desc'}});
};

async function getAccountById(id:number) {
    return prisma.accounts.findUnique({where:{id}});
};

async function cashOut(id:number, value:number) {
    await prisma.accounts.update({
        where:{
            id
        },
        data:{
            balance:{
                decrement: Number(value)
            }
        }
    });
};

async function cashIn(id:number, value:number) {
    await prisma.accounts.update({
        where:{
            id
        },
        data:{
            balance:{
                increment: Number(value)
            }
        }
    });
};

const accountsRepository = {
    insert,
    getLastAccount,
    getAccountById,
    cashOut,
    cashIn
};

export default accountsRepository;