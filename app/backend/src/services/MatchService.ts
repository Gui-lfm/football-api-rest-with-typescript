import MatchModel from '../models/MatchModel';
import { IMatch } from '../Interfaces/matches/IMatch';
import { IMatchModel } from '../Interfaces/matches/IMatchModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import { NewEntity } from '../Interfaces';
import TeamModel from '../models/TeamModel';

export default class MatchService {
  constructor(
    private matchModel: IMatchModel = new MatchModel(),
    private teamModel = new TeamModel(),
  ) { }

  public async getMatches(): Promise<ServiceResponse<IMatch[]>> {
    const response = await this.matchModel.findAll();

    return { status: 'SUCCESSFUL', data: response };
  }

  public async getMatchesByStatus(status: boolean): Promise<ServiceResponse<IMatch[]>> {
    const response = await this.matchModel.findByMatchStatus(status);

    return { status: 'SUCCESSFUL', data: response };
  }

  public async endMatch(id: number): Promise<ServiceResponse<boolean>> {
    const response = await this.matchModel.endMatch(id);
    if (!response) {
      return { status: 'NOT_FOUND', data: { message: 'Match not found!' } };
    }

    return { status: 'SUCCESSFUL', data: response };
  }

  public async updateMatch(
    homeTeamGoals: number,
    awayTeamGoals: number,
    id: number,
  ): Promise<ServiceResponse<IMatch | null>> {
    const response = await this.matchModel.updateMatchScore(homeTeamGoals, awayTeamGoals, id);

    if (!response) {
      return { status: 'NOT_FOUND', data: { message: 'Match not found!' } };
    }

    return { status: 'SUCCESSFUL', data: response };
  }

  public async postMatch(match: NewEntity<IMatch>): Promise<ServiceResponse<IMatch>> {
    const { homeTeamId, awayTeamId } = match;
    const homeTeamExists = await this.teamModel.findById(homeTeamId);
    const awayTeamExists = await this.teamModel.findById(awayTeamId);

    console.log('home team', homeTeamExists);
    console.log('away team', awayTeamExists);

    if (!homeTeamExists || !awayTeamExists) {
      return {
        status: 'NOT_FOUND',
        data: { message: 'There is no team with such id!' },
      };
    }

    const newMatch = await this.matchModel.newMatch(match);
    return { status: 'SUCCESSFUL', data: newMatch };
  }
}
