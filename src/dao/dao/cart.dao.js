import cartModel from '../models/cartModel.js';
import CartDTO from '../dto/cart.dto.js';

export default class CartDAO {
    async createCart() {
        const newCart = new cartModel({ products: [] });
        await newCart.save();
        return new CartDTO(newCart);
    }

    async getCartById(id) {
        const cart = await cartModel.findById(id).populate('products.product');
        return cart ? new CartDTO(cart) : null;
    }

    async addProductToCart(cartId, productId, quantity) {
        const cart = await cartModel.findById(cartId);
        if (!cart) throw new Error('Carrito no encontrado');

        const productIndex = cart.products.findIndex(p => p.product.toString() === productId);
        if (productIndex !== -1) {
            cart.products[productIndex].quantity += quantity;
        } else {
            cart.products.push({ product: productId, quantity });
        }
        await cart.save();
        return new CartDTO(cart);
    }

    async removeProductFromCart(cartId, productId) {
        const cart = await cartModel.findById(cartId);
        if (!cart) throw new Error('Carrito no encontrado');

        cart.products = cart.products.filter(p => p.product.toString() !== productId);
        await cart.save();
        return new CartDTO(cart);
    }

    async clearCart(cartId) {
        const cart = await cartModel.findById(cartId);
        if (!cart) throw new Error('Carrito no encontrado');

        cart.products = [];
        await cart.save();
        return new CartDTO(cart);
    }
}