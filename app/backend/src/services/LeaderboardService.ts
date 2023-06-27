import TeamService from './TeamService';
import { leaderBoard } from '../Interfaces/leaderboard';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import * as teamsFunc from '../utils/teamScore';
import sortLeaderboard from '../utils/sortLeaderboard';

export default class LeaderboardService {
  private teamsFunc = teamsFunc;
  constructor(
    private teamService = new TeamService(),
  ) {}

  public async getTotalLeaderBoard(): Promise<ServiceResponse<leaderBoard[]>> {
    const response = await this.teamService.getTeams();

    if (response.status !== 'SUCCESSFUL') {
      return { status: 'NOT_FOUND', data: { message: 'teams not found!' } };
    }

    const leaderBoardPromises = response.data.map(async (team) => ({
      name: team.teamName,
      totalGames: await teamsFunc.totalMatches(team.id),
      totalVictories: await teamsFunc.totalVictories(team.id),
      totalDraws: await teamsFunc.totalDraws(team.id),
      totalLosses: await teamsFunc.totalLosses(team.id),
      totalPoints: await teamsFunc.totalPoints(team.id),
      goalsFavor: await teamsFunc.totalGoals(team.id),
      goalsOwn: await teamsFunc.totalGoalsOwn(team.id),
      goalsBalance: await teamsFunc.totalGoalsBalance(team.id),
      efficiency: await teamsFunc.totalEfficiency(team.id),
    }));

    const leaderBoardTotal = (await Promise.all(leaderBoardPromises)).sort(sortLeaderboard);

    return { status: 'SUCCESSFUL', data: leaderBoardTotal };
  }

  public async getHomeLeaderboard(): Promise<ServiceResponse<leaderBoard[]>> {
    const response = await this.teamService.getTeams();

    if (response.status !== 'SUCCESSFUL') {
      return { status: 'NOT_FOUND', data: { message: 'home teams not found!' } };
    }

    const leaderBoardPromises = response.data.map(async (team) => ({
      name: team.teamName,
      totalGames: (await teamsFunc.homeMatches(team.id)).length,
      totalVictories: await teamsFunc.homeVictories(team.id),
      totalDraws: await teamsFunc.homedraws(team.id),
      totalLosses: await teamsFunc.homeLosses(team.id),
      totalPoints: await teamsFunc.homePoints(team.id),
      goalsFavor: await teamsFunc.homeGoals(team.id),
      goalsOwn: await teamsFunc.homeGoalsOwn(team.id),
      goalsBalance: await teamsFunc.homeGoalsBalance(team.id),
      efficiency: await teamsFunc.homeEfficiency(team.id),
    }));

    const leaderBoardHome = (await Promise.all(leaderBoardPromises)).sort(sortLeaderboard);

    return { status: 'SUCCESSFUL', data: leaderBoardHome };
  }

  public async getAwayLeaderboard(): Promise<ServiceResponse<leaderBoard[]>> {
    const response = await this.teamService.getTeams();

    if (response.status !== 'SUCCESSFUL') {
      return { status: 'NOT_FOUND', data: { message: 'away teams not found!' } };
    }

    const leaderBoardPromises = response.data.map(async (team) => ({
      name: team.teamName,
      totalGames: (await teamsFunc.awayMatches(team.id)).length,
      totalVictories: await teamsFunc.awayVictories(team.id),
      totalDraws: await teamsFunc.awayDraws(team.id),
      totalLosses: await teamsFunc.awayLosses(team.id),
      totalPoints: await teamsFunc.awayPoints(team.id),
      goalsFavor: await teamsFunc.awayGoals(team.id),
      goalsOwn: await teamsFunc.awayGoalsOwn(team.id),
      goalsBalance: await teamsFunc.awayGoalsBalance(team.id),
      efficiency: await teamsFunc.awayEfficiency(team.id),
    }));

    const leaderBoardAway = (await Promise.all(leaderBoardPromises)).sort(sortLeaderboard);

    return { status: 'SUCCESSFUL', data: leaderBoardAway };
  }
}
