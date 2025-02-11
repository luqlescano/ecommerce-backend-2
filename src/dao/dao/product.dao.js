import productModel from '../models/productModel.js';
import ProductDTO from '../dto/product.dto.js';

export default class ProductDAO {
    async getAllProducts(filter = {}, options = {}) {
        const products = await productModel.find(filter).limit(options.limit).skip(options.page * options.limit).sort(options.sort);
        return products.map(product => new ProductDTO(product));
    }

    async getProductById(id) {
        const product = await productModel.findById(id);
        return product ? new ProductDTO(product) : null;
    }

    async createProduct(productData) {
        const newProduct = new productModel(productData);
        await newProduct.save();
        return new ProductDTO(newProduct);
    }

    async updateProduct(id, productData) {
        const updatedProduct = await productModel.findByIdAndUpdate(id, productData, { new: true });
        return updatedProduct ? new ProductDTO(updatedProduct) : null;
    }

    async deleteProduct(id) {
        const deletedProduct = await productModel.findByIdAndDelete(id);
        return deletedProduct ? new ProductDTO(deletedProduct) : null;
    }
}