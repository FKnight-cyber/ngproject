import prisma from "../database";

async function insert(balance:number) {
    await prisma.accounts.create({data:{balance}})
};

async function getLastAccount() {
    return prisma.accounts.findFirst({orderBy:{id:'desc'}});
};

async function getAccountById(id:number) {
    return prisma.accounts.findUnique({where:{id}});
}

const accountsRepository = {
    insert,
    getLastAccount,
    getAccountById
};

export default accountsRepository;