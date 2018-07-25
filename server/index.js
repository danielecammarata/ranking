// const express = require('express')
// const home = require('./home')
// const player = require('./player')
// const match = require('./match')
// const add = require('./add')

// const app = express()

// // app.get('/', (req, res) => {
// //     res.send('ok')
// // })

// app.use(home)
// app.use(player)
// app.use(match)
// app.use(add)

// app.listen(3000, ()=> {
//     console.log(`App started on port: ${3000}`)
// })
const express = require('express')
const next = require('next')
const mongoose = require('mongoose')
const api = require('./api')

const dev = process.env.NODE_ENV !== 'production'
const port = process.env.PORT || 8000
const ROOT_URL = dev ? `http://localhost:${port}` : 'https://builderbook.org'

const MONGO_URL = dev ? process.env.MONGO_URL_TEST : process.env.MONGO_URL

mongoose.connect(MONGO_URL)

const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()
  
  api(server)
  
  // give all Nextjs's request to Nextjs server
  server.get('*', (req, res) => {
    handle(req, res);
  })


  server.listen(port, (err) => {
    if (err) throw err;
    console.info(`> Ready on ${ROOT_URL}`);
  })
})