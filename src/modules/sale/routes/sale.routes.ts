import { Router } from "express";
import { SaleController } from "../controller/sale.controller";
const router = Router()
router.get('/', async (req, res) => {
    await SaleController.getSales(req, res);
});

router.post('/', async (req, res) => {
    await SaleController.addSale(req, res);
});

export default router;