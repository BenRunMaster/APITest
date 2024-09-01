import { Request } from "express";
import { ProductMongoRepository } from "../repository/product-mongo.repository";

export class UpdateProductUseCase {
    static async execute(req: Request): Promise<any> {
        if (!req.body || !req.params.idProducto) {
            throw new Error('Empty fields')
        }

        return await ProductMongoRepository.updateProduct(req.body, parseInt(req.params.idProducto));
    }
}