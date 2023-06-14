import SequelizeTeams from '../database/models/SequelizeTeams';
import { ITeam } from '../Interfaces/teams/ITeam';
import { ITeamModel } from '../Interfaces/teams/ITeamModel';
// import { NewEntity } from '../Interfaces';

export default class TeamModel implements ITeamModel {
  private model = SequelizeTeams;

  async findAll(): Promise<ITeam[]> {
    const response = await this.model.findAll();
    return response.map(({ id, teamName }) => ({ id, teamName }));
  }

  async findById(id: ITeam['id']): Promise<ITeam | null> {
    const response = await this.model.findByPk(id);
    if (response === null) return null;
    const { teamName }: ITeam = response;
    return { id, teamName };
  }
}
