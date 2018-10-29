const express = require('express')

const router = express.Router()

const Match = require('../../models/Match')
const User = require('../../models/User')

router.get('/:userID/:offset/:limit/:withCount', async (req, res) => {
  const { userID, offset = 0, limit = 2, withCount = false } = req.params

  try {
    //await Match.find({ $or: [ { teamHome: { defender: userID } }, { teamHome: { striker: userID } }, { teamAway: { defender: userID } }, { teamAway: { striker: userID } } ] }, {})
    await Match.find({ $or: [{ "teamHome.defender": userID }, { "teamHome.striker": userID }, { "teamAway.defender": userID }, { "teamAway.striker": userID }]})
      .populate([
        {path: 'teamHome.defender', model: 'User'},
        {path: 'teamHome.striker', model: 'User'},
        {path: 'teamAway.defender', model: 'User'},
        {path: 'teamAway.striker', model: 'User'}
      ])
      .sort({ createdAt: -1 })
      .skip(parseInt(offset))
      .limit(parseInt(limit))
      .exec(async (err, rs) => {
        if (withCount) {
          await Match.countDocuments({}, (err, count) => {
            res.json(
              Object.assign({}, { matches: rs }, { count: count })
            )
          })
        } else {
          res.json({ matches: rs })
        }
      })
  } catch (err) {
    res.json({ error: err.message || err.toString() });
  }
})

router.get('/:offset/:limit/:withCount', async (req, res) => {
  const { offset = 0, limit = 2, withCount = false } = req.params

  try {
    await Match.find({})
      .populate([
        {path: 'teamHome.defender', model: 'User'},
        {path: 'teamHome.striker', model: 'User'},
        {path: 'teamAway.defender', model: 'User'},
        {path: 'teamAway.striker', model: 'User'}
      ])
      .sort({ createdAt: -1 })
      .skip(parseInt(offset))
      .limit(parseInt(limit))
      .exec(async (err, rs) => {
        if (withCount) {
          await Match.countDocuments({}, (err, count) => {
            res.json(
              Object.assign({}, { matches: rs }, { count: count })
            )
          })
        } else {
          res.json({ matches: rs })
        }
      })
  } catch (err) {
    res.json({ error: err.message || err.toString() });
  }
})

router.get('/:slug', async (req, res) => {
  const _id = req.params.slug

  try {
    const match = await Match.findOne({ _id })
      .populate('teamHome.defender')
      .populate('teamHome.striker')
      .populate('teamAway.defender')
      .populate('teamAway.striker')
      .exec()
    res.json(match);
  } catch (err) {
    console.log(err)
    res.json({ error: err.message || err.toString() });
  }
})

module.exports = router
