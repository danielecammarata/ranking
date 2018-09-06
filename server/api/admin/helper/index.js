const Match = require('../../../models/Match')

const rankify = require('../../../lib/rankify')

const GetMatchById = async id => {
  let match = {}
  await Match.findById(id, (err, doc) => {
    if (err) console.error(err)
    match = doc
  })

  return match
}

const GetMatchesStartingFromDateAndUsersFromMatchId = async id => {
  const users = {
    includes: function (user) {
      return Object.keys(this).includes(user.slug)
    },
    add: function (user, rankDifference, winner) {
      this[user.slug] = {
        id: user._id,
        name: user.name,
        points: user.points + (winner ? - Math.abs(rankDifference) : Math.abs(rankDifference))
      }
    },
    update: function (user, rankDifference, winner) {
      this[user.slug].points = this[user.slug].points + (winner ? - Math.abs(rankDifference) : Math.abs(rankDifference))
    },
    setPoints: function (slug, points) {
      this[slug].points = points
    },
    getUser: function (slug) {
      return this[slug]
    },
    getUsers: function() {
      return Object.keys(this)
        .filter(key => ({}.toString.call(this[key]) !== '[object Function]'))
        .reduce((obj, key) => {
          obj[key] = this[key];
          return obj;
        }, {})
    }
  }

  const matchesToRankify = []
  const matches = []

  const matchFrom = await GetMatchById(id)

  const cursor = Match.find({createdAt: { $gte: matchFrom.createdAt }})
    .populate([
      {path: 'teamHome.defender', model: 'User'},
      {path: 'teamHome.striker', model: 'User'},
      {path: 'teamAway.defender', model: 'User'},
      {path: 'teamAway.striker', model: 'User'}
    ]).sort({ createdAt: 1 }).cursor()

  for (let match = await cursor.next(); match != null; match = await cursor.next()) {
    const homeWin = match.teamHome.score > match.teamAway.score
    const teamHome = match.teamHome
    const teamAway = match.teamAway
    const homeDefender = teamHome.defender
    const homeStriker = teamHome.striker
    const awayDefender = teamAway.defender
    const awayStriker = teamAway.striker

    if (users.includes(homeDefender)) {
      users.update(homeDefender, match.difference, homeWin)
    } else {
      users.add(homeDefender, match.difference, homeWin)
    }

    if (users.includes(homeStriker)) {
      users.update(homeStriker, match.difference, homeWin)
    } else {
      users.add(homeStriker, match.difference, homeWin)
    }

    if (users.includes(awayDefender)) {
      users.update(awayDefender, match.difference, !homeWin)
    } else {
      users.add(awayDefender, match.difference, !homeWin)
    }

    if (users.includes(awayStriker)) {
      users.update(awayStriker, match.difference, !homeWin)
    } else {
      users.add(awayStriker, match.difference, !homeWin)
    }

    matchesToRankify.push({
      _id: match._id,
      badges: [],
      slug: match.slug,
      createdAt: match.createdAt,
      teamHome: {
        defender: {
          _id: homeDefender._id,
          slug: homeDefender.slug
        },
        striker: {
          _id: homeStriker._id,
          slug: homeStriker.slug
        },
        score: teamHome.score,
        defScore: teamHome.defScore,
        strScore: teamHome.strScore,
        defBadges: [],
        strBadges: []
      },
      teamAway: {
        defender: {
          _id: awayDefender._id,
          slug: awayDefender.slug
        },
        striker: {
          _id: awayStriker._id,
          slug: awayStriker.slug
        },
        score: teamAway.score,
        defScore: teamAway.defScore,
        strScore: teamAway.strScore,
        defBadges: [],
        strBadges: []
      }
    })
  }

  matchesToRankify.forEach(match => {
    match.teamHome.defender.points = users.getUser(match.teamHome.defender.slug).points
    match.teamHome.striker.points = users.getUser(match.teamHome.striker.slug).points
    match.teamAway.defender.points = users.getUser(match.teamAway.defender.slug).points
    match.teamAway.striker.points = users.getUser(match.teamAway.striker.slug).points

    const rank = rankify.calculate({
      teamHome: match.teamHome,
      teamAway: match.teamAway
    })

    users.setPoints(match.teamHome.defender.slug, rank.homeDefense)
    users.setPoints(match.teamHome.striker.slug, rank.homeStriker)
    users.setPoints(match.teamAway.defender.slug, rank.awayDefense)
    users.setPoints(match.teamAway.striker.slug, rank.awayStriker)

    matches.push(
      Object.assign({}, match, {difference: rank.difference})
    )
  })

  return {
    matches: matches,
    users: users.getUsers()
  }

}

const GetNewUsersPointsDeletingMatch = match => {
  const users = {
    add: function (user, rankDifference, winner) {
      this[user.slug] = {
        id: user._id,
        name: user.name,
        points: user.points + (winner ? - Math.abs(rankDifference) : Math.abs(rankDifference))
      }
    },
    getUsers: function() {
      return Object.keys(this)
        .filter(key => ({}.toString.call(this[key]) !== '[object Function]'))
        .reduce((obj, key) => {
          obj[key] = this[key];
          return obj;
        }, {})
    }
  }


  const homeWin = match.teamHome.score > match.teamAway.score
  const teamHome = match.teamHome
  const teamAway = match.teamAway
  const homeDefender = teamHome.defender
  const homeStriker = teamHome.striker
  const awayDefender = teamAway.defender
  const awayStriker = teamAway.striker

  users.add(homeDefender, match.difference, homeWin)
  users.add(homeStriker, match.difference, homeWin)
  users.add(awayDefender, match.difference, !homeWin)
  users.add(awayStriker, match.difference, !homeWin)

  return users.getUsers()
}

module.exports = {
  GetMatchesStartingFromDateAndUsersFromMatchId,
  GetNewUsersPointsDeletingMatch
}
