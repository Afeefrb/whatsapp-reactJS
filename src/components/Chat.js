import React, {useState, useEffect} from 'react';
import {Avatar,IconButton} from '@material-ui/core';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import './Chat.css';
import {useParams} from 'react-router-dom';
import db from '../firebase';
import firebase from 'firebase';
import {useStateValue} from '../StateProvider';


const Chat = () => {

    const [seed, setSeed] = useState("");
    const [input, setInput] = useState("");
    const  {roomId} = useParams(); //coming in from SidebarChat.js via <Link />
    // $SidebarChat.js$::: <Link to={`/rooms/${id}`}> =>=>
    // $App.js$::: <Route path="/rooms/:roomId"> <Chat.js> !!!YAY!!!
    const [roomName, setRoomName] = useState("");
    const [messages,setMessages] = useState([]);

    const [{user},dispatch] = useStateValue();

    useEffect(() => {
        if(roomId) {
            db.collection("rooms").doc(roomId).onSnapshot(snapshot => (
                setRoomName(snapshot.data().roomName)
            ))
        }

        db.collection("rooms").doc(roomId).collection("messages").orderBy("timestamp","asc").onSnapshot((snapshot) => (
            setMessages(snapshot.docs.map((doc) => doc.data()))
        ))
    }, [roomId])

    useEffect(() => {
        setSeed(Math.floor(Math.random () * 5000))
    }, [])

    const sendMessage = (e) => {
        e.preventDefault();
        db.collection("rooms").doc(roomId).collection("messages").add({
            message:input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        setInput("")
    }

    return (
        <div className="chat">
            <div className="chat__header">
            <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>

            <div className="chat__headerInfo">
                    <h3>{roomName}</h3>
    <p>Last seen at ... {new Date(messages[messages.length -1]?.timestamp?.toDate()).toUTCString()}</p>
                </div>
                <div className="chat__headerRight">
                <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>


            </div>
            <div className="chat__body">
                {messages.map((message) => (
                    <p className={`chat__message ${message.name === user.displayName && "chat__reciever"}`}>
                    <span className="chat__name">{message.name}</span>
                    {message.message}
                    <span className="chat__timestamp">
                        {new Date(message.timestamp?.toDate()).toUTCString()}
                    </span>
                    </p>
                ))}
               
            </div>
            <div className="chat__footer">
            <InsertEmoticonIcon/>
                <form action="">
                    <input
                      type="text"
                      placeholder="Type your message here" 
                      value={input} 
                      onChange={e => setInput(e.target.value)} />
                    <button
                    onClick={sendMessage}
                    type="submit">
                        Send Message
                </button>
                </form>
                <MicIcon />
            </div>
        </div>
    )
}

export default Chat
