
window.onload = function() {

    var messages = [];
    var socket = io.connect('http://localhost:3700');
    var field = document.getElementById("chat-text");
    var sendButton = document.getElementById("send");
    var chat = document.getElementById("chat-messages");
    //var name = document.getElementById("chat-name");
    field.focus();
  
    socket.on('message', function (data) {
        if(data.message) {
            messages.push(data);
            var html = '';
            for(var i=0; i<messages.length; i++) {
                html += '<strong>' + (messages[i].username ? messages[i].username : 'Server') + ': </strong>';
                html += messages[i].message + '<br />';
            }
            chat.innerHTML = html;
        } else {
            console.log("There is a problem:", data);
        }
    });

    

    sendButton.onclick = function() {
       
            var text = field.value;
            //socket.emit('send', { message: text, username: name.value });
            socket.emit('send', { message: text });
            field.value = "";
            field.focus();
            
            scrollToBottom();
    }
        //what is this? -danny
    socket.emit('send', { message: field.value });
};

var usernames={};
var rooms=['lobby','room1','room2'];

io.on('connection', function(socket){
    socket.on('adduser', function(username){
        socker.username = username;
        socket.room = 'lobby';
        usernames[username] = username;
        socket.join('lobby');
        socket.emit('message', 'you have connected to the lobby');
        socket.broadcast.to('lobby').emit('message', username + ' has connected to this room');
        socket.emit('updaterooms',rooms,'lobby');
    });
    socket.on('switchRoom', function(newroom){
        //leave the current room(stored in session)
        socket.leave(socket.room);
        //join the new room
        socket.join(newroom);
        socket.emit('message', 'you have connected to ' + newroom);
        //send message to old room
        socket.broadcast.to(socket.room).emit('message', socket.username + ' has left the room');
        //switch socket.room to newroom
        socket.room = newroom;
        socket.broadcast.to(newroom).emit('message', socket.username + ' has joined the room');
        socket.emit('updaterooms',rooms,newroom);
    });
    //user disconnects
    socket.on('disconnect', function(){
        //remove username for global usernames list
        delete usernames[socket.username];
        //update client side list of users
        io.socket.emit('updateusers', usernames);
        //tell everyone a user has left
        socket.broadcast.emit('message', socket.username + ' has left the building');
        socket.leave(socket.room);
    });
});

socket.on('updaterooms', function(rooms,current_room){
    $('#rooms').empty();
    $.each(rooms, function(key,value){
        if(value == current_room){
            $('#rooms').append('div' + value )
        }
        else{
            $('#rooms').append('div'//<a href="#" onclick="switchRoom(\''+value+'\')">' + value + '</a></div>..
            );
        }
    });
});

function switchRoom(room){
    socket.emit('switchRoom', room);
}

function scrollToBottom() {
    document.getElementById('chat-messages').scrollTop += 1000000;
}

document.getElementById('chat-text')
    .addEventListener('keypress', function(event) {
        if (event.keyCode == 13) {
            event.preventDefault();
            document.getElementById('send').click();
        }
});
/*
document.getElementById("id_of_textbox")
    .addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode == 13) {
        document.getElementById("id_of_button").click();
    }
});
*/