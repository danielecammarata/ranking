const express = require('express')

const router = express.Router()

router.route('/match/:date').get((req, res) => res.send(req.params.date))

module.exports = router