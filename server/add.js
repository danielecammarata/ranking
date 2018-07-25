const express = require('express')

const router = express.Router()

router.route('/add/player').get((req, res) => res.send('add player'))
router.route('/add/match').get((req, res) => res.send('add match'))

module.exports = router
