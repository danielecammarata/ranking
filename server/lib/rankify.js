const Elo = require('arpad')

const uscf = {
  default: 32,
  2100: 24,
  2400: 16
}
const min_score = 100;
const max_score = 10000
const elo = new Elo(uscf, min_score, max_score)

const getVariation = (winnerPoints, loserPoints) => {
  return elo.expectedScore(winnerPoints, loserPoints)
}

const calculate = ({ teamHome, teamAway }) => {
  const homeRankPoints = (teamHome.defense.points + teamHome.striker.points) / 2
  const awayRankPoints = (teamAway.defense.points + teamAway.striker.points) / 2

  const variation = teamHome.score > teamAway.score ? getVariation(homeRankPoints, awayRankPoints) : getVariation(awayRankPoints, homeRankPoints)
  const homeOutcome = teamHome.score > teamAway.score ? 1 : 0
  const awayOutcome = teamHome.score > teamAway.score ? 0 : 1
  const homeResut = Object.assign({}, teamHome)
  const awayResut = Object.assign({}, teamAway)
  homeResut.defense.points = elo.newRating(variation, homeOutcome, homeResut.defense.points)
  homeResut.striker.points = elo.newRating(variation, homeOutcome, homeResut.striker.points)
  awayResut.defense.points = elo.newRating(variation, awayOutcome, awayResut.defense.points)
  awayResut.striker.points = elo.newRating(variation, awayOutcome, awayResut.striker.points)

  return {
    teamHome: homeResut,
    teamAway: awayResut
  }
}

module.exports = {
  calculate,
  getVariation
}
