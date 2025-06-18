import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

//.env
dotenv.config();
// __dirname para rutas y vistas
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export default __dirname;

// 🔐 Encriptar contraseña
export const createHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));

// Comparar contraseña con hash guardado
export const isValidPassword = (user, password) =>
  bcrypt.compareSync(password, user.password);

// Clave secreta para JWT
export const PRIVATE_KEY = process.env.PRIVATE_KEY

// Generar JWT (se guarda en cookie firmada)
export const generateJWToken = (user) => {
  return jwt.sign(
    {
      user: {
        _id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        role: user.role
      }
    },
    PRIVATE_KEY,
    { expiresIn: '24h' }
  );
};


// Middleware de autenticación con Passport
export const passportCall = (strategy) => {
  return async (req, res, next) => {
    passport.authenticate(strategy, function (err, user, info) {
      if (err) return next(err);

      if (!user) {
        return res.status(401).send({
          error: info?.messages || info.toString(),
        });
      }

      req.user = user;
      next();
    })(req, res, next);
  };
};

//  Middleware para verificar roles
export const authorization = (role) => {
  return (req, res, next) => {
    if (!req.user)
      return res.status(401).send("Unauthorized: No user in request");

    if (req.user.role !== role)
      return res.status(403).send("Forbidden: Insufficient permissions");

    next();
  };
};

export const sendRecoveryEmail = async (email, token) => {
  const resetLink = `http://localhost:9090/api/sessions/reset-password?token=${token}`;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS, 
    },
  });

  await transporter.sendMail({
    from: 'CoderApp <no-reply@coder.com>',
    to: email,
    subject: 'Restablecer contraseña',
    html: `
      <p>Hacé clic en el siguiente enlace para restablecer tu contraseña:</p>
      <a href="${resetLink}">${resetLink}</a>
    `,
  });
};
