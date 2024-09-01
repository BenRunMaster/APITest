import { ProductMongoRepository } from "../repository/product-mongo.repository";

export class GetProductsUseCase {
    static async execute() {
        return await ProductMongoRepository.getProducts();
    }
}