// import { NewEntity } from '../Interfaces';
import TeamModel from '../models/TeamModel';
import { ITeam } from '../Interfaces/teams/ITeam';
import { ITeamModel } from '../Interfaces/teams/ITeamModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class TeamService {
  constructor(
    private teamModel: ITeamModel = new TeamModel(),
  ) {}

  public async getTeams(): Promise<ServiceResponse<ITeam[]>> {
    const response = await this.teamModel.findAll();
    return { status: 'SUCCESSFUL', data: response };
  }

  public async getById(id: number): Promise<ServiceResponse<ITeam>> {
    const response = await this.teamModel.findById(id);
    if (!response) return { status: 'NOT_FOUND', data: { message: 'Team not found!' } };
    return { status: 'SUCCESSFUL', data: response };
  }
}
