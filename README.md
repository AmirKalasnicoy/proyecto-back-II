# 🛒 Proyecto Backend - Coderhouse (Entrega Final)

Este proyecto es una API RESTful de ecommerce desarrollada en Node.js utilizando Express, MongoDB y Passport con autenticación JWT, implementando arquitectura profesional basada en DAO, Repository y DTO.

---

## ✅ Tecnologías y dependencias

- Node.js
- Express
- MongoDB + Mongoose
- Passport (estrategias register, login, jwt)
- JWT (jsonwebtoken)
- Cookies firmadas con cookie-parser
- bcrypt
- dotenv
- nodemailer
- express-session + session-file-store
- express-handlebars

---

## 📁 Estructura del proyecto

```
src/
├── config/               # Configuración de Passport y Mongo
├── controllers/          # Lógica de rutas
├── dao/                  # DAO implementado para usuarios
├── dto/                  # DTOs para limpieza de datos
├── helpers/              # Funciones utilitarias
├── middlewares/          # Middlewares de autenticación y autorización
├── models/               # Schemas de Mongoose
├── public/               # JS para vistas
├── repository/           # Repository con userRepository conectado a DAO
├── routes/               # Rutas agrupadas por función
├── services/             # Lógica de negocio
├── views/                # Handlebars (login, registro, perfil, catálogo)
├── app.js                # Entry point del servidor
└── utils.js              # Funciones JWT, hashing, mail, etc.
```

---

## 🔐 Autenticación y roles

- Login con JWT guardado en cookie firmada
- Middleware `passportCall('jwt')` para proteger rutas
- Middleware `authorization(role)` para validar permisos según rol
- Ruta `/api/sessions/current` devuelve un DTO del usuario logueado

---

## 📦 Productos

- Listado general de productos en `/catalogo` (solo logueados)
- Formulario de creación en `/catalogo/create` (solo para `admin`)
- Solo `admin` puede crear productos (autorización aplicada)

---

## 🛒 Carrito y compras

- Usuarios pueden agregar productos a su carrito
- Ruta `POST /api/carts/:cid/purchase`:
    - Verifica stock
    - Descuenta productos comprados
    - Genera un `Ticket` con fecha, código, amount y email del comprador

---

## 📨 Recuperación de contraseña

- Ruta que envía un email con link para restablecer la contraseña
- El link expira a la hora
- Se impide restablecer la misma contraseña anterior

---

## 🧱 Arquitectura profesional

- DAO aplicado en módulo `User` (user.dao.js)
- `userRepository` usa DAO internamente para cumplir el patrón Repository
- `UserDTO` implementado para limpiar datos antes de devolverlos


// UserDTO ejemplo
{
  name: 'Amir Kalasnicoy',
  email: 'amirkalasnicoy1812@gmail.com',
  age: 24,
  role: 'admin'
}


---

## 🧪 Variables de entorno (`.env` necesario)


PORT=9090
MONGO_URI=tu_url_de_mongo
PRIVATE_KEY=clave_jwt
GMAIL_USER=tu_usuario@gmail.com
GMAIL_PASS=tu_contraseña_app


---

## 🚀 Comandos para ejecutar


npm install       # Instala dependencias
npm run start     # Inicia el servidor (usa src/app.js)


## 👨‍💻 Autor

**Amir Kalasnicoy**

Backend Developer - Proyecto Final Coderhouse 2025