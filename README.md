# AdoptMe - Proyecto Final Backend Coderhouse

Este es un proyecto backend desarrollado como entrega final del curso **Backend III** de Coderhouse.  
El sistema permite gestionar usuarios, mascotas, adopciones, autenticación, documentación de API, testing funcional y despliegue con Docker.

---

## Tecnologías utilizadas

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT + Passport
- Multer (subida de imágenes)
- Docker
- Swagger (documentación de API)
- Supertest + Mocha + Chai (tests funcionales e integración)

---

## Instalación local

### 1. Clonar el repositorio

```bash
git clone https://github.com/RomanGuilhem/Backend-III.git
cd Backend-III

### 2. Instala las dependencias
npm install

### 3. Configurar variables de entorno
Crear un archivo .env con el siguiente contenido:
.env:
PORT=3000
MONGO_DB_URL=mongodb+srv://romanguilhem:12345678910@cluster0.yqtt1s2.mongodb.net/mongoBackend?authMechanism=DEFAULT

### 4. Ejecutar en modo desarrollo
npm run dev

## Documentación Swagger

El proyecto incluye documentación interactiva de la API generada con Swagger.

Una vez levantado el servidor, podés acceder desde:
http://localhost:3000/api/docs


### Endpoints documentados:

- Autenticación
  - `/api/sessions/register`
  - `/api/sessions/login`
  - `/api/sessions/current`
  - `/api/sessions/unprotectedLogin`
  - `/api/sessions/unprotectedCurrent`

- Usuarios
  - `/api/users`
  - `/api/users/:uid`

- Mascotas
  - `/api/pets`
  - `/api/pets/:pid`
  - `/api/pets/withimage`

- Adopciones
  - `/api/adoptions`
  - `/api/adoptions/:aid`
  - `/api/adoptions/:uid/:pid`

---

## Scripts disponibles

 Testing funcional (Mocha + Supertest)
npm test
Asegurate de tener la variable MONGO_DB_URL configurada correctamente para que los tests funcionen

## Docker

### Crear imagen Docker

Para generar la imagen Docker del proyecto localmente:

```bash
docker build -t romanguilhem/adoptmeproyecto-backend:latest .

Subir imagen a DockerHub
docker push romanguilhem/adoptmeproyecto-backend:latest

asegurate de estar previamente logeado con:
docker login

Ejecutar contenedor local
docker run -p 3000:3000 romanguilhem/adoptmeproyecto-backend:latest

Imagen publicada en DockerHub
https://hub.docker.com/r/romanguilhem/adoptmeproyecto-backend/tags

### Testing

Este proyecto cuenta con:

- **Tests funcionales** para endpoints relacionados con adopciones.
- **Tests de integración** para operaciones sobre usuarios.
- **Validaciones DAO** mediante pruebas unitarias.

### Ejecutar tests:

```bash
npm test

{
  "first_name": "ejemplo",
  "email": "usuario@ejemplo.com",
  "password": "1234"
}

## Autor
Román Guilhem
Proyecto final para Backend III en Coderhouse.
Repositorio: GitHub - RomanGuilhem/Backend-III
Imagen Docker: romanguilhem/adoptmeproyecto-backend

## Resumen
Este proyecto simula el backend de una plataforma de adopción de mascotas con autenticación, manejo de usuarios, adopciones, carga y consulta de mascotas, todo documentado con Swagger, contenedorizado con Docker y testeado con Mocha y Supertest.
