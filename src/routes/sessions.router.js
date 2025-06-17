import { Router } from 'express';
import sessionsController from '../controllers/sessions.controller.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Sessions
 *   description: Endpoints para autenticación y sesión de usuario
 */

/**
 * @swagger
 * /api/sessions/register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags: [Sessions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - first_name
 *               - email
 *               - password
 *             properties:
 *               first_name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: Usuario registrado exitosamente
 *       400:
 *         description: Datos inválidos o usuario ya existe
 */
router.post('/register', sessionsController.register);
/**
 * @swagger
 * /api/sessions/login:
 *   post:
 *     summary: Iniciar sesión
 *     tags: [Sessions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: Login exitoso, devuelve token
 *       401:
 *         description: Credenciales inválidas
 */
router.post('/login', sessionsController.login);

/**
 * @swagger
 * /api/sessions/current:
 *   get:
 *     summary: Obtener información del usuario autenticado
 *     tags: [Sessions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Usuario autenticado
 *       401:
 *         description: No autorizado
 */
router.get('/current', sessionsController.current);

/**
 * @swagger
 * /api/sessions/unprotectedLogin:
 *   post:
 *     summary: Login sin protección (para pruebas)
 *     tags: [Sessions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: Usuario autenticado sin protección
 *       400:
 *         description: Error por valores incompletos o contraseña incorrecta
 */
router.post('/unprotectedLogin', sessionsController.unprotectedLogin);

/**
 * @swagger
 * /api/sessions/unprotectedCurrent:
 *   get:
 *     summary: Obtener usuario actual sin autenticación (para pruebas)
 *     tags: [Sessions]
 *     responses:
 *       200:
 *         description: Usuario obtenido sin necesidad de autenticación
 */
router.get('/unprotectedCurrent', sessionsController.unprotectedCurrent);

export default router;
