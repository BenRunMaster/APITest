import { ProductMongoRepository } from "../repository/product-mongo.repository";
import { ProductRequest } from "../types/types";

export class AddProductUseCase {
    static async execute(params: ProductRequest): Promise<any> {
        if (!params.codigo || !params.producto) {
            throw new Error('Empty fields')
        }

        if (!params.precio_unitario || params.precio_unitario <= 0) {
            throw new Error('Wrong field "Precio unitario"')
        }

        if (!params.descuento || params.descuento <= 0) {
            params.descuento = 0
        }

        if (!params.existencia || params.existencia <= 0) {
            params.existencia = 1
        }

        if (!params.activo) {
            params.activo = true
        }


        return await ProductMongoRepository.addProduct(params);
    }
}