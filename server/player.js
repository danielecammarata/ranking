const express = require('express')

const router = express.Router()

router.route('/player/:name').get((req, res) => res.send(req.params.name))

module.exports = router