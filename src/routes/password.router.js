import { Router } from 'express';
import jwt from 'jsonwebtoken';
import userModel from '../models/user.model.js';
import { PRIVATE_KEY, isValidPassword, createHash } from '../utils.js';
import { forgotPassword } from '../controllers/password.controller.js';

const router = Router(); 


router.get('/forgot-password', (req, res) => {
  res.render('forgot-password'); 
});
router.get('/reset-password', (req, res) => {
const { token } = req.query;
if (!token) return res.status(400).send("Token faltante");
res.render('reset-password', { token });
});

router.post('forgot-password',forgotPassword)

// Endpoint para recibir nueva contraseña
router.post('/reset-password', async (req, res) => {
  const { token, password } = req.body;
  try {
    const decoded = jwt.verify(token, PRIVATE_KEY);
    const user = await userModel.findOne({ email: decoded.email });

    if (!user) return res.status(404).send("Usuario no encontrado");

    const samePassword = isValidPassword(user, password);
    if (samePassword)
      return res.send("No podés usar la misma contraseña anterior");

    user.password = createHash(password);
    await user.save();

    res.send("Contraseña actualizada correctamente");
  } catch (error) {
    console.error("Error al restablecer contraseña:", error);
    res.status(400).send("Token inválido o expirado");
  }
});



export default router;

