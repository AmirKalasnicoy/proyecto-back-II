import { Router } from 'express';
import { addToCart, getCartByUserId, purchaseCart } from '../services/cart.service.js';
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

router.post('/checkout', authMiddleware, async (req, res) => {
  const userId = req.user._id;
  const userEmail = req.user.email;

  try {
    const ticket = await purchaseCart (userId, userEmail);

    res.status(200).json({
      message: '¡Compra finalizada con éxito!',
      ticket: {
        code: ticket.code,
        amount: ticket.amount,
        date: ticket.purchase_datetime,
      }
    });
  } catch (error) {
    console.error('Error al finalizar la compra:', error.message);
    res.status(500).json({ message: error.message || 'Error al finalizar la compra' });
  }
});



export default router;

