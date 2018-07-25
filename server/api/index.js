const usersApi = require('./users')
const matchApi = require('./match')

function api(server) {
  server.use('/api/v1/users', usersApi)
  server.use('/api/v1/match', matchApi)
}

module.exports = api