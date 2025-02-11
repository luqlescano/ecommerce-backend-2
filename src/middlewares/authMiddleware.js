import CartDAO from '../dao/dao/cart.dao.js';
import TicketDAO from '../dao/dao/ticket.dao.js';
import ProductDAO from '../dao/dao/product.dao.js';
import TicketDTO from '../dao/dto/ticket.dto.js';
import { v4 as uuidv4 } from 'uuid';

export default class CartRepository {
    constructor() {
        this.cartDAO = new CartDAO();
        this.ticketDAO = new TicketDAO();
        this.productDAO = new ProductDAO();
    }

    async getCartById(cartId) {
        return this.cartDAO.getCartById(cartId);
    }

    async addProductToCart(cartId, productId, quantity) {
        return this.cartDAO.addProductToCart(cartId, productId, quantity);
    }

    async removeProductFromCart(cartId, productId) {
        return this.cartDAO.removeProductFromCart(cartId, productId);
    }

    async clearCart(cartId) {
        return this.cartDAO.clearCart(cartId);
    }

    async finalizePurchase(cartId, purchaserEmail) {
        const cart = await this.cartDAO.getCartById(cartId);
        if (!cart) throw new Error('Carrito no encontrado');

        let totalAmount = 0;
        const purchasedProducts = [];
        const failedProducts = [];

        for (const item of cart.products) {
            const product = await this.productDAO.getProductById(item.productId);
            if (product.stock >= item.quantity) {
                product.stock -= item.quantity;
                await this.productDAO.updateProduct(product._id, { stock: product.stock });
                totalAmount += product.price * item.quantity;
                purchasedProducts.push(item);
            } else {
                failedProducts.push(item.productId);
            }
        }

        if (purchasedProducts.length > 0) {
            const ticketData = {
                code: uuidv4(),
                purchase_datetime: new Date(),
                amount: totalAmount,
                purchaser: purchaserEmail
            };
            const ticket = await this.ticketDAO.createTicket(ticketData);
            cart.products = cart.products.filter(item => failedProducts.includes(item.productId));
            await this.cartDAO.updateCart(cartId, cart);
            return new TicketDTO(ticket);
        }

        return { failedProducts };
    }
}

// authMiddleware.js
export const authMiddleware = (role) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: 'Usuario no autenticado' });
        }
        if (req.user.role !== role) {
            return res.status(403).json({ message: 'Acceso denegado' });
        }
        next();
    };
};