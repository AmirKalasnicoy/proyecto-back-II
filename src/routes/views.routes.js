import passport from 'passport';
import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.js';
const router = Router();

router.get('/', (req, res) => {
  res.render('index'); 
});
router.get('/login',(req,res)=>{
  res.render('login');
})
router.get('/reset-password', (req, res) => {
  const { token } = req.query;
  res.render('reset-password', { token });
});

router.get(
  '/catalogo',
  passport.authenticate('jwt', { session: false }), 
  authMiddleware,
  (req, res) => {
    res.render('catalogo', { user: req.user });
  }
);


export default router;
