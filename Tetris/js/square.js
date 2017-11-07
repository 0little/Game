var Square = function (type, dir) {
    //方块数据
    this.data = [];
    //原点
    this.origin = {
        x: 0,
        y: 4
    };
    //方向
    this.dir = 0;
    //旋转数组
    this.rotates = [];

    switch(type) {
        case 1:
            this.data = square1Rotate[dir];
            this.rotates = square1Rotate;
            break;
        case 2:
            this.data = square2Rotate[dir];
            this.rotates = square2Rotate;
            break;
        case 3:
            this.data = square3Rotate[dir];
            this.rotates = square3Rotate;
            break;
        case 4:
            this.data = square4Rotate[dir];
            this.rotates = square4Rotate;
            break;
        case 5:
            this.data = square5Rotate[dir];
            this.rotates = square5Rotate;
            break;
        case 6:
            this.data = square6Rotate[dir];
            this.rotates = square6Rotate;
            break;
        case 7:
            this.data = square7Rotate[dir];
            this.rotates = square7Rotate;
            break;
    }

};

Square.prototype.canMove = function (isValid, direction) {
    var test = {};
    switch (direction) {
        case "left" :
            test.x = this.origin.x;
            test.y = this.origin.y - 1;
            break;
        case "right" :
            test.x = this.origin.x;
            test.y = this.origin.y + 1;
            break;
        case "down" :
            test.x = this.origin.x + 1;
            test.y = this.origin.y;
            break;
    }

    return isValid(test, this.data);
};

Square.prototype.move = function (direction) {

    switch (direction) {
        case "left" :
            this.origin.y = this.origin.y - 1;
            break;
        case "right" :
            this.origin.y = this.origin.y + 1;
            break;
        case "down" :
            this.origin.x = this.origin.x + 1;
            break;
    }
};

Square.prototype.canRotate = function (isValid) {
    var d = (this.dir + 1) % 4;

    var test = this.rotates[d];

    return isValid(this.origin, test);
};

Square.prototype.rotate = function () {
    this.dir = (this.dir + 1) % 4;
    this.data = this.rotates[this.dir];
};

    /*
    //方块数据
    this.data = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];
    //原点
    this.origin = {
        x: 0,
        y: 0
    };

    //方向
    this.dir = 0;

    //旋转数组
    this.rotates = [
        [
            [0, 2, 0, 0],
            [0, 2, 0, 0],
            [0, 2, 0, 0],
            [0, 2, 0, 0]
        ],
        [
            [0, 0, 0, 0],
            [2, 2, 2, 2],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        [
            [0, 2, 0, 0],
            [0, 2, 0, 0],
            [0, 2, 0, 0],
            [0, 2, 0, 0]
        ],
        [
            [0, 0, 0, 0],
            [2, 2, 2, 2],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ]
    ];
};

Square.prototype.canMove = function (isValid, direction) {
    var test = {};
    switch (direction) {
        case "left" :
            test.x = this.origin.x;
            test.y = this.origin.y - 1;
            break;
        case "right" :
            test.x = this.origin.x;
            test.y = this.origin.y + 1;
            break;
        case "down" :
            test.x = this.origin.x + 1;
            test.y = this.origin.y;
            break;
    }

    return isValid(test, this.data);
};

Square.prototype.move = function (direction) {

    switch (direction) {
        case "left" :
            this.origin.y = this.origin.y - 1;
            break;
        case "right" :
            this.origin.y = this.origin.y + 1;
            break;
        case "down" :
            this.origin.x = this.origin.x + 1;
            break;
    }
};

Square.prototype.canRotate = function (isValid) {
    var d = (this.dir + 1) % 4;

    var test = this.rotates[d];

    return isValid(this.origin, test);
};

Square.prototype.rotate = function () {
    this.dir = (this.dir + 1) % 4;
    this.data = this.rotates[this.dir];
};
*/
