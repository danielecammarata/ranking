const express = require('express')
const router = express.Router()

const Match = require('../models/Match')
const User = require('../models/User')

const rankify = require('../lib/rankify')

// '5b8d1a0fbfda2800383ed2ac'
router.post('/rank/update/:match_id', async (req, res) => {
  // Match.find({ id: 5b8d1a0fbfda2800383ed2ac }).remove(
  const id = req.params.match_id
  await Match.findById(id, (err, doc) => {
    let query = Match.find({})
    query.and({createdAt: { $gte: doc.createdAt }})
      .populate([
        {path: 'teamHome.defender', model: 'User'},
        {path: 'teamHome.striker', model: 'User'},
        {path: 'teamAway.defender', model: 'User'},
        {path: 'teamAway.striker', model: 'User'}
      ]).sort({ createdAt: 1 })

    // let query = Match.find({createdAt: { $gt: doc.createdAt }}, (err, docs) => {
    query.exec((err, docs) => {
      console.log('num matches')
      console.log(docs.length)
      console.log('num matches')
      const users = {}
      docs.forEach((match, index) => {
        const homeWin = match.teamHome.score > match.teamAway.score
        console.log(`${index} - ${homeWin}`)
        if (!Object.keys(users).includes(match.teamHome.defender.slug)) {
          users[match.teamHome.defender.slug] = Object.assign({},
            {
              id: match.teamHome.defender._id,
              name: match.teamHome.defender.name,
              points: match.teamHome.defender.points
            },
            {
              diff: homeWin ? - Math.abs(match.difference) : Math.abs(match.difference),
              wins: homeWin ? 1 : 0
            })
        } else {
          users[match.teamHome.defender.slug].diff += homeWin ? - Math.abs(match.difference) : Math.abs(match.difference)
          users[match.teamHome.defender.slug].wins += homeWin ? 0 : 1
        }

        if (!Object.keys(users).includes(match.teamHome.striker.slug)) {
          users[match.teamHome.striker.slug] = Object.assign({},
            {
              id: match.teamHome.striker._id,
              name: match.teamHome.striker.name,
              points: match.teamHome.striker.points
            },
            {
              diff: homeWin ? - Math.abs(match.difference) : Math.abs(match.difference),
              wins: homeWin ? 1 : 0
            })
        } else {
          users[match.teamHome.striker.slug].diff += homeWin ? - Math.abs(match.difference) : Math.abs(match.difference)
          users[match.teamHome.striker.slug].wins += homeWin ? 0 : 1
        }

        if (!Object.keys(users).includes(match.teamAway.defender.slug)) {
          users[match.teamAway.defender.slug] = Object.assign({},
            {
              id: match.teamAway.defender._id,
              name: match.teamAway.defender.name,
              points: match.teamAway.defender.points
            },
            {
              diff: homeWin ? Math.abs(match.difference) : - Math.abs(match.difference),
              wins: homeWin ? 0 : 1
            })
        } else {
          users[match.teamAway.defender.slug].diff += homeWin ? Math.abs(match.difference) : - Math.abs(match.difference)
          users[match.teamAway.defender.slug].wins += homeWin ? 0 : 1
        }

        if (!Object.keys(users).includes(match.teamAway.striker.slug)) {
          users[match.teamAway.striker.slug] = Object.assign({},
            {
              id: match.teamAway.striker._id,
              name: match.teamAway.striker.name,
              points: match.teamAway.striker.points
            },
            {
              diff: homeWin ? Math.abs(match.difference) : - Math.abs(match.difference),
              wins: homeWin ? 0 : 1
            })
        } else {
          users[match.teamAway.striker.slug].diff += homeWin ? Math.abs(match.difference) : - Math.abs(match.difference)
          users[match.teamAway.striker.slug].wins += homeWin ? 0 : 1
        }
      })

      console.log('='.repeat(20))
      console.log(users)
      console.log('='.repeat(20))

      Object.keys(users).map(key => {
        users[key].points = users[key].points + users[key].diff
      })

      console.log('='.repeat(20))
      console.log(users)
      console.log('='.repeat(20))

      const updateMatches = []

      docs.forEach((match, index) => {
        const newMatch = createMatchFromOriginal(match, users)
        console.log(newMatch.teamHome.defender.points)
        users[newMatch.teamHome.defender.slug].points = newMatch.teamHome.defender.points
        users[newMatch.teamHome.striker.slug].points = newMatch.teamHome.striker.points
        users[newMatch.teamAway.defender.slug].points = newMatch.teamAway.defender.points
        users[newMatch.teamAway.striker.slug].points = newMatch.teamAway.striker.points
        updateMatches.push(newMatch)
      })

      // console.log('='.repeat(20))
      // console.log(users)
      // console.log('='.repeat(20))

      // Object.keys(users).map(user => {
      //   updateUser({ id: user.id, score: user.points + user.diff })
      // })


      // console.log('='.repeat(20))
      // console.log(updateMatches)
      // console.log('='.repeat(20))
    })
  })
})

