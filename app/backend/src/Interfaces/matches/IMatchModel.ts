import { IMatch } from './IMatch';

export interface IMatchModel {
  findAll(): Promise<IMatch[]>
  findByMatchStatus(status: boolean): Promise<IMatch[]>
  endMatch(id: number): Promise<boolean>
}
