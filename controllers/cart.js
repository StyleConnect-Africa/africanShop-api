import Cart from '../model/Cart.js';

export const addItemToCart = async (req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.user._id;

    try {
        let cart = await Cart.findOne({ userId });

        // If cart doesn't exist, create one
        if (!cart) {
            cart = await Cart.create({ userId, items: [{ productId, quantity }] });
        } else {
            // Check if the product is already in the cart
            const existingItem = cart.items.find(item => item.productId.toString() === productId);

            if (existingItem) {
                // Update quantity
                existingItem.quantity += quantity;
            } else {
                // Add new item
                cart.items.push({ productId, quantity });
            }
        }

        // Update total price
        cart.totalPrice = calculateTotalPrice(cart.items); // Define this helper function
        await cart.save();

        res.status(200).json(cart);
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

        // Remove item
        cart.items = cart.items.filter(item => item.productId.toString() !== productId);

        // Update total price
        cart.totalPrice = calculateTotalPrice(cart.items); // Define this helper function
        await cart.save();

        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const clearCart = async (req, res) => {
    const userId = req.user._id;

    try {
        const cart = await Cart.findOneAndUpdate({ userId }, { items: [], totalPrice: 0 }, { new: true });
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
