// /index.js

const config = require('config.json')('./config.json'), logger = require('winston'), morgan= require('morgan')

logger.info('[APP] Starting server initialization')
const dbConnection = require('./init/database')
dbConnection({logger, config})
//server()


const restify = require('restify'), restifyPlugins = require('restify-plugins'),
    corsMiddleware = require('restify-cors-middleware'), path = require('path')


// Configure restify

const cors = corsMiddleware({
    preflightMaxAge: 5, //Optional
    origins: ['*'],
    allowHeaders: ['API-Token'],
    exposeHeaders: ['API-Token-Expiry']
})


const server = restify.createServer()

server
    .pre(cors.preflight)
    .use(cors.actual)
    .use(restifyPlugins.fullResponse())
    .use(restifyPlugins.acceptParser(server.acceptable))
    .use(restifyPlugins.jsonBodyParser())
    .use(restifyPlugins.queryParser())
    if(process.env.NODE_ENV !=='test'){
        server.use(morgan('common'))
    }

logger.info('[SERVER] Initializing routes')
require('./app/routes')(server)


server.listen(config.port)
logger.info('[SERVER] Listening on port ' + config.port)

module.exports = server