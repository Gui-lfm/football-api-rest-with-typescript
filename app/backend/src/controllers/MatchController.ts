import { Request, Response } from 'express';
import MatchService from '../services/MatchService';
// import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class MatchController {
  constructor(
    private matchService = new MatchService(),
  ) {}

  public async getMatches(_req: Request, res: Response) {
    const serviceResponse = await this.matchService.getMatches();
    return res.status(200).json(serviceResponse.data);
  }
}
