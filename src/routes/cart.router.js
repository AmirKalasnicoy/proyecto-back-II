import { Router } from 'express';
import { addToCart, getCartByUserId } from '../services/cart.service.js';
import { authMiddleware } from '../middlewares/auth.js';

const router = Router();

router.post('/add', authMiddleware, async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user._id;

  try {
    await addToCart(userId, productId, quantity);
    res.redirect('/catalogo');
  } catch (error) {
    res.status(500).send('Error al agregar al carrito');
  }
});

router.get('/', authMiddleware, async (req, res) => {
  const userId = req.user._id;

  try {
    const cart = await getCartByUserId(userId);
    res.render('cart', { cart });
  } catch (error) {
    res.status(500).send('Error al cargar el carrito');
  }
});

export default router;

