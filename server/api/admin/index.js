const express = require('express')

const app = express()

const adminDelete = require('./delete')
const adminUpdate = require('./update')
const adminStats = require('./stats')

app.use('/match/delete', adminDelete)

app.use('/rank/update', adminUpdate)

app.use('/stats', adminStats)

app.on('mount', () => {
  console.log(`[${new Date(Date.now()).toTimeString().substr(0, 8)}] admin Api is available at ${'%s'}`, app.mountpath)
});

module.exports = app
