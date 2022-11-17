import app from "../../src/app";
import prisma from "../../src/database";
import supertest from "supertest";
import __userFactory from "../factories/userFactory";

beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE users RESTART IDENTITY CASCADE;`;
});

describe("POST /sign-up", () => {
    it("should sucessfully register an user with valid password and create his account", async () => {
        const user = await __userFactory();

        const result = await supertest(app).post("/sign-up").send(user);

        const checkUser = await prisma.users.findUnique({where:{username:user.username}});4
        const checkAccount = await prisma.accounts.findFirst({orderBy:{id:'desc'}});

        expect(result.status).toBe(201);
        expect(checkUser.username).toEqual(user.username);
        expect(checkAccount.id).toEqual(checkUser.accountId);
    });

    it("should return error 409 when trying to register duplicate user", async () => {
        const user = await __userFactory();

        await supertest(app).post("/sign-up").send(user);

        const result = await supertest(app).post("/sign-up").send(user);

        console.log(result.text)

        expect(result.status).toBe(409);
    });
});

describe("POST /sign-in", () => {
    it("should sucessfully login a registered user", async () => {
        const user = await __userFactory();

        await supertest(app).post("/sign-up").send(user);

        const result = await supertest(app).post("/sign-in").send(user);

        expect(result.status).toBe(200);
        expect(result.text).not.toBeNull();
    });

    it("should return error 404 when trying to sign-in unregistered email", async () => {
        const user = await __userFactory();

        const result = await supertest(app).post("/sign-in").send(user);

        expect(result.status).toBe(404);
    });

    it("should return error 401 when password is incorrect", async () => {
        const user = await __userFactory();

        await supertest(app).post("/sign-up").send(user);

        const result = await supertest(app).post("/sign-in").send({
            username:user.username,
            password:"128731739B218A73921018237"
        });

        expect(result.status).toBe(401);
    });
});

afterAll( async () => {
    prisma.$disconnect();
});