const createMatchFromOriginal = (original, users) => {
  const slug = Match.generateSlug()
  const createdAt = original.createdAt
  const badges = []

  const match = {
    teamHome: {
      defender: {
        _id: original.teamHome.defender._id,
        slug: original.teamHome.defender.slug,
        points: users[original.teamHome.defender.slug].points
      },
      striker: {
        _id: original.teamHome.striker._id,
        slug: original.teamHome.striker.slug,
        points: users[original.teamHome.striker.slug].points
      },
      score: original.teamHome.score,
      defScore: original.teamHome.defScore,
      strScore: original.teamHome.strScore,
      defBadges: [],
      strBadges: []
    },
    teamAway: {
      defender: {
        _id: original.teamAway.defender._id,
        slug: original.teamAway.defender.slug,
        points: users[original.teamAway.defender.slug].points
      },
      striker: {
        _id: original.teamAway.striker._id,
        slug: original.teamAway.striker.slug,
        points: users[original.teamAway.striker.slug].points
      },
      score: original.teamAway.score,
      defScore: original.teamAway.defScore,
      strScore: original.teamAway.strScore,
      defBadges: [],
      strBadges: []
    }
  }

  const rank = rankify.calculate({
    teamHome: match.teamHome,
    teamAway: match.teamAway
  })
  const matchData = {
    teamHome: match.teamHome,
    teamAway: match.teamAway,
    badges,
    slug,
    createdAt,
    difference: rank.difference
  }

  return matchData
}

const updateUser = async ({id, score, res}) => {
  const query = { _id: id }
  await User.findOneAndUpdate(query, { points: score }, {}, function (err, rs) {
    // if (err) return res.json({ error: err.message || err.toString() })
  })
}

