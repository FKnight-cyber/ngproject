import { faker } from '@faker-js/faker';

export default async function __userFactory(){
    return {
        username: faker.name.firstName(),
        password: "1234567B",
    }
}