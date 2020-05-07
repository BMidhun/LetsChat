const express = require('express');
const path = require('path');
const http = require('http');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');
const {userJoin,getCurrentUser, getRoomUsers,userLeave} = require('./utils/users');

const app = express();

app.use(express.static(path.join(__dirname,'public')));

const server = http.createServer(app);

const io = socketio(server);

const botName = 'Clara The Bot';

io.on('connection', socket => {

    try{

 // //Broadcasts to all users 
    // io.emit();

    

    // Socket listens when a user joins the chat

    socket.on('joinRoom',({username,rooms}) => {
    
        const user = userJoin(socket.id,username,rooms);
        if(user) {

        socket.join(user.room);

             // Welcome current user
        socket.emit('message', formatMessage(botName,"Welcome to Let's Chat"));
    
        //Broadcast when a user connects. This message will not be seen by the user who is connecting
        socket.to(user.room).emit('message',formatMessage(botName,`${user.username} has joined the chat`));
    
        io.to(user.room).emit('roomUsers',{
            room : user.room,
            users : getRoomUsers(user.room)
        });
        }
        
        })
    
        //Listen for chat message
        socket.on('chatMessage',(message) => {
            const user = getCurrentUser(socket.id);
            if(user)
                io.to(user.room).emit('message',formatMessage(user.username,message));
        });
    
        //Runs when client disconnects 
        socket.on('disconnect',() => {
            const user = userLeave(socket.id);
            if(user){
    
                io.to(user.room)
                .emit('message', 
                formatMessage(botName,`${user.username} has left the chat`)
                )
    
                io.to(user.room).emit('roomUsers',{
                    room : user.room,
                    users : getRoomUsers(user.room)
                });
                
    
            }
        })

    }catch(err) {
        io.emit('message','Please refresh the page')
    }

   
})

const PORT = process.env.PORT || 3000

server.listen(PORT, () => {
    console.log(`Server running on Port:${PORT}`)
})