const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const port = process.env.Port || '5000';

const {addUser, removeuser, getuser, getuserinroom, users} = require('./user.js');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

var idd;

io.on('connection', function(socket) {
    console.log("User has connected!!"),

    socket.on('join', ({name,room}, callback) => {
        const {error,user} = addUser({id:socket.id, name, room});
        idd = socket.id;
        if(error) return callback(error);
        socket.join(user.room);
        socket.emit('message', {user:'admin', text:`${user.name}, welcome to the room ${user.room}`});
        socket.broadcast.to(user.room).emit('message', {user:'admin', text:`${user.name}, has joined`});
        io.to(user.room).emit('roomData', { room: user.room, users: getuserinroom(user.room)});
        callback();
    }),

    socket.on('sendMessage', ({message,name},callback) => {
        const user = getuser(name);
        if(user)
        {
            io.to(user.room).emit('message', {user:user.name, text:message});
        }
        callback();
    }),

    socket.on('disconnect',() => {
        console.log("User has left!!");
        console.log(users);
        console.log(idd);
        const user = removeuser(idd);
        console.log(user);

        if(user) {
            io.to(user.room).emit('message', { user: 'admin', text: `${user.name} has left.` });
            io.to(user.room).emit('roomData', { room: user.room, users: getuserinroom(user.room)});
        }
    })
});

const router = require('./router');
const { use } = require('./router');
app.use(router);

server.listen(port, () => console.log(`server has started on ${port}`));
