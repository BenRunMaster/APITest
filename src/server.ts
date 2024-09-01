import express, { Express } from "express";
import cors from "cors";
import morgan from "morgan";


import { PORT } from "./config";
import { connectDB } from "./config/database";
import authRouter, { tokenValidating } from "./modules/auth/routes/auth.routes";
import productRouter from "./modules/product/routes/product.routes";
import saleRouter from "./modules/sale/routes/sale.routes";


export class Server {
    private app: Express;
    constructor() {
        this.app = express();
        connectDB();
        this.configuration();
        this.middlewares();
        this.routes();
    }

    configuration() {
        this.app.set('port', PORT || 5000);
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(morgan('dev'));
        this.app.use(express.json());
    }

    routes() {
        this.app.use('/api/auth', authRouter);
        this.app.use('/api/product', tokenValidating, productRouter);
        this.app.use('/api/sale', tokenValidating, saleRouter);
    }

    listen() {
        this.app.listen(this.app.get('port'), () => {
            console.log(`Server listen at port: ${this.app.get('port')}`);
        })
    }
}