import { v4 as uuidv4 } from 'uuid';
import Cart from '../models/cart.model.js';
import ProductModel from '../models/product.model.js';
import Ticket from '../models/ticket.model.js';

export const getCartByUserId = async (userId) => {
  return await Cart.findOne({ userId }).populate('products.productId');
};

export const addToCart = async (userId, productId, quantity = 1) => {
  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = new Cart({ userId, products: [{ productId, quantity }] });
  } else {
    const productIndex = cart.products.findIndex(p => p.productId.equals(productId));
    if (productIndex > -1) {
      cart.products[productIndex].quantity += quantity;
    } else {
      cart.products.push({ productId, quantity });
    }
  }

  return await cart.save();
};

export const purchaseCart  = async (userId, userEmail) => {
  const cart = await getCartByUserId(userId);
  if (!cart || cart.products.length === 0) {
    throw new Error('El carrito está vacío');
  }

  let totalAmount = 0;

  for (const item of cart.products) {
    const product = await ProductModel.findById(item.productId._id);
    if (!product || product.stock < item.quantity) {
      throw new Error(`Stock insuficiente para el producto: ${product?.nombre || 'desconocido'}`);
    }

    product.stock -= item.quantity;
    await product.save();

    totalAmount += product.precio * item.quantity;
  }

  const ticket = new Ticket({
    code: uuidv4(),
    purchase_datetime: new Date(),
    amount: totalAmount,
    purchaser: userEmail
  });

  await ticket.save();

  cart.products = [];
  await cart.save();

  return ticket;
};
