'use strict'

const routes = [].concat(
  require('../routes/404')
)

module.exports = {
  plugin: {
    name: 'router',
    register: (server, options) => {
      server.route(routes)
    },
  },
}
