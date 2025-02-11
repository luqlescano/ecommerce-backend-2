export default class ProductDTO {
    constructor(product) {
        this.id = product._id;
        this.title = product.title;
        this.description = product.description;
        this.price = product.price;
        this.category = product.category;
        this.stock = product.stock;
        this.thumbnail = product.thumbnail;
        this.code = product.code;
    }
}