
const express = require('express')

const router = express.Router()

const Match = require('../models/Match')
const User = require('../models/User')

router.get('/get/:offset/:limit/', async (req, res) => {
  const { offset = 0, limit = 2 } = req.params
  try {
    if (process.env.offline !== 'false') {
      res.json(
        [{
          id: 1,
          date: '2018/07/25',
          homeTeam: {
            defender: 1,
            striker: 2,
            score: 6
          },
          awayTeam: {
            defender: 1,
            striker: 2,
            score: 4
          }
        }]
      )
    }
    
    Match.find()
      .populate([
        {path: 'teamHome.defender', model: 'User'}, 
        {path: 'teamHome.striker', model: 'User'}, 
        {path: 'teamAway.defender', model: 'User'}, 
        {path: 'teamAway.striker', model: 'User'}
      ])
      .sort({ createdAt: -1 })
      .skip(parseInt(offset))
      .limit(parseInt(limit))
      .exec((err, rs) => {
          res.json(rs)
      })    
  } catch (err) {
    res.json({ error: err.message || err.toString() });
  }
})

router.post('/add', (req, res) => {
  const { teamAway, teamHome } = req.body
  const slug = Match.generateSlug()
  const createdAt = new Date().toISOString()
  const badges = []
  const matchData = {
    teamHome,
    teamAway,
    badges,
    slug,
    createdAt
  }
  const newMatch = new Match(matchData)
  newMatch.save(function (err) {
    if (err) return res.json({ error: err.message || err.toString() })
    res.json(newMatch)
  })
})

module.exports = router
