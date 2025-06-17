import { Router } from 'express';
import { generatePets, generateUsers, generatePet, generateUser } from '../utils/mocking.js';
import { petsService, usersService } from '../services/index.js';
import { faker } from '@faker-js/faker';

const router = Router();

/**
 * @swagger
 * /api/mocks:
 *   get:
 *     summary: Página principal de la API de mocking
 *     description: Devuelve una lista de enlaces para generar mascotas o usuarios de prueba.
 *     tags: [Mocks]
 *     responses:
 *       200:
 *         description: Página HTML con enlaces a los mocks.
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 */
router.get('/', (req, res) => {
    res.send(`
        <h2>Mocking API</h2>
        <ul>
            <li><a href="/api/mocks/mockingpets">Generar 100 mascotas</a></li>
            <li><a href="/api/mocks/mockingusers">Generar 50 usuarios (mock)</a></li>
        </ul>
    `);
});

/**
 * @swagger
 * /api/mocks/mockingpets:
 *   get:
 *     summary: Generar 100 mascotas mock
 *     description: Devuelve un array con 100 mascotas generadas usando faker.
 *     tags: [Mocks]
 *     responses:
 *       200:
 *         description: Lista de mascotas generadas.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/mockingpets', (req, res) => {
    const pets = generatePets(100);
    res.json(pets);
});

/**
 * @swagger
 * /api/mocks/mockingusers:
 *   get:
 *     summary: Generar 50 usuarios mock
 *     description: Devuelve un array con 50 usuarios falsos generados.
 *     tags: [Mocks]
 *     responses:
 *       200:
 *         description: Lista de usuarios generados.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
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

/**
 * @swagger
 * /api/mocks/generateData:
 *   post:
 *     summary: Insertar datos de prueba en la base de datos
 *     description: Inserta una cantidad de usuarios y mascotas generados aleatoriamente en la base de datos.
 *     tags: [Mocks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               users:
 *                 type: integer
 *                 example: 10
 *               pets:
 *                 type: integer
 *                 example: 15
 *     responses:
 *       200:
 *         description: Datos insertados correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *       400:
 *         description: Faltan parámetros en el body.
 *       500:
 *         description: Error interno del servidor.
 */
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
