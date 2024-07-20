import http from 'http'
import './api/config/database.js'
import api from './api/api.js'

const server = http.createServer(api)

server.on('listening', () => {
  console.info('server running http://localhost:8000')
})

server.listen(8000)
