var app = require('http').createServer();
var io = require('socket.io')(app);

var PORT = 3000;

var clientCount = 0; //客户端计数

var socketMap = {}; //用来存储客户端的socket

app.listen(PORT);

var bindListener = function (socket, event) {
    socket.on(event, function (data) {
        if(socket.clientNum % 2 == 0) {
            socketMap[socket.clientNum-1].emit(event, data);
        } else {
            socketMap[socket.clientNum+1].emit(event, data);
        }
    });
};

io.on("connection", function (socket) {
    clientCount++;
    socket.clientNum = clientCount;
    socketMap[clientCount] = socket;

    if(clientCount % 2 == 1) {
        socket.emit("waiting", "waiting for another person");
    } else {
        socket.emit("start");
        socketMap[(socket.clientNum - 1)].emit("start");
    }

    bindListener(socket, "init");
    bindListener(socket, "next");
    bindListener(socket, "rotate");
    bindListener(socket, "move");
    bindListener(socket, "fall");
    bindListener(socket, "fixation");
    bindListener(socket, "clearLine");
    bindListener(socket, "lose");

    //断开连接时给对方玩家发送消息
    socket.on("disconnect", function () {

    });
});

console.log("websocket listening on port " + PORT);
