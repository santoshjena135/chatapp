const io = require('socket.io')(8000);
const users ={};

io.on('connection', socket=>{
    socket.on('new-user-joined', name =>{
        //console.log(name);
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    })

    socket.on('send', message =>{
        //console.log("Msg from "+users[socket.id]+" : "+message);
        socket.broadcast.emit('recieve', {message: message, name: users[socket.id]})
    })

    
})
