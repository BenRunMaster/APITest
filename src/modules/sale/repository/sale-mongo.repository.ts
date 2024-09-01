import { saleModel } from "../model/sale.model";
import { ProductDate, SaleRequest } from "../types/types";

export class SaleMongoRepository {
    static async getSales(): Promise<any> {
        try {
            const sales = await saleModel.find();
            return sales;
        } catch (error) {
            console.log('Error at find sales :', error);
        }
    }

    static async addSale(params: SaleRequest, product: ProductDate): Promise<any> {
        try {
            const sales = await saleModel.find();
            const id = sales.length + 1;
            const sale = new saleModel({
                id,
                producto: product.producto,
                cantidad: params.cantidad,
                monto: params.monto,
                id_producto: product.id
            });
            await sale.save();
            return sale;
        } catch (error) {
            console.log('Error at find products :', error);
        }
    }



}