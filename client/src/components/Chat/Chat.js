import React, { useState, useEffect } from 'react'
import queryString from 'query-string'
import oi from 'socket.io-client'

import './Chat.css'

let socket

const Chat = ({ location }) => {
  const [name, setName] = useState('')
  const [room, setRoom] = useState('')
  const ENDPOINT = 'localhost:5000'

  useEffect(() => {

    const { name, room } = queryString.parse(location.search)

    socket = oi(ENDPOINT)

    setName(name)
    setRoom(room)

    socket.emit('join', { name, room }, () => {

    })

    return () => {
      socket.emit('disconnect')

      socket.off()
    }

  }, [ENDPOINT, location.search])

  return (
    <h1>Olha {name}. Você está na sala {room}.</h1>
  )
}

export default Chat