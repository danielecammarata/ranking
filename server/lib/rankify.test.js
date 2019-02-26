const { elo, calculate } = require('./rankify')

describe('Search: data reducers', () => {
  const winnerTeam = {
    defender: {
      points: 1200
    },
    striker: {
      points: 1200
    },
    score: 6
  }

  const looserTeam = {
    defender: {
      points: 1200
    },
    striker: {
      points: 1200
    },
    score: 0
  }

  it('Should give a lot of points', () => {
    const result = calculate({
      teamHome: winnerTeam,
      teamAway: looserTeam
    })
    expect(result).toMatchSnapshot()
  })
})
