import { Request, Response, Router } from 'express';
import LoginController from '../controllers/LoginController';
import Validations from '../middlewares/validations';

const loginController = new LoginController();

const router = Router();

router.post(
  '/',
  Validations.validateLogin,
  (req: Request, res: Response) => loginController.login(req, res),
);

router.get(
  '/role',
  Validations.validateToken,
  (req: Request, res: Response) => loginController.getRole(req, res),
);

export default router;
