import { Request } from "express";
import { ProductMongoRepository } from "../repository/product-mongo.repository";

export class DeleteProductUseCase {
    static async execute(req: Request): Promise<any> {
        if (!req.params.idProducto) {
            throw new Error('Empty id')
        }

        return await ProductMongoRepository.deleteProduct(parseInt(req.params.idProducto));
    }
}