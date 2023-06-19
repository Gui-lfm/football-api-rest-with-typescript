import SequelizeMatches from '../database/models/SequelizeMatches';
import { IMatch } from '../Interfaces/matches/IMatch';
import { IMatchModel } from '../Interfaces/matches/IMatchModel';
import SequelizeTeams from '../database/models/SequelizeTeams';

export default class MatchModel implements IMatchModel {
  private model = SequelizeMatches;

  async findAll(): Promise<IMatch[]> {
    const response = await this.model.findAll({
      include: [
        {
          model: SequelizeTeams,
          as: 'homeTeam',
          attributes: ['teamName'],
        },
        {
          model: SequelizeTeams,
          as: 'awayTeam',
          attributes: ['teamName'],
        },
      ],
    });
    return response;
  }

  async findByMatchStatus(status: boolean): Promise<IMatch[]> {
    const response = await this.model.findAll({
      where: { inProgress: status },
      include: [
        {
          model: SequelizeTeams,
          as: 'homeTeam',
          attributes: ['teamName'],
        },
        {
          model: SequelizeTeams,
          as: 'awayTeam',
          attributes: ['teamName'],
        },
      ],
    });
    return response;
  }

  async endMatch(id: number): Promise<boolean> {
    const response = await this.model.update({ inProgress: false }, { where: { id } });

    if (!response) {
      return false;
    }
    return true;
  }
}
