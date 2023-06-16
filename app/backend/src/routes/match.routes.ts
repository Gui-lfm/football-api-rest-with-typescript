import { Request, Response, Router } from 'express';
import MatchController from '../controllers/MatchController';

const matchController = new MatchController();

const router = Router();

router.get('/', (req: Request, res: Response) => matchController.getMatches(req, res));
// router.get('', (req: Request, res: Response) => matchController.getMatchesByStatus(req, res));

export default router;
