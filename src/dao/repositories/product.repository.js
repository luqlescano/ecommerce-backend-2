import ProductDAO from '../dao/product.dao.js';

export default class ProductRepository {
    constructor() {
        this.productDAO = new ProductDAO();
    }

    async createProduct(productData) {
        return await this.productDAO.createProduct(productData);
    }

    async getProductById(id) {
        return await this.productDAO.getProductById(id);
    }

    async getAllProducts(filters = {}) {
        return await this.productDAO.getAllProducts(filters);
    }

    async updateProduct(id, productData) {
        return await this.productDAO.updateProduct(id, productData);
    }

    async deleteProduct(id) {
        return await this.productDAO.deleteProduct(id);
    }
}