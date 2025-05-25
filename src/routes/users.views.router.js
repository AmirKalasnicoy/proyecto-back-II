import { Router } from 'express';
import { passportCall, authorization } from '../utils.js';

const router = Router();


// login
router.get('/login', (req, res) => {
  res.render('login');
});

// registro
router.get('/register', (req, res) => {
  res.render('register');
});

// perfil
router.get('/',
  passportCall('jwt'),
  authorization('user'), 
  (req, res) => {
    res.render('profile', {
      user: req.user
    });
  });

export default router;
