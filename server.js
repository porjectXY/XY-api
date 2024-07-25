import http from 'http'
import './api/config/database.js'
import api from './api/api.js'
import { Server } from 'socket.io'

const server = http.createServer(api)

const io = new Server(server, {
  cors: {
    origin: '*'
  }
})

server.on('listening', () => {
  console.info('server running http://localhost:8000')
})

io.on('connection', (socket) => {
  console.log('New client connected')
  io.emit('message', 'se ha conectado otro usuario')

  socket.on('message', (msgObj) => {
    console.log('Message received:', msgObj)
    io.emit('message', msgObj)
  })
})

server.listen(8000)
