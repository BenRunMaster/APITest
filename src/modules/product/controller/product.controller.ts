import { Request, Response } from "express";
import { AddProductUseCase, DeleteProductUseCase, GetProductsUseCase, UpdateProductUseCase } from "../use-cases";
export class ProductController {
    static async getProducts(req: Request, res: Response) {
        try {
            const data = await GetProductsUseCase.execute();

            res.status(200).json({
                status: 200,
                data,
                message: 'All products'
            })
        } catch (error) {
            res.status(400).json({
                status: 400,
                message: error
            })
        }
    }

    static async addProduct(req: Request, res: Response) {
        try {
            const product = await AddProductUseCase.execute(req.body);
            console.log('product controller', product);
            res.status(200).json({
                status: 200,
                data: product,
                message: 'Product added successfully'
            });
        } catch (error) {
            res.status(400).json({
                status: 400,
                message: error
            })
        }
    } 
    static async updateProduct(req: Request, res: Response) {
        try {
            const product = await UpdateProductUseCase.execute(req);
            res.status(200).json({
                status: 200,
                data: product,
                message: 'Product updated successfully'
            });
        } catch (error) {
            res.status(400).json({
                status: 400,
                message: error
            })
        }
    }

    static async deleteProduct(req: Request, res: Response) {
        try {
            const product = await DeleteProductUseCase.execute(req);
            res.status(200).json({
                status: 200,
                data: product,
                message: 'Product deleted successfully'
            });
        } catch (error) {
            res.status(400).json({
                status: 400,
                message: error
            })
        }
    }
}