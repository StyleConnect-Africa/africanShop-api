import Cart from '../model/Cart.js';
import { calculateTotalPrice } from '../utils/cartUtils.js';
export const addItemToCart = async (req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.user._id;

    try {
        let cart = await Cart.findOne({ userId }).populate('items.productId');

        if (!cart) {
            cart = await Cart.create({ userId, items: [{ productId, quantity }] });
            cart = await Cart.findOne({ userId }).populate('items.productId');
        } else {
            const existingItem = cart.items.find(item => item.productId.toString() === productId);

            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                cart.items.push({ productId, quantity });
            }
        }

        cart.totalPrice = calculateTotalPrice(cart.items);
        await cart.save();

        res.status(200).json({ message: "Item added to cart successfully", cart });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const getCartItems = async (req, res) => {
    const userId = req.user._id;

    try {
        const cart = await Cart.findOne({ userId }).populate('items.productId');
        if (!cart) return res.status(404).json({ message: 'Cart is empty' });

        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const removeItemFromCart = async (req, res) => {
    const { productId } = req.body;
    const userId = req.user._id;

    try {
        const cart = await Cart.findOne({ userId });
        if (!cart) return res.status(404).json({ message: 'Cart not found' });

        cart.items = cart.items.filter(item => item.productId.toString() !== productId);

        cart.totalPrice = calculateTotalPrice(cart.items);
        await cart.save();

        res.status(200).json({ message: "Item removed from cart successfully", cart });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const clearCart = async (req, res) => {
    const userId = req.user._id;

    try {
        const cart = await Cart.findOneAndUpdate({ userId }, { items: [], totalPrice: 0 }, { new: true });
        res.status(200).json({ message: "Cart cleared successfully", cart });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
