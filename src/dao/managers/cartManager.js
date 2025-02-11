import cartModel from './models/cartModel.js';
import { CartDTO } from '../dto/cartDTO.js';

export class CartManager {
    async createCart() {
        try {
            const newCart = new cartModel({ products: [] });
            await newCart.save();
            return new CartDTO(newCart);
        } catch (error) {
            throw new Error('Error al crear el carrito: ' + error.message);
        }
    }

    async getCartById(id) {
        try {
            const cart = await cartModel.findById(id).populate('products.product');
            if (!cart) return null;
            return new CartDTO(cart);
        } catch (error) {
            throw new Error('Error al obtener el carrito: ' + error.message);
        }
    }

    async addProductToCart(cartId, productId, quantity) {
        try {
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
        } catch (error) {
            throw new Error('Error al agregar producto al carrito: ' + error.message);
        }
    }

    async removeProductFromCart(cartId, productId) {
        try {
            const cart = await cartModel.findById(cartId);
            if (!cart) throw new Error('Carrito no encontrado');

            cart.products = cart.products.filter(p => p.product.toString() !== productId);
            await cart.save();
            return new CartDTO(cart);
        } catch (error) {
            throw new Error('Error al eliminar producto del carrito: ' + error.message);
        }
    }

    async clearCart(cartId) {
        try {
            const cart = await cartModel.findById(cartId);
            if (!cart) throw new Error('Carrito no encontrado');

            cart.products = [];
            await cart.save();
            return new CartDTO(cart);
        } catch (error) {
            throw new Error('Error al vaciar el carrito: ' + error.message);
        }
    }
}