const usersApi = require('./users')
const matchApi = require('./match')
const matchAdmin = require('./admin')

function api(server) {
  server.use('/api/v1/users', usersApi)
  server.use('/api/v1/match', matchApi)
  server.use('/api/v1/admin', matchAdmin)
}

module.exports = api
