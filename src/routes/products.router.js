import { Router } from 'express';
import ProductModel from '../models/product.model.js';
import { authMiddleware } from '../middlewares/auth.js';
import { authorize } from '../middlewares/authorize.js';

const router = Router();

//  Ver todos los productos (usuarios logueados)
router.get('/catalogo', authMiddleware, async (req, res) => {
  const products = await ProductModel.find();
  res.render('products', { products, user: req.user }); 
});

//  Formulario para crear productos (solo admin)
router.get('/create', authMiddleware, authorize('admin'), (req, res) => {
  res.render('createProduct');
});

// Crear producto (solo admin)
router.post('/create', authMiddleware, authorize('admin'), async (req, res) => {
  const { nombre,precio,stock,imagen } = req.body;

  try {
    await ProductModel.create({ nombre,precio,stock,imagen});
    res.redirect('/catalogo');
  } catch (error) {
    console.error('Error al crear producto:', error);
    res.status(500).send('Error al crear producto');
  }
});

export default router;




