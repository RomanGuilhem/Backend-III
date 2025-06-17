import { Router } from 'express';
import adoptionsController from '../controllers/adoptions.controller.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Adoptions
 *   description: Endpoints para gestionar adopciones
 */

/**
 * @swagger
 * /api/adoptions:
 *   get:
 *     summary: Obtener todas las adopciones
 *     tags: [Adoptions]
 *     responses:
 *       200:
 *         description: Lista de adopciones obtenida correctamente
 */
router.get('/', adoptionsController.getAllAdoptions);

/**
 * @swagger
 * /api/adoptions/{aid}:
 *   get:
 *     summary: Obtener una adopción por ID
 *     tags: [Adoptions]
 *     parameters:
 *       - in: path
 *         name: aid
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la adopción
 *     responses:
 *       200:
 *         description: Adopción encontrada
 *       404:
 *         description: Adopción no encontrada
 */
router.get('/:aid', adoptionsController.getAdoption);

/**
 * @swagger
 * /api/adoptions/{uid}/{pid}:
 *   post:
 *     summary: Crear una nueva adopción
 *     tags: [Adoptions]
 *     parameters:
 *       - in: path
 *         name: uid
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *       - in: path
 *         name: pid
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la mascota
 *     responses:
 *       200:
 *         description: Adopción creada exitosamente
 *       400:
 *         description: Error en los datos enviados
 */
router.post('/:uid/:pid', adoptionsController.createAdoption);

export default router;
