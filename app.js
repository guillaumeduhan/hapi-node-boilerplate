/*
 * hapi-node-boilerplate
 * 2020 Guillaume Duhan <myhappyagency@gmail.com>
 * MIT License
 */

const Hapi = require('@hapi/hapi')
const dotenv = require('dotenv')
const laabr = require('laabr')

/**
 * Load environment variables from .env file
 */
dotenv.config({ path: '.env' })

const init = async () => {
    const server = Hapi.server({
        port: 3000,
        host: 'localhost',
    })

    await server.register(require('./config/router'))
    await server.register({
        plugin: laabr,
        options: {
            formats: {
                onPostStart: ':status',
                request: ':method :remoteAddress :url :status :payload (:responseTime ms)',
                response: `:method - :remoteAddress' - :url - :status - (:responseTime ms)`,
            },
        },
    })
    await server.start()
    .then(() => {
      console.log("Launched on port: " + server.info.uri)
    })
    .catch((err) => console.log(err))
}

process.on('unhandledRejection', (err) => {
    console.log(err)
    throw err
    process.exit(1)
})

init()
