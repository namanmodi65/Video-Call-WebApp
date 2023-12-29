import React ,{useEffect,useCallback,useState} from 'react'
import ReactPlayer from 'react-player'
import peer from '../service/peer'
import { useSocket } from '../Context/SocketProvider'

function Calling() {
  const socket = useSocket()
  const [remoteSocketId,setRemoteSocketId] = useState(null)
  const [myStream,setMyStream] = useState()
  const handleUserJoined = useCallback(({ email, id }) => {
    console.log(`Email ${email} joined room`);
    setRemoteSocketId(id);
  }, []);

  const handleIncommingCall=useCallback(
    async({from,offer}) => {
      setRemoteSocketId(from)
      const stream = await navigator.mediaDevices.getUserMedia({
        audio:true,
        video:true
      })
      setMyStream(stream)
      console.log(from)
      console.log(offer)
      const ans = await peer.getAnswer(offer)
      socket.emit('call:accepted',{to:from,ans})
    },
    [],
  )
  

  const handleCallAccepted=useCallback(
    async({from,ans}) => {
      peer.setLocalDescription(ans)
      console("Call aCCEPTED")
    },
    [],
  )
  


  useEffect(() => {
    socket.on("user:joined",handleUserJoined)
    socket.on('incomming:call',handleIncommingCall)
    socket.on('call:accepted',handleCallAccepted)

    return ()=>{
      socket.off('user:joined',handleUserJoined)
      socket.off('incomming:call',handleIncommingCall)
      socket.off('call:accepted',handleCallAccepted)
    }
  }, [socket,handleUserJoined,handleIncommingCall,handleCallAccepted])
  
  const handleCallUser=useCallback(
    async() => {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio:true,
        video:true
      })
      const offer = await peer.getOffer();
      socket.emit('user:call',{to:remoteSocketId,offer})
      setMyStream(stream)
    },
    [remoteSocketId,socket],
  )
  

  return (
    <>
      <h1>Calling</h1>
      <h3>{remoteSocketId ? 'Connected':'No one in room'}</h3>
      {
        remoteSocketId && <button onClick={handleCallUser}>Call</button>
      }
      {
        
        myStream && (<>
        <h1>My Stream</h1>
         <ReactPlayer playing muted height='300px' width='400px' url={myStream} />
         </>
         )
      }
    </>
  )
}

export default Calling