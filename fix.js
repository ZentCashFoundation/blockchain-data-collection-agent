// Copyright (c) 2025 ZentCash Developers
//
// Please see the included LICENSE file for more information.

'use strict'

require('dotenv').config()
const DatabaseBackend = require('./lib/databaseBackend')
const Logger = require('./lib/logger')

const badBlockStart = parseInt(process.argv[2])

const database = new DatabaseBackend({
  host: process.env.MYSQL_HOST || 'localhost',
  port: process.env.MYSQL_PORT || 3306,
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  connectionLimit: process.env.MYSQL_CONNECTION_LIMIT || 10
})

Logger.info('Database will be rewound to block #%s', badBlockStart - 1)

if (badBlockStart === 0) {
  database.getLastKnownBlockHeight()
    .then(height => Logger.info('Database contains blocks up to block #%s', height || 0))
    .then(() => Logger.warning('Resetting entire database...'))
    .then(() => { return database.reset() })
    .then(results => Logger.warning('Truncated %s database tables', results))
    .then(() => Logger.info('Database reset complete'))
    .then(() => process.exit(0))
    .catch(error => {
      Logger.error(error)
      process.exit(1)
    })
} else {
  database.getLastKnownBlockHeight()
    .then(height => Logger.info('Database contains blocks up to block #%s', height || 0))
    .then(() => { return database.buildDeleteBlocksFromHeightQueries(badBlockStart) })
    .then(queries => { return database._insertTransaction(queries) })
    .then(results => {
      if (results.length === 0) {
        Logger.warning('No blocks found beyond block #%s', badBlockStart - 1)
      } else {
        Logger.warning('Executed %s queries', results.length)
      }
    })
    .then(() => Logger.info('Database rewound to block #%s', badBlockStart - 1))
    .then(() => process.exit(0))
    .catch(error => {
      Logger.error(error)
      process.exit(1)
    })
}