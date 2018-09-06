const express = require('express')
const router = express.Router()
const Match = require('../../models/Match')
const User = require('../../models/User')
const { GetMatchesStartingFromDateAndUsersFromMatchId, GetNewUsersPointsDeletingMatch } = require('./helper')

router.route('/').post(async (req, res) => {
  const { matchId } = req.body

  const deleteMatch =
    await Match.findById(matchId).populate([
      {path: 'teamHome.defender', model: 'User'},
      {path: 'teamHome.striker', model: 'User'},
      {path: 'teamAway.defender', model: 'User'},
      {path: 'teamAway.striker', model: 'User'}
    ]).exec()

  const deleteMatchUsersUpdate = GetNewUsersPointsDeletingMatch(deleteMatch)

  Object.keys(deleteMatchUsersUpdate).forEach(async key => {
    const query = { _id: deleteMatchUsersUpdate[key].id }
    const update = { points: deleteMatchUsersUpdate[key].points }

    await User.findOneAndUpdate(query, update, (err, doc) => {})
  })

  const deleteMatchExec = Match.deleteOne({ _id: matchId }).exec()

  const calculatingMatch =
    await Match
      .findOne({createdAt: { $gt: deleteMatch.createdAt }})
      .sort({ createdAt: 1 })
      .populate([
        {path: 'teamHome.defender', model: 'User'},
        {path: 'teamHome.striker', model: 'User'},
        {path: 'teamAway.defender', model: 'User'},
        {path: 'teamAway.striker', model: 'User'}
      ])
      .exec()

  if (calculatingMatch) {
    const result = await GetMatchesStartingFromDateAndUsersFromMatchId(calculatingMatch._id)

    res.json({
      deleteMatch,
      deleteMatchUsersUpdate,
      calculatingMatch,
      result
    })

    result.matches.forEach(async match => {
      const query = { _id: match._id }
      const update = { difference: match.difference }
      await Match.findOneAndUpdate(query, update, (err, doc) => {})
    })

    Object.keys(result.users).forEach(async key => {
      const query = { _id: result.users[key].id }
      const update = { points: result.users[key].points }

      await User.findOneAndUpdate(query, update, (err, doc) => {})
    })

    res.json(result)
  } else {
    res.json({ success: true })
  }
})

module.exports = router
