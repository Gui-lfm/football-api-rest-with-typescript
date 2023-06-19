import MatchModel from '../models/MatchModel';
import { IMatch } from '../Interfaces/matches/IMatch';
import { IMatchModel } from '../Interfaces/matches/IMatchModel';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

export default class MatchService {
  constructor(
    private matchModel: IMatchModel = new MatchModel(),
  ) {}

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
    homeTeamGoals:number,
    awayTeamGoals:number,
    id:number,
  ): Promise<ServiceResponse<IMatch | null>> {
    const response = await this.matchModel.updateMatchScore(homeTeamGoals, awayTeamGoals, id);

    if (!response) {
      return { status: 'NOT_FOUND', data: { message: 'Match not found!' } };
    }

    return { status: 'SUCCESSFUL', data: response };
  }
}
