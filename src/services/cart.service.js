import Cart from '../models/cart.model.js';

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
