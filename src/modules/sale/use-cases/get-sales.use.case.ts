import { SaleMongoRepository } from "../repository/sale-mongo.repository";


export class GetSalesUseCase {
    static async execute() {
        return await SaleMongoRepository.getSales();
    }
}