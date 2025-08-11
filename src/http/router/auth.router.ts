import Express, { NextFunction, Request, Response }  from 'express';

const router = Express();
const controller = new AuthController()

router.post(
    '/auth/login',
    (req: Request, res: Response, next: NextFunction) => new AuthController()
)

router.post(
    '/auth/forgot_pass'
)