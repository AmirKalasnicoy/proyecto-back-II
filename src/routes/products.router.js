import { Router } from 'express';
import ProductModel from '../models/product.model.js';
import { authMiddleware } from '../middlewares/auth.js';
import { authorize } from '../middlewares/authorize.js'; // 👈 Asegurate de importar esto

const router = Router();

// Ver todos los productos (solo logueado)
router.get('/', authMiddleware, async (req, res) => {
  const products = await ProductModel.find();
  res.render('products', { products });
});

// Mostrar formulario de creación (solo admin)
router.get('/create', authMiddleware, authorize('admin'), (req, res) => {
  res.render('createProduct'); // renderiza la vista createProduct.handlebars
});

// Crear producto (solo admin)
router.post('/create', authMiddleware, authorize('admin'), async (req, res) => {
  const { title, description, price } = req.body;

  try {
    const newProduct = await ProductModel.create({ title, description, price });
    res.status(201).json({ message: 'Producto creado correctamente', newProduct });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear producto' });
  }
});


export default router;



