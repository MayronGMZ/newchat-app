const express = require('express')
const socket = require('socket.io')
const http = require('http')

const routes = require('./routes')

const PORT = process.env.PORT || 5000

const app = express()
const server = http.createServer(app)
const io = socket(server)

io.on('connection', socket => {
  console.log('We have a new connection!!!')

  socket.on('join', ({ name, room }, callback) => {
    console.log(name, room)
  })

  socket.on('disconnect', () => console.log('User had left!!!'))
})

app.use(routes)

server.listen(PORT, () => console.log(`Server has started on port ${PORT}.`))