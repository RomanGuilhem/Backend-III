import { faker } from '@faker-js/faker';
import { hashSync } from 'bcrypt';

const generatePet = () => {
    return {
        name: faker.animal.dog(), 
        specie: faker.helpers.arrayElement(['dog', 'cat', 'rabbit', 'bird']), 
        age: faker.number.int({ min: 1, max: 15 }),
        adopted: false,
    };
};

const generatePets = (quantity) => {
    const pets = [];
    for (let i = 0; i < quantity; i++) {
        pets.push(generatePet());
    }
    return pets;
};

const generateUser = () => {
    const role = faker.helpers.arrayElement(['user', 'admin']);
    return {
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        password: hashSync('coder123', 10),
        role: role,
        pets: [], 
    };
};

const generateUsers = (quantity) => {
    const users = [];
    for (let i = 0; i < quantity; i++) {
        users.push(generateUser());
    }
    return users;
};

export { generatePets, generateUsers, generatePet, generateUser };
