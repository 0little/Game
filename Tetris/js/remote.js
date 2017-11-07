var Remote = function (socket) {
    //游戏对象
    var game;
    
    var bindEvents = function () {
        socket.on("init", function (data) {
            start(data.type, data.dir);
        });

        socket.on("next", function (data) {
            game.performNext(data.type, data.dir);
        });

        socket.on("rotate", function (data) {
            game.rotate();
        });

        socket.on("move", function (data) {
            game.move(data);
        });

        socket.on("fall", function (data) {
            game.fall();
        });

        socket.on("clearLine", function (data) {
            game.checkClear();
            game.addScore(data, document.getElementById("anotherScore"));
        });

        socket.on("lose", function (data) {
            alert("对方已经挂掉啦！你继续加油哦。")
        });
    };

    //开始
    var start = function (type, dir) {
        var doms = {
            gameDiv: document.getElementById("anotherGame"),
            nextDiv: document.getElementById("anotherNext")
        };

        game = new Game();
        game.init(doms, type, dir);

    };

    bindEvents();
};