import { Request, Response } from 'express';
import MatchService from '../services/MatchService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class MatchController {
  constructor(
    private matchService = new MatchService(),
  ) { }

  public async getMatches(_req: Request, res: Response) {
    const { inProgress } = _req.query;
    if (inProgress) {
      const queryStatus = inProgress === 'true';
      const serviceResponse = await this.matchService.getMatchesByStatus(queryStatus);
      return res.status(200).json(serviceResponse.data);
    }
    const serviceResponse = await this.matchService.getMatches();
    return res.status(200).json(serviceResponse.data);
  }

  public async endMatch(req: Request, res: Response) {
    const { id } = req.params;

    const serviceResponse = await this.matchService.endMatch(Number(id));

    if (serviceResponse.status !== 'SUCCESSFUL') {
      res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }

    return res.status(200).json({ message: 'Finished' });
  }

  public async updateMatch(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;

    const serviceResponse = await
    this.matchService.updateMatch(homeTeamGoals, awayTeamGoals, Number(id));

    if (serviceResponse.status !== 'SUCCESSFUL') {
      res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }

    return res.status(200).json(serviceResponse.data);
  }
}
