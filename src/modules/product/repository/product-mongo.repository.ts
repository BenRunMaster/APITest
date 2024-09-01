import { productModel } from "../model/product.model";
import { ProductRequest } from "../types/types";

export class ProductMongoRepository {
    static async getProducts(): Promise<any> {
        try {
            const products = await productModel.find({ "activo": true });
            return products;
        } catch (error) {
            console.log('Error at find products :', error);
        }
    }

    static async findByParam(field: string, value: any): Promise<any> {
        const productSaved = await productModel
            .findOne({ [field]: value });
        if (!productSaved) {
            throw new Error("Error adding product");
        }
        return productSaved;
    }

    static async addProduct(params: ProductRequest): Promise<any> {
        try {
            const products = await productModel.find();
            const id = products.length + 1;
            const product = new productModel({
                id,
                ...params
            });
            await product.save();
            return product;
        } catch (error) {
            console.log('Error at find products :', error);
        }
    }

    static async updateProduct(params: ProductRequest, id: number): Promise<any> {
        try {
            const numericId = Number(id);

            const updatedProduct = await productModel.findOneAndUpdate(
                { id: numericId },
                params,
                { new: true }
            );
            if (!updatedProduct) {
                throw new Error('Product not found');
            }

            return updatedProduct;

        } catch (error) {
            console.log('Error at UPDATE product :', error);
        }
    }

    static async deleteProduct(id: number): Promise<any> {
        try {
            const numericId = Number(id);

            const deletedProduct = await productModel.findOneAndUpdate(
                { id: numericId },
                {
                    activo: false
                },
                { new: true }
            );
            if (!deletedProduct) {
                throw new Error('Product not found');
            }

            return deletedProduct;

        } catch (error) {
            console.log('Error at UPDATE product :', error);
        }
    }
}