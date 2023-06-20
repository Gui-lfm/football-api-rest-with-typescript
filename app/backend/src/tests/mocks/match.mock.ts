const match = {
  id: 1,
  homeTeamId: 16,
  homeTeamGoals: 1,
  awayTeamId: 8,
  awayTeamGoals: 1,
  inProgress: false,
  homeTeam: {
    teamName: "São Paulo"
  },
  awayTeam: {
    teamName: "Grêmio"
  }
}

const matches = [match];

const activeMatch = {
  id: 41,
  homeTeamId: 16,
  homeTeamGoals: 2,
  awayTeamId: 9,
  awayTeamGoals: 0,
  inProgress: true,
  homeTeam: {
    teamName: "São Paulo"
  },
  awayTeam: {
    teamName: "Internacional"
  }
}

const activeMatches = [activeMatch]

const newScore = {
  homeTeamGoals: 3,
  awayTeamGoals: 4,
}

const matchRequest = {
  homeTeamId: 16, 
  awayTeamId: 8, 
  homeTeamGoals: 2,
  awayTeamGoals: 2,
}

const newMatch = {
  id: 1,
  homeTeamId: 16, 
  awayTeamId: 8, 
  homeTeamGoals: 2,
  awayTeamGoals: 2,
  inProgress: true,
}

const sameTeam = {
  homeTeamId: 8, 
  awayTeamId: 8, 
  homeTeamGoals: 2,
  awayTeamGoals: 2,
}


export default {
  match, 
  matches, 
  activeMatch,
  activeMatches,
  newScore,
  matchRequest,
  newMatch,
  sameTeam,
}