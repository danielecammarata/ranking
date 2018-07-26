
const express = require('express')

const router = express.Router()

const User = require('../models/User')

router.get('/get', async (req, res) => {
  try {
    const users = await User.find({ active:true })
    res.json(users);
  } catch (err) {
    console.log(err)
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

router.delete('/delete/:userId', (req, res) => {
  const id = req.params.userId
  const query = { _id: id }
  User.findOneAndUpdate(query, { active: false }, {}, function (err, rs) {
    if (err) return res.json({ error: err.message || err.toString() })
    console.log(err)
    console.log(rs)
    res.json(rs)
  })
})
  // try {
  //   const users = [
  //     {
  //       id: 1,
  //       name: 'Mucci',
  //       points: 1200
  //     },
  //     {
  //       id: 2,
  //       name: 'Moioli',
  //       points: 1700
  //     },
  //     {
  //       id: 3,
  //       name: 'Slow',
  //       points: 950
  //     },
  //     {
  //       id: 4,
  //       name: 'Boss',
  //       points: 2500
  //     },
  //     {
  //       id: 5,
  //       name: 'Gabo',
  //       points: 1200
  //     }
  //   ]
  //   res.json(users);
  // } catch (err) {
  //   res.json({ error: err.message || err.toString() });
  // }


module.exports = router
