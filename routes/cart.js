import express from 'express';
import { addItemToCart, getCartItems, removeItemFromCart, clearCart } from '../controllers/cart.js';
import { checkout } from '../controllers/checkout.js';
import { verifyVendor } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/add', verifyVendor, addItemToCart); // Add item to cart
router.get('/', verifyVendor, getCartItems); // Get cart items
router.post('/remove', verifyVendor, removeItemFromCart); // Remove item from cart
router.post('/clear', verifyVendor, clearCart); // Clear the cart
router.post('/checkout', verifyVendor, checkout); // Checkout

export default router;