router.post('/stats/users/update', async (req, res) => {
  let users = await User.find({ active: true }).sort({ points: -1 })


  users.forEach(user => {
    user.points = 1200
    user.stats.points_max = user.points
    user.stats.points_min = user.points
    user.stats.points_trend = 0
    let query = Match.find({})
    // query by one of the roles match with user id
    query.or([
      { 'teamHome.defender': user._id },
      { 'teamHome.striker': user._id },
      { 'teamAway.defender': user._id },
      { 'teamHome.striker': user._id }
    ]).populate([
      {path: 'teamHome.defender', model: 'User'},
      {path: 'teamHome.striker', model: 'User'},
      {path: 'teamAway.defender', model: 'User'},
      {path: 'teamAway.striker', model: 'User'}
    ]).sort({ createdAt: 1 })

    query.exec((err, docs) => {
      if (err) {
        console.log(err)
      } else {
        // console.log('='.repeat(50))

        // console.log(docs)
        // console.log('='.repeat(50))
        let matchCount = 0
        let winCount = 0
        let asDefender = 0
        let asStriker = 0
        let asDefenderWin = 0
        let asStrikerWin = 0
        let matchGoalsMade = 0
        let matchGoalsConceded = 0
        let matchGoalsMadeAsDefender = 0
        let matchGoalsConcededAsDefender = 0

        let crawlCount = 0
        let crawledCount = 0

        let winSteak = 0
        let maxWinSteak = 0

        docs.forEach(match => {
          let roleSelector = ''
          let teamSelector = ''
          let oppositeTeamSelector = ''
          let roleteamSelector = ''
          console.log(match._id)

          if (match.teamHome.defender.equals(user._id)) {
            roleSelector = 'defender'
            teamSelector = 'teamHome'
            roleteamSelector = 'homeDefense'
            oppositeTeamSelector = 'teamAway'
            asDefender++
          } else if (match.teamHome.striker.equals(user._id)) {
            roleSelector = 'striker'
            teamSelector = 'teamHome'
            roleteamSelector = 'homeStriker'
            oppositeTeamSelector = 'teamAway'
            asStriker++
          } else if (match.teamAway.defender.equals(user._id)) {
            roleSelector = 'defender'
            teamSelector = 'teamAway'
            roleteamSelector = 'awayDefense'
            oppositeTeamSelector = 'teamHome'
            asDefender++
          } else if (match.teamAway.striker.equals(user._id)) {
            roleSelector = 'striker'
            teamSelector = 'teamAway'
            roleteamSelector = 'awayStriker'
            oppositeTeamSelector = 'teamHome'
            asStriker++
          }
          console.log(`${user.name} - id: ${user._id} - matchDate: ${match.createdAt}`)
          // console.log(`${user.name} - id: ${user._id} - ${match.teamHome.defender} - ${match.teamHome.defender.equals(user._id)}`)

          // console.log(`teamSelector - ${teamSelector} - ${match[teamSelector]}`)
          // console.log(`oppositeTeamSelector - ${oppositeTeamSelector} - ${match[oppositeTeamSelector]}`)

          if (roleSelector === 'defender') {
            matchGoalsMadeAsDefender += match[teamSelector].defScore || 0
          } else {
            matchGoalsConcededAsDefender += match[oppositeTeamSelector].score
          }

          matchCount++
          matchGoalsMade += match[teamSelector].score
          matchGoalsConceded += match[oppositeTeamSelector].score
          if (match[teamSelector].score > match[oppositeTeamSelector].score) {
            winCount++
            winSteak++

            if (roleSelector === 'defender') {
              asDefenderWin++
            } else {
              asStrikerWin++
            }
            if (Math.abs(match[teamSelector].score - match[oppositeTeamSelector].score) > 2) {
              crawlCount++
            }
          } else {
            if (Math.abs(match[teamSelector].score - match[oppositeTeamSelector].score) > 2) {
              crawledCount++
            }
            winSteak = 0
          }
          const teamHome = match.teamHome
          const teamAway = match.teamAway
          const rank = rankify.calculate({
            teamHome,
            teamAway
          })

          console.log('POINTS:',user.points, rank[roleteamSelector], rank, roleteamSelector)

          if(user.stats.points_min > rank[roleteamSelector]) {
            user.stats.points_min = rank[roleteamSelector]
          }

          if(user.stats.points_max < rank[roleteamSelector]) {
            user.stats.points_max = rank[roleteamSelector]
          }

          user.stats.points_trend = 0

          if(!user.stats.points_trend && !(rank[roleteamSelector] - user.points)){
            user.stats.points_trend+=(rank[roleteamSelector] - user.points)
          } else {
            user.stats.points_trend = (rank[roleteamSelector] - user.points)
          }

        })

        user.stats.match_played = matchCount
        user.stats.match_win = winCount
        user.stats.match_as_defender = asDefender
        user.stats.match_as_striker = asStriker
        user.stats.win_as_defender = asDefenderWin
        user.stats.win_as_striker = asStrikerWin
        user.stats.match_goals_made = matchGoalsMade
        user.stats.match_goals_conceded = matchGoalsConceded
        user.stats.match_goals_made_as_defender = matchGoalsMadeAsDefender
        user.stats.match_goals_conceded_as_defender = matchGoalsConcededAsDefender
        user.stats.match_crawl = crawlCount
        user.stats.match_crawled = crawledCount

        console.log('='.repeat(50))
        console.log(`${user.name} - id: ${user._id}`)
        console.log(`user stats: ${user.stats}`)
        console.log('='.repeat(50))
      }
    })

//     teamHome:
// score-web  |      { defBadges: [],
// score-web  |        strBadges: [],
// score-web  |        defender: 5b62cf4164c62f002640c216,
// score-web  |        striker: 5b62cf0d64c62f002640c214,
// score-web  |        score: 1,
// score-web  |        defScore: 0,
// score-web  |        strScore: 1 },
// score-web  |     teamAway:
// score-web  |      { defBadges: [],
// score-web  |        strBadges: [],
// score-web  |        defender: 5b62cf2b64c62f002640c215,
// score-web  |        striker: 5b62ced164c62f002640c213,
// score-web  |        score: 6,
// score-web  |        defScore: 3,
// score-web  |        strScore: 3 },
// score-web  |     badges: [],
// score-web  |     _id: 5b857b1abc7a3f00e81bbf54,
// score-web  |     slug: '244dc480-aae1-11e8-8a0c-65aa6973dc4b',
// score-web  |     createdAt: 2018-08-28T16:40:58.824Z,
// score-web  |     difference: 14

    // user.win_streak =
    // user.max_win_streak =
    // user.points_trend =
    // user.points_max =
    // user.points_min =
  })

  // const { slug, name, avatarUrl } = req.body
  // const query = { slug: slug }
  // User.findOneAndUpdate(query, { name, avatarUrl }, {}, function (err, rs) {
  //   if (err) return res.json({ error: err.message || err.toString() })
  //   res.json(rs)
  // })

  // const users = await User.find({ active: true }).sort({ points: -1 })
  // res.json(users);

  res.send('ok')
})

// router.delete('/delete/:userId', (req, res) => {
//   const id = req.params.userId
//   const query = { _id: id }
//   User.findOneAndUpdate(query, { active: false }, {}, function (err, rs) {
//     if (err) return res.json({ error: err.message || err.toString() })
//     res.json(rs)
//   })
// })

module.exports = router
