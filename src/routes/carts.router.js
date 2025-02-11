import { Router } from 'express';
import CartRepository from '../dao/repositories/cart.repository.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = Router();
const cartRepository = new CartRepository();

router.get('/:cid', async (req, res) => {
    try {
        const cart = await cartRepository.getCartById(req.params.cid);
        if (!cart) {
            return res.status(404).json({ message: 'Carrito no encontrado' });
        }
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/:cid/products/:pid', authMiddleware('user'), async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const { quantity } = req.body;

        const updatedCart = await cartRepository.addProductToCart(cid, pid, quantity);
        res.json(updatedCart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/:cid/products/:pid', authMiddleware('user'), async (req, res) => {
    try {
        const { cid, pid } = req.params;

        const updatedCart = await cartRepository.removeProductFromCart(cid, pid);
        res.json(updatedCart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/:cid', authMiddleware('user'), async (req, res) => {
    try {
        await cartRepository.clearCart(req.params.cid);
        res.json({ message: 'Carrito vaciado correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/:cid/purchase', authMiddleware('user'), async (req, res) => {
    try {
        const { cid } = req.params;
        const purchaserEmail = req.user.email;

        const purchaseResult = await cartRepository.finalizePurchase(cid, purchaserEmail);
        res.json(purchaseResult);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;