
window.onload = function() {

    var messages = [];
    var socket = io.connect('http://localhost:3700');
    var field = document.getElementById("chat-textarea");
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
            
            scrollSmoothToBottom();
    }
        //what is this? -danny
    socket.emit('send', { message: field.value });
};

function scrollSmoothToBottom() {
    var myElement = document.getElementById('chat-messages');
    var topPos = myElement.offsetTop*2;

    document.getElementById('chat-messages').scrollTop += topPos;
}