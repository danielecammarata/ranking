
const express = require('express')

const router = express.Router()

const User = require('../models/User')

router.get('/get', async (req, res) => {
  try {
    const users = await User.list()

    res.json(users);
  } catch (err) {
    res.json({ error: err.message || err.toString() });
  }
})

router.post('/add', (req, res) => {
  const { name, avatarUrl } = req.body

  const userData = {
    name,
    slug: 'tits',
    points: 1200,
    avatarUrl,
    active: true
  }
  const newUser = new User(userData)
  newUser.save(function (err) {
    if (err) return res.json({ error: err.message || err.toString() })
    res.json(newUser)
  })
})

module.exports = router
