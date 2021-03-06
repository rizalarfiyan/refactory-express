#!/usr/bin/env node
/* eslint-disable no-use-before-define */

import debugLib from 'debug'
import { createServer } from 'http'
import app from '../app'

const debug = debugLib('your-project-name:server')

const port = normalizePort(process.env.PORT || '3000')
app.set('port', port)

const server = createServer(app)
server.listen(port)
server.on('error', onError)
server.on('listening', onListening)

function normalizePort(val) {
  const myPort = parseInt(val, 10)

  if (Number.isNaN(myPort)) {
    return val
  }

  if (myPort >= 0) {
    return myPort
  }

  return false
}

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error
  }
  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`)
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`)
      process.exit(1)
      break
    default:
      throw error
  }
}

function onListening() {
  const addr = server.address()
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`
  debug(`Listening on ${bind}`)
}
