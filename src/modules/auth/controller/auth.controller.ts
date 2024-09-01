import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { SECRET } from "../../../config";
import { LoginUseCase, LogoutUseCase, RegisterUseCase } from "../use-cases";
import { LogoutToken } from "../types/types";



export class AuthController {
    async register(req: Request, res: Response) {
        try {
            const user = await RegisterUseCase.execute(req.body);

            res.status(201).json({
                status: 201,
                data: user,
                message: 'Successfully user registered'
            })
        } catch (error) {
            res.status(400).json({
                status: 400,
                message: error
            })
        }
    }

    async login(req: Request, res: Response) {
        try {
            const user = await LoginUseCase.execute(req.body);
            if (!user) {
                throw new Error("Check your credentials");
            }
            const token = jwt.sign(
                { documento: user.documento },
                SECRET as string,
                { expiresIn: '3h' });

            res.status(200).json({
                status: 200,
                data: token,
                message: 'Login successfully'
            })
        } catch (error) {
            res.status(400).json({
                status: 400,
                message: error
            })
        }
    }

    async logout(req: Request, res: Response) {
        try {
            const decoded = jwt.verify(req.body.token, SECRET as string);
            const { documento } = decoded as LogoutToken;
            await LogoutUseCase.execute(documento);
            res.status(200).json({
                status: 200,
                data: {},
                message: 'Logout successfully'
            })
        } catch (error) {
            res.status(400).json({
                status: 400,
                message: error
            })
        }
    }
}