import { Request, Response } from "express";
import { GetSalesUseCase } from "../use-cases";
import { AddSaleUseCase } from "../use-cases/add-sale.use-case";
export class SaleController {
    static async getSales(req: Request, res: Response) {
        try {
            const data = await GetSalesUseCase.execute();

            res.status(200).json({
                status: 200,
                data,
                message: 'All sales'
            })
        } catch (error) {
            res.status(400).json({
                status: 400,
                message: error
            })
        }
    }

    static async addSale(req: Request, res: Response) {
        try {
            const data = await AddSaleUseCase.execute(req.body);

            res.status(200).json({
                status: 200,
                data,
                message: 'Sale added successfully'
            })
        } catch (error) {
            res.status(400).json({
                status: 400,
                message: error
            })
        }
    }
}