import Cart from '../model/Cart.js';

export const checkout = async (req, res) => {
    const userId = req.user._id;

    try {
        const cart = await Cart.findOne({ userId }).populate('items.productId');
        if (!cart || cart.items.length === 0) return res.status(400).json({ message: 'Cart is empty' });

        // Perform payment integration here (e.g., Stripe, Paystack)

        // Clear the cart after successful payment
        cart.items = [];
        cart.totalPrice = 0;
        await cart.save();

        res.status(200).json({ message: 'Checkout successful and cart cleared' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
