import { IMatch } from './IMatch';

export interface IMatchModel {
  findAll(): Promise<IMatch[]>;
  findByMatchStatus(status: boolean): Promise<IMatch[]>;
  endMatch(id: number): Promise<boolean>;
  updateMatchScore(
    homeTeamGoals: number, awayTeamGoals: number, id: number
  ): Promise<IMatch | null>;
  newMatch(data: Partial<IMatch>): Promise<IMatch>;
}
