import { Router } from 'express';
import ProductModel from '../models/product.model.js';
import { authMiddleware } from '../middlewares/auth.js';

const router = Router();

// Ver todos los productos (solo si está logueado)
router.get('/', authMiddleware, async (req, res) => {
  const products = await ProductModel.find();
  res.render('products', { products });
});

export default router;

