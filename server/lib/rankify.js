const Elo = require('arpad')

const elo = new Elo()

const calculate = ({ teamHome, teamAway }) => {
  const homeRankPoints = Math.round((teamHome.defender.points + teamHome.striker.points) / 2)
  const awayRankPoints = Math.round((teamAway.defender.points + teamAway.striker.points) / 2)

  const hasHomeWin = teamHome.score > teamAway.score
  const hasCappotto = teamHome.score === 0 || teamAway.score === 0

  let difference = hasHomeWin ?
    elo.newRatingIfWon(homeRankPoints, awayRankPoints) - homeRankPoints :
    elo.newRatingIfWon(awayRankPoints, homeRankPoints) - awayRankPoints

  if (hasCappotto) {
    difference++
  }


  const newPoints = {
    homeDefense: hasHomeWin ? teamHome.defender.points + difference : teamHome.defender.points - difference,
    homeStriker: hasHomeWin ? teamHome.striker.points + difference : teamHome.striker.points - difference,
    awayDefense: hasHomeWin ? teamAway.defender.points - difference : teamAway.defender.points + difference,
    awayStriker: hasHomeWin ? teamAway.striker.points - difference : teamAway.striker.points + difference,
    difference,
    hasHomeWin,
    hasCappotto
  }

  return newPoints
}

module.exports = {
  calculate,
  elo
}
