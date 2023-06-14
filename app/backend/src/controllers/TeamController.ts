import { Request, Response } from 'express';
import TeamService from '../services/TeamService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

export default class TeamController {
  constructor(
    private teamService = new TeamService(),
  ) {}

  public async getTeams(_req: Request, res: Response) {
    const serviceResponse = await this.teamService.getTeams();
    res.status(200).json(serviceResponse.data);
  }

  public async getById(req: Request, res: Response) {
    const { id } = req.params;

    const serviceResponse = await this.teamService.getById(Number(id));
    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(
        mapStatusHTTP(serviceResponse.status),
      ).json(serviceResponse.data);
    }
    res.status(200).json(serviceResponse.data);
  }
}
