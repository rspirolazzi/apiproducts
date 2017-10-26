// config/initializers/database.js
const mongoose = require('mongoose')

module.exports = ({logger, config}) => {

    // establish connection to mongodb
    mongoose.Promise = require('bluebird')
    mongoose.connect(config.db_connection, {useMongoClient: true})

    const db = mongoose.connection

    db.on('error', (err) => {
        logger.error(`[MONGODB] No se pudo conectar`)
    })

    db.once('open', () => {
        logger.info(`[MONGODB] MongoDB connected`)
    })
    return db
}
