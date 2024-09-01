import { ProductMongoRepository } from "../../product/repository/product-mongo.repository";
import { SaleMongoRepository } from "../repository/sale-mongo.repository";
import { SaleRequest } from "../types/types"

export class AddSaleUseCase {
    static async execute(params: SaleRequest): Promise<any> {
        const product = await ProductMongoRepository.findByParam("id", params.producto);

        if (!product) {
            throw new Error('Product not found')
        }

        if (params.monto <= 0 || params.cantidad <= 0) {
            throw new Error('Invalid params')
        }

        const saleSuccess = await SaleMongoRepository.addSale(params, product)
        if (!saleSuccess) {
            throw new Error('Sale failed')
        }

        const newStock = product.existencia - saleSuccess.cantidad;

        const updatedProduct = await ProductMongoRepository.updateProduct({ existencia: newStock }, product.id);
        if (!updatedProduct) {
            throw new Error('Product failed at update')
        }
        return saleSuccess;
    }
}