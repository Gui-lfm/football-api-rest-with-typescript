export interface leaderBoard {
  name: string;
  totalGames: number | null;
  totalVictories: number | null;
  totalDraws: number | null;
  totalLosses: number | null;
  totalPoints: number;
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: number,
}
