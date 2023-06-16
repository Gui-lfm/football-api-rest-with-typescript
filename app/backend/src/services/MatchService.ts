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
}
