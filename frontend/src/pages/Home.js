import React, { useCallback, useState,useEffect } from 'react'
import { useSocket } from '../Context/SocketProvider'
import { useNavigate } from 'react-router-dom'

function Home() {
    const [email, setEmail] = useState('')
    const [room, setRoom] = useState('')

    const socket = useSocket()
    const nevigate = useNavigate()
    // console.log(socket)

    const handleSumbit = useCallback((e)=>{
          e.preventDefault()
          socket.emit("room:join",{email,room})
      },[email,room,socket]
    )

    const handleJoinRoom = useCallback(
      (data) => {
        const {email,room} = data
        nevigate(`/room/${room}`)
      },
      [],
    )
    

    useEffect(() => {
      socket.on('room:join',handleJoinRoom)
      return ()=>{
        socket.off("room:join",handleJoinRoom)
      }
    }, [socket])
    

  return (
    <>
    <div>Home</div>
    <form onSubmit={handleSumbit}>
        <label htmlFor="fname">Email : </label>
        <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} /><br/>
        <label htmlFor="lname">Room Number : </label>
        <input type="text" value={room} onChange={(e)=>setRoom(e.target.value)} /><br/>
        <button>Join</button>
    </form>
    </>
  )
}

export default Home