import Express, { NextFunction, Request, Response }  from 'express';
import AuthController from '../controller/auth.controller';

const router = Express();
const controller = new AuthController()

router.post(
    '/auth/register',
    (req: Request, res: Response, next: NextFunction) => new AuthController()
)

export default router;