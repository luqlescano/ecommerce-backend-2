import productModel from '../models/productModel.js';

export default class ProductManager {
    async createProduct(productData) {
        try {
            const newProduct = new productModel(productData);
            await newProduct.save();
            return newProduct;
        } catch (error) {
            throw new Error('Error al crear el producto: ' + error.message);
        }
    }

    async getProductById(id) {
        try {
            const product = await productModel.findById(id);
            return product;
        } catch (error) {
            throw new Error('Error al obtener el producto: ' + error.message);
        }
    }

    async getAllProducts({ limit = 10, page = 1, sort, query }) {
        try {
            const filter = query ? { category: query } : {};
            const options = {
                limit,
                page,
                sort: sort ? { price: sort === 'asc' ? 1 : -1 } : {}
            };
            const products = await productModel.paginate(filter, options);
            return products;
        } catch (error) {
            throw new Error('Error al obtener los productos: ' + error.message);
        }
    }

    async updateProduct(id, updatedData) {
        try {
            const updatedProduct = await productModel.findByIdAndUpdate(id, updatedData, { new: true });
            return updatedProduct;
        } catch (error) {
            throw new Error('Error al actualizar el producto: ' + error.message);
        }
    }

    async deleteProduct(id) {
        try {
            const result = await productModel.findByIdAndDelete(id);
            return result;
        } catch (error) {
            throw new Error('Error al eliminar el producto: ' + error.message);
        }
    }
}