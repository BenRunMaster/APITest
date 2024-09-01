import { Router } from "express";
import { ProductController } from "../controller/product.controller";
const router = Router()
router.get('/', async (req, res) => {
    await ProductController.getProducts(req, res);
});

router.post('/', async (req, res) => {
    await ProductController.addProduct(req, res);
});

router.put('/:idProducto', async (req, res) => {
    await ProductController.updateProduct(req, res);
});

router.delete('/:idProducto', async (req, res) => {
    await ProductController.deleteProduct(req, res);
});

export default router;