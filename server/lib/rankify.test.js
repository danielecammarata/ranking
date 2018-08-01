const rankify = require('./rankify')

describe('rankify', () => {
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

    const result = rankify.calculate(data)

    console.log(data)
    console.log(result)

    expect(result).toEqual(100)
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
    const result = rankify.calculate(data)

    console.log(data)
    console.log(result)

    expect(result).toEqual(100)
  })
})
