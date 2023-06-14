import { Request, Response } from 'express';
import TeamService from '../services/TeamService';

export default class TeamController {
  constructor(
    private teamService = new TeamService(),
  ) {}

  public async getTeams(_req: Request, res: Response) {
    const serviceResponse = await this.teamService.getTeams();
    res.status(200).json(serviceResponse.data);
  }
}
