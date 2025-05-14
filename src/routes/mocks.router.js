import { Router } from 'express';
import { generatePets, generateUsers, generatePet, generateUser } from '../utils/mocking.js';
import { petsService, usersService } from '../services/index.js';
import { faker } from '@faker-js/faker';

const router = Router();

router.get('/', (req, res) => {
    res.send(`
        <h2>Mocking API</h2>
        <ul>
            <li><a href="/api/mocks/mockingpets">Generar 100 mascotas</a></li>
            <li><a href="/api/mocks/mockingusers">Generar 50 usuarios (mock)</a></li>
        </ul>
    `);
});

router.get('/mockingpets', (req, res) => {
    const pets = generatePets(100);
    res.json(pets);
});

router.get('/mockingusers', (req, res) => {
    const users = generateUsers(50).map(user => {
        return {
            _id: faker.database.mongodbObjectId(),
            ...user,
            __v: 0
        };
    });
    res.json(users);
});

router.post('/generateData', async (req, res) => {
    try {
        const { users, pets } = req.body;
        if (!users || !pets) {
            return res.status(400).send({ status: 'error', error: 'Missing users or pets parameter' });
        }

        for (let i = 0; i < users; i++) {
            const user = generateUser();
            await usersService.create(user);
        }

        for (let i = 0; i < pets; i++) {
            const pet = generatePet();
            await petsService.create(pet);
        }

        res.send({ status: 'success', message: 'Data generated and inserted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ status: 'error', error: 'Internal server error' });
    }
});

export default router;
