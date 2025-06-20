import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export default __dirname;

// Encriptar contraseña
export const createHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));

// Comparar contraseña con hash guardado
export const isValidPassword = (user, password) =>
  bcrypt.compareSync(password, user.password);

// Clave secreta JWT
export const PRIVATE_KEY = process.env.PRIVATE_KEY;

// Generar JWT (anidado bajo `user`)
export const generateJWToken = (user) => {
  return jwt.sign(
    {
      user: {
        _id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        age:user.age,
        role: user.role
      }
    },
    PRIVATE_KEY,
    { expiresIn: '24h' }
  );
};

//  Middleware para usar estrategia de Passport
export const passportCall = (strategy) => {
  return async (req, res, next) => {
    passport.authenticate(strategy, function (err, user, info) {
      if (err) return next(err);

      if (!user) {
        return res.status(401).send({
          error: (info && info.message) || 'Unauthorized'
        });
      }

      req.user = user; 
      next();
    })(req, res, next);
  };
};

//  Middleware de autorización por rol
export const authorization = (allowedRoles = []) => {
  return (req, res, next) => {
    if (!req.user)
      return res.status(401).send("Unauthorized: No user in request");

    if (!allowedRoles.includes(req.user.role))
      return res.status(403).send("Forbidden: Insufficient permissions");

    next();
  };
};


// Envío de mail para recuperación de contraseña
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
