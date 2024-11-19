import express from 'express';
import { addItemToCart, getCartItems, removeItemFromCart, clearCart } from '../controllers/cart.js';
import { checkout } from '../controllers/checkout.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import { validateAddToCart } from '../validators/cartValidator.js';

const router = express.Router();

router.post("/add", authMiddleware(["user"]),validateAddToCart, addItemToCart); // Add item to cart
router.get('/',authMiddleware(['user']), getCartItems); // Get cart items
router.post('/remove', authMiddleware(['user']), removeItemFromCart); // Remove item from cart
router.post('/clear', authMiddleware(['user']), clearCart); // Clear the cart
router.post('/checkout', authMiddleware(['user']), checkout); // Checkout

export default router;
