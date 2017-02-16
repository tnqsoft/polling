var socket;
var apiUrl = 'socket-chat.php';

function init() {
    var host = "ws://127.0.0.1:9000/socketchat"; // SET THIS TO YOUR SERVER
    try {
        socket = new WebSocket(host);
        console.log('WebSocket - status ' + socket.readyState);
        socket.onopen = function(msg) {
            $('.icon-status').addClass('text-success');
            console.log("Welcome - status " + this.readyState);
        };
        socket.onmessage = function(msg) {
            let message = '<p>' + "Received: " + msg.data + '</p>';
            $('.chat-content').append(message);
        };
        socket.onclose = function(msg) {
            $('.icon-status').removeClass('text-success');
            console.log("Disconnected - status " + this.readyState);
        };
    } catch (ex) {
        console.log(ex);
    }
    $("#txtMessage").focus();
}

function send() {
    var txt, msg;
    txt = $("#txtMessage");
    msg = txt.val();
    if (!msg) {
        alert("Message can not be empty");
        return;
    }
    txt.val('');
    txt.focus();
    try {
        socket.send(msg);
        console.log('Sent: ' + msg);
    } catch (ex) {
        console.log(ex);
    }
}

function quit() {
    if (socket != null) {
        console.log("Goodbye!");
        socket.close();
        socket = null;
    }
}

function reconnect() {
    quit();
    init();
}

init();

$('#txtMessage').keyup(function(e) {
    if (e.keyCode === 13) {
        send();
    }
});
