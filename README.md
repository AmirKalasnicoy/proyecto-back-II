# 🛒 Pre-entrega Proyecto Final - Backend Coderhouse

## 📌 Descripción
Proyecto backend de ecommerce con sistema de registro y login de usuarios, utilizando autenticación JWT, cookies firmadas y roles.

## ⚙️ Tecnologías
- Node.js
- Express
- MongoDB Atlas
- Mongoose
- Passport.js (estrategias `register`, `login`, `jwt`)
- bcrypt
- JWT (jsonwebtoken)
- express-session / cookie-parser
- Handlebars (como motor de vistas)

## 🔐 Funcionalidades Implementadas

- [x] Modelo de usuario con los campos requeridos
- [x] Registro de usuarios con encriptación (bcrypt)
- [x] Login con autenticación local y generación de JWT
- [x] Middleware de autenticación y autorización por rol
- [x] Rutas protegidas con `passportCall('jwt')`
- [x] Cookies firmadas para guardar el token
- [x] Vistas con Handlebars: login, registro y perfil

## 📂 Estructura del proyecto
/src
├── config/
├── models/
├── public/js/
├── routes/
├── views/
├── utils.js
├── app.js

## 🧪 Para probar

1. `npm install`
2. Variables de entorno requeridas (.env)
PORT
MONGO_URL
PRIVATE_KEY
