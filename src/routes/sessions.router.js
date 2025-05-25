import { Router } from 'express';
import userModel from '../models/user.model.js';
import { createHash } from '../utils.js'; 

const router = Router();

//  Ruta: POST /api/sessions/register
router.post('/register', async (req, res) => {
  const { first_name, last_name, email, age, password } = req.body;

  try {
    // Verificar si el usuario ya existe
    const exist = await userModel.findOne({ email });
    if (exist) {
      return res.status(400).send({
        status: 'error',
        message: 'User already exists',
      });
    }

    // Crear nuevo usuario con contraseña encriptada
    const newUser = {
      first_name,
      last_name,
      email,
      age,
      password: createHash(password),
    };

    const result = await userModel.create(newUser);

    return res.status(201).send({
      status: 'success',
      message: 'User registered successfully',
      payload: result,
    });

  } catch (error) {
    console.error("Error in /register:", error);
    return res.status(500).send({
      status: 'error',
      message: 'Internal server error',
    });
  }
});

//login
import passport from 'passport';
import { generateJWToken } from '../utils.js';

router.post('/login', passport.authenticate('login', { session: false }), async (req, res) => {
  try {
    const user = req.user;
    const token = generateJWToken(user);

    res.cookie('jwtCookieToken', token, {
      httpOnly: true,
      signed: true,
    });

    res.send({ status: "success", message: "Login successful" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: "error", message: "Login failed" });
  }
});



export default router;

