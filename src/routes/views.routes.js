import passport from 'passport';
import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.js';
import productModel from '../models/product.model.js';
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

router.get('/catalogo', authMiddleware, async (req, res) => {
  const productos = await productModel.find().lean(); 

  res.render('catalogo', {
    user: req.user,
    products: productos
  });
});


export default router;
