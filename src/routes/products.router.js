import { Router } from 'express';
import ProductRepository from '../dao/repositories/product.repository.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = Router();
const productRepository = new ProductRepository();

router.get('/', async (req, res) => {
    try {
        const { limit = 10, page = 1, sort, category, stock } = req.query;
        const options = { limit: parseInt(limit), page: parseInt(page), sort, category, stock };

        const products = await productRepository.getProducts(options);
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:pid', async (req, res) => {
    try {
        const product = await productRepository.getProductById(req.params.pid);
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/', authMiddleware('admin'), async (req, res) => {
    try {
        const productData = req.body;
        const newProduct = await productRepository.createProduct(productData);
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/:pid', authMiddleware('admin'), async (req, res) => {
    try {
        const updatedProduct = await productRepository.updateProduct(req.params.pid, req.body);
        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/:pid', authMiddleware('admin'), async (req, res) => {
    try {
        await productRepository.deleteProduct(req.params.pid);
        res.json({ message: 'Producto eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;