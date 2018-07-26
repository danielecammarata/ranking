const rankify = require('./rankify')

describe('rankify', () => {
  it('should calculate the variation', () => {
    winnerPoints = 1200
    loserPoints = 1800
    expect(rankify.getVariation(winnerPoints, loserPoints)).toEqual(0.030653430031715508)
  })

  it('should calculate the ranking for the home team winning', () => {
    const data = {
      teamAway: {
        defense: {
          points: 1600
        },
        striker: {
          points: 1800
        },
        score: 4
      },
      teamHome: {
        defense: {
          points: 1200
        },
        striker: {
          points: 2500
        },
        score: 6
      }
    }

    expect(rankify.calculate(data)).toMatchSnapshot()
  })

  it('should calculate the ranking for the away team winning', () => {
    const data = {
      teamAway: {
        defense: {
          points: 1600
        },
        striker: {
          points: 1800
        },
        score: 6
      },
      teamHome: {
        defense: {
          points: 1200
        },
        striker: {
          points: 2500
        },
        score: 4
      }
    }

    expect(rankify.calculate(data)).toMatchSnapshot()
  })
})
