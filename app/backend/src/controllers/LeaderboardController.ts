import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';
// import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class LeaderboardController {
  constructor(
    private leaderboardService = new LeaderboardService(),
  ) {}

  public async getTotalLeaderBoard(req: Request, res: Response) {
    const response = await this.leaderboardService.getTotalLeaderBoard();

    if (!response) {
      return res.status(404).json({ message: 'error' });
    }

    res.status(200).json(response.data);
  }
}
