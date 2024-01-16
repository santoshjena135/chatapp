const socket = io('http://localhost:8000');
const name = prompt("What shall we call you?");
socket.emit('new-user-joined',name);
socket.on('user-joined',data=>{
    appendUserStatus(data)
})
socket.on('recieve',data=>{
    appendMessage(data.name, data.message, 'left');
})

function appendMessage(name, message, position) {
    var currentTime = new Date();
    var timestamp = (currentTime.getHours()>=12? currentTime.getHours()-12 : currentTime.getHours())+":"+currentTime.getMinutes()+(currentTime.getHours()>=12 ? ' PM':' AM');
    var container = document.getElementById("container");
    var msgcontainer = document.createElement("div");
    msgcontainer.className = "message " + position;
    msgcontainer.innerHTML = `
        <div class="sendername">${(position == 'right')? 'You': name}</div>
        <div class="msgtext">${message}</div>
        <div class="timestamp">${timestamp}</div>
    `;
    container.append(msgcontainer);
}
function appendUserStatus(name){
    var container = document.getElementById("container");
    var msgcontainer = document.createElement("div");
    msgcontainer.className = "userjoined"
    msgcontainer.innerHTML = `${name} joined the chat!`;
    container.append(msgcontainer);
}

$( document ).ready(function() {
    $('.btnsendmsg').on('click',()=>{
        var msg = $('.inputsendmsg').val();
        if(msg != ""){
            appendMessage('name', msg, 'right');
            $('.inputsendmsg').val('');
            socket.emit('send',msg);
        }
    })
})