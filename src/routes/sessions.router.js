import { Router } from 'express';
import { registerUser } from '../controllers/user.controller.js';
import { loginUser } from '../controllers/user.controller.js';
import passport from 'passport';
import { UserDTO } from '../dto/UserDTO.js';
import { forgotPassword } from '../controllers/password.controller.js';
const router = Router();


router.post('/register', registerUser);

router.post('/login', loginUser);

router.get('/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const userDTO = new UserDTO(req.user);
    res.json({ user: userDTO });
  }
);


router.post('/forgot-password', forgotPassword);

export default router;



