
const express = require('express')

const router = express.Router()

// router.get('/books', async (req, res) => {
//   try {
//     const books = await Book.list();
//     res.json(books);
//   } catch (err) {
//     res.json({ error: err.message || err.toString() });
//   }
// })

router.get('/get', (req, res) => {
  try {
    const matches = [
      {
        id: 1,
        date: '2018/07/25',
        homeTeam: {
          userId: 1,
          userId: 2,
          score: 6
        },
        awayTeam: {
          userId: 3,
          userId: 4,
          score: 4
        }
      }
    ]
    res.json(matches);
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
  try {
    const users = [
      {
        name: 'Mucci',
        points: 1200
      },
      {
        name: 'Moioli',
        points: 1700
      },
      {
        name: 'Slow',
        points: 950
      },
      {
        name: 'Boss',
        points: 2500
      },
      {
        name: 'Gabo',
        points: 1200
      }
    ]
    res.json(users);
  } catch (err) {
    res.json({ error: err.message || err.toString() });
  }
})

module.exports = router
