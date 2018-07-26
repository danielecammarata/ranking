
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

// router.post('/books/add', async (req, res) => {
//   try {
//     const book = await Book.add(Object.assign({ userId: req.user.id }, req.body));
//     res.json(book);
//   } catch (err) {
//     logger.error(err);
//     res.json({ error: err.message || err.toString() });
//   }
// })

router.post('/add', (req, res) => {
  const userData = {
        name: 'Mucci',
        slug: 'tits',
        points: 2,
        avatarUrl: 'http://1.citynews-today.stgy.ovh/~media/original-hi/45879200115095/tacchino-2.jpg',
        active: true
      }
  var newUser = new User(userData)
  newUser.save(function (err) {
    if (err) return res.json({ error: err.message || err.toString() })
    res.json(newUser)
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
})

module.exports = router
