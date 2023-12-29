import React ,{useEffect,useCallback,useState} from 'react'
import { useSocket } from '../Context/SocketProvider'

function Calling() {
  const socket = useSocket()
  const [remoteSocketId,setRemoteSocketId] = useState(null)


  const handleUserJoined = useCallback(({ email, id }) => {
    console.log(`Email ${email} joined room`);
    setRemoteSocketId(id);
  }, []);

  useEffect(() => {
    socket.on("user:joined",handleUserJoined)
    return ()=>{
      socket.off('user:joined',handleUserJoined)
    }
  }, [socket,handleUserJoined])
  

  return (
    <>
      <h1>Calling</h1>
      <h3>{remoteSocketId ? 'Connected':'No one in room'}</h3>
      {
        remoteSocketId && <button>Call</button>
      }
    </>
  )
}

export default Calling