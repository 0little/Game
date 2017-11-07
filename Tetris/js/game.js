var Game = function () {
  //得分
  var score = 0;
  //DOM元素
  var gameDiv;
  var nextDiv;
  //游戏矩阵
  var gameData = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ];

  //当前方块
  var cur;
  //下一个方块
  var next;
  //divs
  var nextDivs = [];
  var gameDivs = [];

  //初始化div
  var initDiv = function (container, data, divs) {
        for(var i = 0; i < data.length; i++) {
            var div = [];
            for(var j = 0; j < data[0].length; j++) {
                var newNode = document.createElement("div");
                newNode.className = "none";
                newNode.style.top = (i*20) + "px";
                newNode.style.left = (j*20) + "px";
                container.appendChild(newNode);
                div.push(newNode);
            }
            divs.push(div);
        }
    };

    //刷新div
    var refreshDiv = function (data, divs) {
        for(var i = 0; i < data.length; i++) {
            for(var j = 0; j < data[0].length; j++) {
                if(data[i][j] == 0) {
                    divs[i][j].className = "none";
                } else if(data[i][j] == 1) {
                    divs[i][j].className = "done";
                }else if(data[i][j] == 2) {
                    divs[i][j].className = "current";
                }
            }
        }
    };

    //检测点是否合法
    var check = function (pos, x, y) {
        if (pos.x + x < 0) {
            return false;
        } else if (pos.x + x >= gameData.length) {
            return false;
        } else if (pos.y + y < 0) {
            return false;
        } else if (pos.y + y >= gameData[0].length) {
            return false;
        } else if (gameData[pos.x + x][pos.y + y] == 1) {
            return false;
        }

        return true;
    };

    //检测数据是否合法
    var isValid = function (pos, data) {
        for(var i = 0; i < data.length; i++) {
            for(var j = 0; j < data.length; j++) {
                if(data[i][j] != 0) {
                    if(!check(pos, i, j)) {
                        return false;
                    }
                }
            }
        }

        return true;
    };

    //清除数据
    var clearData = function () {
        for(var i = 0; i < cur.data.length; i++) {
            for(var j = 0; j < cur.data[0].length; j++) {
                if(check(cur.origin, i, j)) {
                    gameData[i+cur.origin.x][j+cur.origin.y] = 0;
                }
            }
        }
    };

    //设置数据
    var setData = function () {
        for(var i = 0; i < cur.data.length; i++) {
            for(var j = 0; j < cur.data[0].length; j++) {
                if(check(cur.origin, i, j)) {
                    gameData[i+cur.origin.x][j+cur.origin.y] = cur.data[i][j];
                }
            }
        }
    };

    //移动
    var move = function (direction) {
        if(cur.canMove(isValid, direction)) {
            clearData();
            cur.move(direction);
            setData();
            refreshDiv(gameData, gameDivs);
            return true;
        } else {
            return false;
        }
    };

    //下坠
    var fall = function () {
        while(cur.canMove(isValid, "down")) {
            move("down");
        }
    };

    //旋转
    var rotate = function () {
        if(cur.canRotate(isValid)) {
            clearData();
            cur.rotate();
            setData();
            refreshDiv(gameData, gameDivs);
        }
    };

    //初始化
    var init = function (doms, type, dir) {
        gameDiv = doms.gameDiv;
        nextDiv = doms.nextDiv;
        next = new Square(type, dir);
        cur = new Square(type, dir);
        cur.data = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ];
        cur.origin.x = 0;
        cur.origin.y = 4;
        setData();
        initDiv(gameDiv, gameData, gameDivs);
        initDiv(nextDiv, next.data, nextDivs);
        refreshDiv(gameData, gameDivs);
        refreshDiv(next.data, nextDivs);
    };

    //当方块下落到底部时，位置固定
    var fixation = function () {
        if(!cur.canMove(isValid, "down")) {
            for(var i = 0; i < cur.data.length; i++) {
                for(var j = 0; j < cur.data[0].length; j++) {
                    //将不为0的数据进行更新，即改变方块的颜色
                    if(cur.data[i][j]) {
                        gameData[cur.origin.x + i][cur.origin.y + j] = 1;
                    }
                }
            }

            refreshDiv(gameData, gameDivs);
            return true; //表示方块已定位
        }

        return false; //方块还没有到达底部，没有对其定位
    };

    //使用下一个方块
    var performNext = function (type, dir) {
        cur = next;
        setData();
        next = new Square(type, dir);
        refreshDiv(gameData, gameDivs);
        refreshDiv(next.data, nextDivs);
    };

    //消行
    var checkClear = function () {
        var line = 0; //初始消行数为0
        for(var i = gameData.length - 1; i >= 0; i--) {
            var clear = true;
            for(var j = 0; j < gameData[0].length; j++) {
                //当发现某一行中有空缺时立即返回，判断下一行
                if(gameData[i][j] == 0) {
                    clear = false;
                    break;
                }
            }

            //clear为true，说明该行可以消除
            if(clear) {
                for(var m = i; m > 0; m--) {
                    for(var n = 0; n < gameData[0].length; n++) {
                        gameData[m][n] = gameData[m-1][n];
                    }
                }

                for(var q = 0; q < gameData[0].length; q++) {
                    gameData[0][q] = 0;
                }

                //所消行数加一
                line++;
                i++;
                refreshDiv(gameData, gameDivs);
            }
        }

        return line;
    };

    //判断游戏是否结束
    var checkGameOver = function () {
        var gameOver = false;
        for(var i = 0; i < gameData[0].length; i++) {
            if(gameData[0][i] == 1) {
                gameOver = true;
            }
        }

        return gameOver;
    };

    var addScore = function (line, targetSpan) {
        score += line;
        targetSpan.innerHTML = score;
    };

    //导出API
    this.init = init;
    this.move = move;
    this.rotate = rotate;
    this.fall = fall;
    this.fixation = fixation;
    this.performNext = performNext;
    this.checkClear = checkClear;
    this.checkGameOver = checkGameOver;
    this.addScore = addScore;
};