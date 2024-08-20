import React, {useEffect, useCallback, useState } from "react";
import {useSocket} from '../context/SocketProvider'


const RoomPage = () => {

    const socket = useSocket()
    const [remoteSocketId, setRemoteSocketId] = useState(null)

    const handleUserJoined = useCallback(({email, id}) => {
        console.log(email, ' joined the room')
        setRemoteSocketId(id)
    }, [])

    useEffect(() => {
        socket.on("user:joined", handleUserJoined)
        return () => {
            socket.off("user:joined", handleUserJoined)
        }
    }, [socket, handleUserJoined])

    return (
        <div>
            <h1>room page</h1>
            <h4>{remoteSocketId ? "Connected" : "No One in the Room" }</h4>
            { remoteSocketId && <button onClick="handleCallUser" >CALL</button> }
        </div>
    )
}

export default RoomPage