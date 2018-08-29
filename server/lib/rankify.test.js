const rankify = require('./rankify')

describe('rankify', () => {
  it('should calculate the ranking for the away team winning', () => {
    const createData = (adef, astr, ascore, hdef, hstr, hscore) => ({
      teamAway: {
        defender: {
          points: adef
        },
        striker: {
          points: astr
        },
        score: ascore
      },
      teamHome: {
        defender: {
          points: hdef
        },
        striker: {
          points: hstr
        },
        score: hscore
      }
    })

    let mac = 1200
    let beppe = 1200
    let mucci = 1200
    let igor = 1200
    let simo = 1200
    let ettore = 1200
    let nigro = 1200
    let gabo = 1200
    let nic = 1200
    let ceci = 1200
    // let data = {
    //   teamAway: {
    //     defense: { // mac
    //       points: mac
    //     },
    //     striker: { // beppe
    //       points: beppe
    //     },
    //     score: 6
    //   },
    //   teamHome: {
    //     defense: { // Mucci
    //       points: mucci
    //     },
    //     striker: { // Igor
    //       points: igor
    //     },
    //     score: 4
    //   }
    // }
    let data = createData(mac, beppe, 6, mucci, igor, 1)
    let result = rankify.calculate(data)

    mac = mac + result.difference
    beppe = beppe + result.difference
    mucci = mucci - result.difference
    igor = igor - result.difference

    console.log(
      {
        difference: result.difference
      }
    )

    data = createData(mac, beppe, 6, simo, ettore, 1)
    result = rankify.calculate(data)

    mac = mac + result.difference
    beppe = beppe + result.difference
    simo = simo - result.difference
    ettore = ettore - result.difference

    console.log(
      {
        difference: result.difference
      }
    )

    data = createData(mac, nigro, 5, igor, beppe, 7)
    result = rankify.calculate(data)

    igor = igor + result.difference
    beppe = beppe + result.difference
    mac = mac - result.difference
    nigro = nigro - result.difference

    console.log(
      {
        difference: result.difference
      }
    )



    data = createData(ettore, gabo, 8, igor, beppe, 6)
    result = rankify.calculate(data)

    ettore = ettore + result.difference
    gabo = gabo + result.difference
    igor = igor - result.difference
    beppe = beppe - result.difference

    console.log(
      {
        difference: result.difference
      }
    )

    data = createData(nic, simo, 2, ettore, gabo, 6)
    result = rankify.calculate(data)

    ettore = ettore + result.difference
    gabo = gabo + result.difference
    nic = nic - result.difference
    simo = simo - result.difference

    console.log(
      {
        difference: result.difference
      }
    )

    data = createData(mac, nic, 6, ettore, gabo, 4)
    result = rankify.calculate(data)

    mac = mac + result.difference
    nic = nic + result.difference
    ettore = ettore - result.difference
    gabo = gabo - result.difference

    console.log(
      {
        difference: result.difference
      }
    )


    data = createData(mac, nic, 6, beppe, ceci, 4)
    result = rankify.calculate(data)

    mac = mac + result.difference
    nic = nic + result.difference
    beppe = beppe - result.difference
    ceci = ceci - result.difference

    console.log(
      {
        difference: result.difference
      }
    )

    console.log({
      mac: mac,
      beppe: beppe,
      nic: nic,
      ettore: ettore,
      simo: simo,
      mucci: mucci,
      gabo: gabo,
      igor: igor,
      ceci: ceci,
      nigro: nigro
    })

    expect(result).toEqual(100)
  })
})
