import { jest } from "@jest/globals";
import authRepository from "../../src/repositories/authRepository";
import authServices from "../../src/services/authService";
import { Users } from "@prisma/client";
import __userFactory  from "../factories/userFactory";
import * as utils from "../../src/utils/authUtils";

jest.mock("../../src/repositories/authRepository.ts");

beforeEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
});

describe("Authenticaton service suit test", () => {
    it("should successfully register an user",async () => {
        const user = await __userFactory();

        jest.spyOn(authRepository, "findUserByName").mockImplementationOnce(():any => {
            return false
        });

        await authServices.registerUser(user);

        expect(authRepository.insert).toBeCalled();
    });

    it("should fail to register duplicate user", async () => {
        const user = await __userFactory();

        const registeredUser:Users = {
            id:1,
            username: "fulanodetal",
            password: "1234567B",
            accountId: 1
        };

        jest.spyOn(authRepository, "findUserByName").mockImplementationOnce(async ():Promise<Users> => {
            return registeredUser;
        });

        const result = authServices.registerUser(user);

        expect(result).rejects.toEqual({
            status:409,
            message: "Username already registered!"
        });
    });

    it("should successfully sign-in a registered user", async () => {
        const registeredUser:Users = {
            id:1,
            username: "fulanodetal",
            password: "1234567B",
            accountId: 1
        };

        jest.spyOn(authRepository, "findUserByName").mockImplementationOnce(async ():Promise<Users> => {
            return registeredUser;
        });

        jest.spyOn(utils, "decrypt").mockImplementationOnce(():any => {
            return true;
        });

        jest.spyOn(utils, "generateUserToken").mockImplementationOnce(():any => {
            return "minhatoken";
        });

        const result = await authServices.login({
            username:registeredUser.username, 
            password:registeredUser.password
        });

        expect(result).toBe("minhatoken");
    });

    it("should fail to sign-in unregistered user", () => {
        jest.spyOn(authRepository, "findUserByName").mockImplementationOnce(():any => {
            return null;
        });

        const result = authServices.login({
            username:"elonmusk", 
            password:"Dinheiro6"
        });

        expect(result).rejects.toEqual({
            status:404,
            message: "User not registered!"
        });
    });

    it("should fail to sign-in registered user with invalid password", () => {
        const registeredUser:Users = {
            id:1,
            username: "fulanodetal",
            password: "1234567B",
            accountId: 1
        };

        jest.spyOn(authRepository, "findUserByName").mockImplementationOnce(():any => {
            return registeredUser;
        });

        jest.spyOn(utils, "decrypt").mockImplementationOnce(():any => {
            return false;
        });

        const result = authServices.login({
            username:registeredUser.username, 
            password:registeredUser.password
        });

        expect(result).rejects.toEqual({
            status:401,
            message: "Wrong password!"
        });
    });
});

afterAll(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
});