import prisma from "../database";

async function insert(balance:number) {
    await prisma.accounts.create({data:{balance}})
};

async function getLastAccount() {
    return prisma.accounts.findFirst({orderBy:{id:'desc'}});
};

const accountsRepository = {
    insert,
    getLastAccount
};

export default accountsRepository;