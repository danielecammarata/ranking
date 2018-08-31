const express = require('express')
const router = express.Router()

const Match = require('../models/Match')
const User = require('../models/User')

router.post('/stats/users/update', async (req, res) => {
  let users = await User.find({ active: true }).sort({ points: -1 })


  users.forEach(user => {

    let query = Match.find({})
    // query by one of the roles match with user id
    query.or([
      { 'teamHome.defender': user._id },
      { 'teamHome.striker': user._id },
      { 'teamAway.defender': user._id },
      { 'teamHome.striker': user._id }
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

          if (match.teamHome.defender.equals(user._id)) {
            roleSelector = 'defender'
            teamSelector = 'teamHome'
            oppositeTeamSelector = 'teamAway'
            asDefender++
          } else if (match.teamHome.striker.equals(user._id)) {
            roleSelector = 'striker'
            teamSelector = 'teamHome'
            oppositeTeamSelector = 'teamAway'
            asStriker++
          } else if (match.teamAway.defender.equals(user._id)) {
            roleSelector = 'defender'
            teamSelector = 'teamAway'
            oppositeTeamSelector = 'teamHome'
            asDefender++
          } else if (match.teamAway.striker.equals(user._id)) {
            roleSelector = 'striker'
            teamSelector = 'teamAway'
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
