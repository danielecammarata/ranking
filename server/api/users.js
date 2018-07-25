
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
    const users = [
      {
        id: 1,
        name: 'Mucci',
        points: 1200
      },
      {
        id: 2,
        name: 'Moioli',
        points: 1700
      },
      {
        id: 3,
        name: 'Slow',
        points: 950
      },
      {
        id: 4,
        name: 'Boss',
        points: 2500
      }
    ]
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
  try {
    const users = [
      {
        id: 1,
        name: 'Mucci',
        points: 1200
      },
      {
        id: 2,
        name: 'Moioli',
        points: 1700
      },
      {
        id: 3,
        name: 'Slow',
        points: 950
      },
      {
        id: 4,
        name: 'Boss',
        points: 2500
      },
      {
        id: 5,
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
