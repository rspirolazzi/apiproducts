var changeCase = require('change-case')
var directories = require('require-dir')()

module.exports = function(server) {
  Object.keys(directories).forEach(function(routeName) {
    require('./' + routeName)(server)
    //server.use('/' + changeCase.paramCase(routeName), server)
  })
}