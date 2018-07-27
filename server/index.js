const express = require('express')
const next = require('next')
const mongoose = require('mongoose')
const api = require('./api')

require('dotenv').config()

const dev = process.env.NODE_ENV !== 'production'
const port = process.env.PORT || 8000
const ROOT_URL = dev ? `http://localhost:${port}` : 'https://builderbook.org'

const MONGO_URL = dev ? process.env.MONGO_URL_TEST : process.env.MONGO_URL

process.env.offline = false

mongoose.connect(MONGO_URL, {}, err => {
  console.error(err)
  process.env.offline = true
})

const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()

  server.use(express.json())
  
  api(server)
  
  // give all Nextjs's request to Nextjs server
  server.get('*', (req, res) => {
    handle(req, res)
  })


  server.listen(port, (err) => {
    if (err) throw err
    console.info(`> Ready on ${ROOT_URL}`)
  })
})