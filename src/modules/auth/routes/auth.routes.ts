import { Router, Request, Response, NextFunction } from "express";
import { AuthController } from "../controller/auth.controller";

const router = Router();
const authControler = new AuthController();

/**
 * MIDDLEWARE Verify token
 * @param req 
 * @param res 
 * @param next 
 * @returns 
 */
export const tokenValidating = (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) {
        return res.status(401).json({
            status: 401,
            message: 'Without authority'
        });
    }

    const [scheme, token] = req.headers.authorization.split(' ');

    if (scheme !== 'Bearer' || !token) {
        return res.status(401).json({
            status: 401,
            message: 'Invalid token format'
        });
    }

    req.body.token = token;
    next();
};



router.post('/register', async (req, res) => {
    await authControler.register(req, res);
});

router.post('/login', async (req, res) => {
    await authControler.login(req, res);
});

router.get('/logout', tokenValidating, async (req, res) => {
    await authControler.logout(req, res);
});


export default router;