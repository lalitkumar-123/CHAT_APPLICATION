import React, {useState,useEffect} from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'
import './Chat.css'
import InfoBar from './InfoBar.js'
import Input from './Input.js'
import Messages from './Messages.js'
import TextContainer from './TextContainer.js'

const endpoint = 'http://localhost:5000';

function Chat({ location }) {
    const [name,setName] = useState('');
    const [room,setRoom] = useState('');
    const [users,setUsers] = useState('');
    const [messages,setMessages] = useState([]);
    const [message,setMessage] = useState([]);

    const connectionOptions =  {
            "force new connection" : true,
            "reconnectionAttempts": "Infinity", 
            "timeout" : 10000,                  
            "transports" : ["websocket"]
    };

    const soc = io.connect(endpoint,connectionOptions);

    useEffect(() => {
        const {name,room} = queryString.parse(location.search);
        setName(name);
        setRoom(room);
        soc.emit('join', {name,room}, (error) => {
             if(error) {
                alert(error);
            }
        });
        return () => {
            soc.emit('disconnect');
            soc.off();
        }
    },[endpoint, location.search]);

        

    useEffect(() => { 
        soc.on('message', (message) => {
            setMessages(messages => [ ...messages, message ]);
        })

        soc.on('roomData', ({ users }) => {
            setUsers(users);
        });
    },[]);

    const sendMessage = (e) =>
    {
        e.preventDefault();
        if(message)
        {
            // setMessages(messages => [ ...messages, {user: name, text: message} ]);
            soc.emit('sendMessage', {message,name} , () => setMessage(''));
        }
    }

    return (
        <div className="outercontainer">
            <div className="container">
                <InfoBar room={room} />
                <Messages messages={messages} name={name} />
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
            <TextContainer users={users}/>
        </div>
    )
}

export default Chat;
