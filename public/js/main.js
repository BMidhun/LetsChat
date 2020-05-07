const chatForm = document.getElementById('chat-form');
const chatScreen = document.querySelector('.chat-section-screen');
const LeaveChat = document.querySelector('#leave');
const RoomName  = document.getElementById('room-name');
const UserList  = document.querySelector('.chat-users')

const {username,rooms} = Qs.parse(location.search,{
    ignoreQueryPrefix:true
})



const socket = io();



socket.emit('joinRoom',{username,rooms})

socket.on('roomUsers',({room,users}) => {
   displayRoomUsers(room,users);
})

socket.on('message',message => {
        outputMessage(message);

        //Scroll to latest

      chatScreen.scrollTop = chatScreen.scrollHeight;
})

socket.emit('disconnect')

// Message post

chatForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let message = event.target.elements.msg.value;

    if(message){
      //emit message to server
    socket.emit('chatMessage',message)
    event.target.elements.msg.value = '';
    }
    
})

// Ouput message to DOM
const outputMessage  = (message) => {
    const div = document.createElement('div');
    div.classList.add('chat-box');

    div.innerHTML = `<p>
    <span class="text-user">${message.username}</span>
    <span class="text-date">${message.time}</span>
  </p>
  <h4 class="message">${message.text}</h4>
            `
  chatScreen.appendChild(div);
}

//Add room name to DOM

function displayRoomUsers (room,users) {

  RoomName.innerText = room;
  const userList = users.map(user => `<li><h3>${user.username}</h3></li>`).join('');

  UserList.innerHTML = `
    ${userList}
  `

}