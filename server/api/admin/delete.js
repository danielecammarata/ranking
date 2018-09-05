const express = require('express')
const router = express.Router()
const Match = require('../../models/Match')

router.route('/').post(async (req, res) => {
  // const { matchId } = req.body

  // const result = await GetMatchesStartingFromDateAndUsersFromMatchId(matchId)

  // result.matches.forEach(async match => {
  //   const query = { _id: match._id }
  //   const update = { difference: match.difference }
  //   await Match.findOneAndUpdate(query, update, (err, doc) => {})
  // })

  // Object.keys(result.users).forEach(async key => {
  //   console.log(result.users[key])
  //   const query = { _id: result.users[key].id }
  //   const update = { points: result.users[key].points }

  //   await User.findOneAndUpdate(query, update, (err, doc) => {})
  // })

  // res.json(result)


  const id = req.params.match_id
  Match.findById(id).remove().exec()

  return res.send('ok')
})

module.exports = router
