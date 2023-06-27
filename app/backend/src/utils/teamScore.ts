import MatchService from '../services/MatchService';
import { IMatch } from '../Interfaces/matches/IMatch';

export async function getMatches(id: number): Promise<IMatch[] | null> {
  const service = new MatchService();
  const matches = await service.getMatchesByStatus(false);

  if (matches.status === 'SUCCESSFUL') {
    const teamMatches = matches.data.filter((match) =>
      match.homeTeamId === id || match.awayTeamId === id);
    return teamMatches;
  }

  return null;
}
// total de partidas que um time participou
export async function totalMatches(id: number): Promise<number> {
  const matches = await getMatches(id) as IMatch[];
  return matches.length;
}
// partidas de um time em casa
export async function homeMatches(id: number): Promise<IMatch[]> {
  const matches = await getMatches(id) as IMatch[];

  const home = matches.filter((match) => match.homeTeamId === id);
  return home;
}
// partidas de um time fora
export async function awayMatches(id: number): Promise<IMatch[]> {
  const matches = await getMatches(id) as IMatch[];

  const away = matches.filter((match) => match.awayTeamId === id);
  return away;
}
//  n º de vitorias dentro e fora de casa
export async function homeVictories(id: number): Promise<number> {
  const matches = await homeMatches(id);
  const victories = matches.filter((match) => match.homeTeamGoals > match.awayTeamGoals);
  return victories.length;
}

export async function awayVictories(id: number): Promise<number> {
  const matches = await awayMatches(id);
  const victories = matches.filter((match) => match.awayTeamGoals > match.homeTeamGoals);
  return victories.length;
}
// n º de empates dentro e fora de casa
export async function homedraws(id: number): Promise<number> {
  const matches = await homeMatches(id);
  const draws = matches.filter((match) => match.homeTeamGoals === match.awayTeamGoals);
  return draws.length;
}

export async function awayDraws(id: number): Promise<number> {
  const matches = await awayMatches(id);
  const draws = matches.filter((match) => match.awayTeamGoals === match.homeTeamGoals);
  return draws.length;
}
// n º de derrotas dentro e fora de casa
export async function homeLosses(id: number): Promise<number> {
  const matches = await homeMatches(id);
  const losses = matches.filter((match) => match.homeTeamGoals < match.awayTeamGoals);
  return losses.length;
}

export async function awayLosses(id: number): Promise<number> {
  const matches = await awayMatches(id);
  const losses = matches.filter((match) => match.awayTeamGoals < match.homeTeamGoals);
  return losses.length;
}
// nº total de vitorias
export async function totalVictories(id: number): Promise<number> {
  const home = await homeVictories(id);
  const away = await awayVictories(id);

  const total = home + away;
  return total;
}
// nº total de empates
export async function totalDraws(id: number): Promise<number> {
  const home = await homedraws(id);
  const away = await awayDraws(id);

  const total = home + away;
  return total;
}
// nº total de derrotas
export async function totalLosses(id: number): Promise<number> {
  const home = await homeLosses(id);
  const away = await awayLosses(id);

  const total = home + away;
  return total;
}
// gols dentro, fora de casa e ao todo
export async function homeGoals(id: number): Promise<number> {
  const matches = await homeMatches(id);
  const goals = matches.reduce((total, match) => total + match.homeTeamGoals, 0);
  return goals;
}

export async function awayGoals(id: number): Promise<number> {
  const matches = await awayMatches(id);
  const goals = matches.reduce((total, match) => total + match.awayTeamGoals, 0);
  return goals;
}

export async function totalGoals(id: number): Promise<number> {
  const home = await homeGoals(id);
  const away = await awayGoals(id);

  const total = home + away;
  return total;
}
// gols sofridos dentro, fora e ao todo
export async function homeGoalsOwn(id: number): Promise<number> {
  const matches = await homeMatches(id);
  const goalsOwn = matches.reduce((total, match) => total + match.awayTeamGoals, 0);
  return goalsOwn;
}

export async function awayGoalsOwn(id: number): Promise<number> {
  const matches = await awayMatches(id);
  const goalsOwn = matches.reduce((total, match) => total + match.homeTeamGoals, 0);
  return goalsOwn;
}

export async function totalGoalsOwn(id: number): Promise<number> {
  const home = await homeGoalsOwn(id);
  const away = await awayGoalsOwn(id);
  const total = home + away;
  return total;
}
// pontuação total/home/away
export async function totalPoints(id: number): Promise<number> {
  const victories = await totalVictories(id);
  const draws = await totalDraws(id);
  const total = (victories * 3) + draws;
  return total;
}

export async function homePoints(id: number): Promise<number> {
  const victories = await homeVictories(id);
  const draws = await homedraws(id);
  const total = (victories * 3) + draws;
  return total;
}

export async function awayPoints(id: number): Promise<number> {
  const victories = await awayVictories(id);
  const draws = await awayDraws(id);
  const total = (victories * 3) + draws;
  return total;
}

// saldo de gols total/home/away
export async function totalGoalsBalance(id: number): Promise<number> {
  const goals = await totalGoals(id);
  const goalsOwn = await totalGoalsOwn(id);

  const balance = goals - goalsOwn;
  return balance;
}

export async function homeGoalsBalance(id: number): Promise<number> {
  const goals = await homeGoals(id);
  const goalsOwn = await homeGoalsOwn(id);

  const balance = goals - goalsOwn;
  return balance;
}

export async function awayGoalsBalance(id: number): Promise<number> {
  const goals = await awayGoals(id);
  const goalsOwn = await awayGoalsOwn(id);

  const balance = goals - goalsOwn;
  return balance;
}
// eficiencia total/home/away
export async function totalEfficiency(id: number): Promise<number> {
  const matches = await totalMatches(id);
  const points = await totalPoints(id);

  const efficiency = (points / (matches * 3)) * 100;

  return Number(efficiency.toFixed(2));
}

export async function homeEfficiency(id: number): Promise<number> {
  const matches = (await homeMatches(id)).length;
  const points = await homePoints(id);

  const efficiency = (points / (matches * 3)) * 100;

  return Number(efficiency.toFixed(2));
}

export async function awayEfficiency(id: number): Promise<number> {
  const matches = (await awayMatches(id)).length;
  const points = await awayPoints(id);

  const efficiency = (points / (matches * 3)) * 100;

  return Number(efficiency.toFixed(2));
}
