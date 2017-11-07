var Local = function () {
    //时间间隔
    var interval = 2000;
    //游戏对象
    var game;
    //定时器
    var timer = null;
    //绑定键盘事件
    var bindKeyEvent = function () {
        document.onkeydown = function (e) {
            if(e.keyCode == 38) { //up,旋转
                game.rotate();
                socket.emit("rotate");
            } else if(e.keyCode == 39) { //right
                game.move("right");
                socket.emit("move", "right");
            } else if(e.keyCode == 40) { //down
                game.move("down");
                socket.emit("move", "down");
            } else if(e.keyCode == 37) { //left
                game.move("left");
                socket.emit("move", "left");
            } else if(e.keyCode == 32) { //space,下坠
                game.fall();
                socket.emit("fall");
            }
        };
    };

    //随时间自动下落
    var autoMove = function () {
        if(!game.move("down")) {
            //当下落到底部时，位置固定
            game.fixation();
            socket.emit("fixation");
            //对整行进行消除,并在需要加速时进行加速
            var line = game.checkClear()
            if(line) {
                game.addScore(line, document.getElementById("score"));
                socket.emit("clearLine", line);
            }
            var gameOver = game.checkGameOver(); //判断游戏是否结束
            if(gameOver) {
                socket.emit("lose");
                stop();
            } else {
                //产生下一个方块
                var t = generateType();
                var d = generateRotateTimes();
                game.performNext(t, d);
                socket.emit("next", {type: t, dir:d});
            }
        } else {
            socket.emit("move", "down");
        }
    };

    //随机生成一个方块种类
    var generateType = function () {
        return Math.ceil(Math.random() * 7);
    };

    //随机生成一个旋转次数
    var generateRotateTimes = function () {
        return Math.floor(Math.random() * 4);
    };

    //开始
    var start = function () {
        var doms = {
            gameDiv: document.getElementById("game"),
            nextDiv: document.getElementById("next")
        };

        game = new Game();
        var type = generateType();
        var dir = generateRotateTimes();
        game.init(doms, type, dir);
        socket.emit("init", {type: type, dir:dir});
        bindKeyEvent();
        var t = generateType();
        var d = generateRotateTimes();
        game.performNext(t, d);
        socket.emit("next", {type: t, dir:d});
        timer = setInterval(autoMove, interval);
    };

    //结束
    var stop = function() {
        if(timer) {
            clearInterval(timer);
            timer = null;
            alert("游戏结束");
        }

        document.onkeydown = null; //清除键盘相关事件
    };

    socket.on("start", function () {
        document.getElementById("waiting").innerHTML = "";
        start();
    });


};