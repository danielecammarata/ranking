const express = require('express')

const app = express()

const matchGet = require('./get')
const matchAdd = require('./add')
const matchAddSlack = require('./addSlack')

app.use('/get', matchGet)
app.use('/add', matchAdd)
app.use('/addSlack', matchAddSlack)

app.on('mount', () => {
  console.log(`[${new Date(Date.now()).toTimeString().substr(0, 8)}] match Api is available at ${'%s'}`, app.mountpath)
});

module.exports = app
