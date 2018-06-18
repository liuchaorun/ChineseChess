/*
 * Created by liuchaorun
 * Date 18-6-14
 * Time 下午4:13
 **/
const pace = [];
const canvas = document.getElementById('canvasMap');
const cxt = canvas.getContext('2d');
const chessmans = ['King', 'Guard', 'Elephant', 'Horse', 'Rook', 'Cannon', 'Pawn', 'null'];
const startPoint = {
    x: 45,
    y: 45
};
const spacing = 69;
const map = [
    [9, 7, 5, 3, 1, 2, 4, 6, 8],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 11, 0, 0, 0, 0, 0, 10, 0],
    [16, 0, 15, 0, 14, 0, 13, 0, 12],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [32, 0, 31, 0, 30, 0, 29, 0, 28],
    [0, 27, 0, 0, 0, 0, 0, 26, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [25, 23, 21, 19, 17, 18, 20, 22, 24]
];
const redValue = {
    //奖价值
    King: [
        [0, 0, 0, 8888, 8888, 8888, 0, 0, 0],
        [0, 0, 0, 8888, 8888, 8888, 0, 0, 0],
        [0, 0, 0, 8888, 8888, 8888, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],

        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 8888, 8888, 8888, 0, 0, 0],
        [0, 0, 0, 8888, 8888, 8888, 0, 0, 0],
        [0, 0, 0, 8888, 8888, 8888, 0, 0, 0]
    ],

    //士价值
    Guard: [
        [0, 0, 0, 20, 0, 20, 0, 0, 0],
        [0, 0, 0, 0, 23, 0, 0, 0, 0],
        [0, 0, 0, 20, 0, 20, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],

        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 20, 0, 20, 0, 0, 0],
        [0, 0, 0, 0, 23, 0, 0, 0, 0],
        [0, 0, 0, 20, 0, 20, 0, 0, 0]
    ],

    //相价值
    Elephant: [
        [0, 0, 20, 0, 0, 0, 20, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 23, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 20, 0, 0, 0, 20, 0, 0],

        [0, 0, 20, 0, 0, 0, 20, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [18, 0, 0, 0, 23, 0, 0, 0, 18],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 20, 0, 0, 0, 20, 0, 0]
    ],
    //马价值
    Horse: [
        [90, 90, 90, 96, 90, 96, 90, 90, 90],
        [90, 96, 103, 97, 94, 97, 103, 96, 90],
        [92, 98, 99, 103, 99, 103, 99, 98, 92],
        [93, 108, 100, 107, 100, 107, 100, 108, 93],
        [90, 100, 99, 103, 104, 103, 99, 100, 90],

        [90, 98, 101, 102, 103, 102, 101, 98, 90],
        [92, 94, 98, 95, 98, 95, 98, 94, 92],
        [93, 92, 94, 95, 92, 95, 94, 92, 93],
        [85, 90, 92, 93, 78, 93, 92, 90, 85],
        [88, 85, 90, 88, 90, 88, 90, 85, 88]
    ],
    //车价值
    Rook: [
        [206, 208, 207, 213, 214, 213, 207, 208, 206],
        [206, 212, 209, 216, 233, 216, 209, 212, 206],
        [206, 208, 207, 214, 216, 214, 207, 208, 206],
        [206, 213, 213, 216, 216, 216, 213, 213, 206],
        [208, 211, 211, 214, 215, 214, 211, 211, 208],

        [208, 212, 212, 214, 215, 214, 212, 212, 208],
        [204, 209, 204, 212, 214, 212, 204, 209, 204],
        [198, 208, 204, 212, 212, 212, 204, 208, 198],
        [200, 208, 206, 212, 200, 212, 206, 208, 200],
        [194, 206, 204, 212, 200, 212, 204, 206, 194]
    ],
    //炮价值
    Cannon: [

        [100, 100, 96, 91, 90, 91, 96, 100, 100],
        [98, 98, 96, 92, 89, 92, 96, 98, 98],
        [97, 97, 96, 91, 92, 91, 96, 97, 97],
        [96, 99, 99, 98, 100, 98, 99, 99, 96],
        [96, 96, 96, 96, 100, 96, 96, 96, 96],

        [95, 96, 99, 96, 100, 96, 99, 96, 95],
        [96, 96, 96, 96, 96, 96, 96, 96, 96],
        [97, 96, 100, 99, 101, 99, 100, 96, 97],
        [96, 97, 98, 98, 98, 98, 98, 97, 96],
        [96, 96, 97, 99, 99, 99, 97, 96, 96]
    ],
    //卒价值
    Pawn: [
        [9, 9, 9, 11, 13, 11, 9, 9, 9],
        [19, 24, 34, 42, 44, 42, 34, 24, 19],
        [19, 24, 32, 37, 37, 37, 32, 24, 19],
        [19, 23, 27, 29, 30, 29, 27, 23, 19],
        [14, 18, 20, 27, 29, 27, 20, 18, 14],

        [7, 0, 13, 0, 16, 0, 13, 0, 7],
        [7, 0, 7, 0, 15, 0, 7, 0, 7],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]
};
let arr2Clone = function (arr) {
    let newArr = [];
    for (let i = 0; i < arr.length; i++) {
        newArr[i] = arr[i].slice();
    }
    return newArr;
};
//黑子为红字价值位置的倒置
const blankValue = {};
blankValue.Rook = arr2Clone(redValue.Rook).reverse();
blankValue.Horse = arr2Clone(redValue.Horse).reverse();
blankValue.Elephant = redValue.Elephant;
blankValue.Guard = redValue.Guard;
blankValue.King = redValue.King;
blankValue.Cannon = arr2Clone(redValue.Cannon).reverse();
blankValue.Pawn = arr2Clone(redValue.Pawn).reverse();
const bSelect = new Image();
bSelect.src = '../image/b_box.png';
const rSelect = new Image();
rSelect.src = '../image/r_box.png';

canvas.addEventListener('click', function (e) {
    let x = e.layerX;
    let y = e.layerY;
    x = x - startPoint.x + 34.5;
    y = y - startPoint.y + 34.5;
    let j = parseInt((x / 69).toString());
    let i = parseInt((y / 69).toString());
    g.clickSelect(i, j);
});

class chessman {
    constructor(i, type) {
        this.i = i;//red or blank
        this.type = type;//棋子的类型，以红方为例，0为帅，1为士，2为象，2为马，5为车，6为炮，7为兵
        this.image = new Image();
        this.image.src = `../image/${this.i}${chessmans[this.type]}.png`;
    }

    drawImage(x, y) {
        let m = this;
        cxt.drawImage(m.image, x - 35, y - 35, 70, 70);
    }
}

class player {
    constructor(type) {
        this.i = type;
        this.chess = [];
        for (let i = 0; i < 7; i++) {
            this.chess.push(new chessman(type, i,));
        }
    }
}

class gameMap {
    constructor() {
        this.gm = new Image();
        this.gm.src = '../image/checkerboard.jpg';
        let m = this;
        this.players = [];
        this.players.push(new player('blank'));
        this.players.push(new player('red'));
        this.gm.onload = function () {
            cxt.drawImage(m.gm, 0, 0);
        }
    }

    changeToType(index) {
        if (index === 1) {
            return 0;
        }
        else if (index >= 12 && index <= 16) {
            return 6;
        }
        else if (index === 0) {
            return 7;
        }
        else {
            return parseInt((index / 2).toString());
        }
    }

    firstPrint() {
        let count = 0;
        let m = this;
        for (let i = 0; i < 2; ++i) {
            for (let j of this.players[i].chess) {
                j.image.onload = function () {
                    if (++count >= 14) {
                        m.print();
                    }
                }
            }
        }
    }

    print() {
        cxt.clearRect(0, 0, 637, 708);
        cxt.drawImage(this.gm, 0, 0);
        let m = this;
        for (let i = 0; i < map.length; ++i) {
            for (let j = 0; j < map[i].length; ++j) {
                if (map[i][j] !== 0) {
                    let temp = (map[i][j] > 16 ? map[i][j] - 16 : map[i][j]);
                    let x = map[i][j] > 16 ? 1 : 0;
                    m.players[x].chess[this.changeToType(temp)].drawImage(startPoint.x + spacing * j, startPoint.y + spacing * i);
                }
            }
        }
    }

    selectSomeone(i, j) {
        if (chessmans[this.changeToType(map[i][j])] !== 'null') {
            if (map[i][j] >= 16) {
                cxt.drawImage(rSelect, startPoint.x + spacing * j - 40, startPoint.y + spacing * i - 40, 80, 80);
            }
            else {
                cxt.drawImage(bSelect, startPoint.x + spacing * j - 40, startPoint.y + spacing * i - 40, 80, 80);
            }
        }
    }
}

class computerPlayer {
    constructor() {
        this.treeDepth = 5; //4;
    }

    changeToType(index) {
        if (index === 1) {
            return 0;
        }
        else if (index >= 12 && index <= 16) {
            return 6;
        }
        else if (index === 0) {
            return 7;
        }
        else {
            return parseInt((index / 2).toString());
        }
    }

    getPoints(i, j, m, flag) {
        let chessmanType = this.changeToType(m[i][j] > 16 ? m[i][j] - 16 : m[i][j]);
        let points = [];
        let tempI = 0;
        let tempJ = 0;
        let isOne = function (i, j, targetI, targetJ) {
            let x = m[i][j] > 16 ? 0 : 1;
            let y = m[targetI][targetJ] > 16 ? 0 : 1;
            return x !== y;
        };
        if (chessmanType === 0) {//判断是否老将对老将
            let isNull = function (i, j, flag) {
                let target = {};
                if (flag === 0) {
                    for (let tempI = 7; tempI < 10; tempI++) {
                        for (let tempJ = 3; tempJ < 6; ++tempJ) {
                            if (m[tempI][tempJ] === 'King') {
                                target.j = tempJ;
                                target.i = tempI;
                            }
                        }
                    }
                }
                else {
                    for (let tempI = 0; tempI < 3; tempI++) {
                        for (let tempJ = 3; tempJ < 6; ++tempJ) {
                            if (m[tempI][tempJ] === 'King') {
                                target.j = tempJ;
                                target.i = tempI;
                            }
                        }
                    }
                }
                if (j === target.j) {
                    let f = 0;
                    for (let tempI = i + 1; tempI < target.i; ++tempI) {
                        if (m[tempI][j] !== 'null') {
                            f = 1;
                        }
                    }
                    return f === 1;
                }
                return true;
            };
            if (m[i][j] < 16) {
                if (j - 1 >= 3 && isNull(i, j, 0) && (m[i][j - 1] === 0 || isOne(i, j, i, j - 1))) {
                    points.push({i: i, j: j - 1});
                }
                if (j + 1 <= 5 && isNull(i, j, 0) && (m[i][j - 1] === 0 || isOne(i, j, i, j + 1))) {
                    points.push({i: i, j: j - 1});
                }
                if (i - 1 >= 0 && (m[i - 1][j] === 0 || isOne(i, j, i - 1, j))) {
                    points.push({i: i - 1, j: j - 1});
                }
                if (i + 1 <= 2 && (m[i + 1][j] === 0 || isOne(i, j, i + 1, j))) {
                    points.push({i: i + 1, j: j});
                }
            }
            else {
                if (j - 1 >= 3 && isNull(i, j, 1) && (m[i][j - 1] === 0 || isOne(i, j, i, j - 1))) {
                    points.push({i: i, j: j - 1});
                }
                if (j + 1 <= 5 && isNull(i, j, 1) && (m[i][j - 1] === 0 || isOne(i, j, i, j + 1))) {
                    points.push({i: i, j: j - 1});
                }
                if (i - 1 >= 0 && (m[i - 1][j] === 0 || isOne(i, j, i - 1, j))) {
                    points.push({i: i - 1, j: j});
                }
                if (i + 1 <= 2 && (m[i + 1][j] === 0 || isOne(i, j, i + 1, j))) {
                    points.push({i: i + 1, j: j});
                }
            }
        } else if (chessmanType === 1) {
            if (m[i][j] > 16) {
                if (i - 1 >= 7 && j - 1 >= 3 && (m[i - 1][j - 1] === 0 || isOne(i, j, i - 1, j - 1))) {
                    points.push({i: i - 1, j: j - 1});
                }
                if (i - 1 >= 7 && j + 1 <= 5 && (m[i - 1][j + 1] === 0 || isOne(i, j, i - 1, j + 1))) {
                    points.push({i: i - 1, j: j + 1});
                }
                if (i + 1 <= 9 && j - 1 >= 3 && (m[i + 1][j - 1] === 0 || isOne(i, j, i + 1, j - 1))) {
                    points.push({i: i + 1, j: j - 1});
                }
                if (i + 1 <= 9 && j + 1 <= 5 && (m[i + 1][j + 1] === 0 || isOne(i, j, i + 1, j + 1))) {
                    points.push({i: i + 1, j: j + 1});
                }
            }
            else {
                if (i - 1 >= 0 && j - 1 >= 3 && (m[i - 1][j - 1] === 0 || isOne(i, j, i - 1, j - 1))) {
                    points.push({i: i - 1, j: j - 1});
                }
                if (i - 1 >= 0 && j + 1 <= 5 && (m[i - 1][j + 1] === 0 || isOne(i, j, i - 1, j + 1))) {
                    points.push({i: i - 1, j: j + 1});
                }
                if (i + 1 <= 2 && j - 1 >= 3 && (m[i + 1][j - 1] === 0 || isOne(i, j, i + 1, j - 1))) {
                    points.push({i: i + 1, j: j - 1});
                }
                if (i + 1 <= 2 && j + 1 <= 5 && (m[i + 1][j + 1] === 0 || isOne(i, j, i + 1, j + 1))) {
                    points.push({i: i + 1, j: j + 1});
                }
            }
        } else if (chessmanType === 2) {
            if (m[i][j] > 16) {
                if (i - 2 >= 5 && j - 2 >= 0 && m[i - 1][j - 1] === 0 && (m[i - 2][j - 2] === 0 || isOne(i, j, i - 2, j - 2))) {
                    points.push({i: i - 2, j: j - 2});
                }
                if (i - 2 >= 5 && j + 2 <= 8 && m[i - 1][j + 1] === 0 && (m[i - 2][j + 2] === 0 || isOne(i, j, i - 2, j + 2))) {
                    points.push({i: i - 2, j: j + 2});
                }
                if (i + 2 <= 9 && j - 2 >= 0 && m[i + 1][j - 1] === 0 && (m[i + 2][j - 2] === 0 || isOne(i, j, i + 2, j - 2))) {
                    points.push({i: i + 2, j: j - 2});
                }
                if (i + 2 <= 9 && j + 2 <= 8 && m[i + 1][j + 1] === 0 && (m[i + 2][j + 2] === 0 || isOne(i, j, i + 2, j + 2))) {
                    points.push({i: i + 2, j: j + 2});
                }
            }
            else {
                if (i - 2 >= 0 && j - 2 >= 3 && m[i - 1][j - 1] === 0 && (m[i - 2][j - 2] === 0 || isOne(i, j, i - 2, j - 2))) {
                    points.push({i: i - 2, j: j - 2});
                }
                if (i - 2 >= 0 && j + 2 <= 5 && m[i - 1][j + 1] === 0 && (m[i - 2][j + 2] === 0 || isOne(i, j, i - 2, j + 2))) {
                    points.push({i: i - 2, j: j + 2});
                }
                if (i + 2 <= 2 && j - 2 >= 3 && m[i + 1][j - 1] === 0 && (m[i + 2][j - 2] === 0 || isOne(i, j, i + 2, j - 2))) {
                    points.push({i: i + 2, j: j - 2});
                }
                if (i + 2 <= 2 && j + 2 <= 5 && m[i + 1][j + 1] === 0 && (m[i + 2][j + 2] === 0 || isOne(i, j, i + 2, j + 2))) {
                    points.push({i: i + 2, j: j + 2});
                }
            }
        } else if (chessmanType === 3) {
            if (i - 1 >= 0 && j - 2 >= 0 && (m[i - 1][j - 2] === 0 || isOne(i, j, i - 1, j - 2)) && m[i][j - 1] === 0) {
                points.push({i: i - 1, j: j - 2});
            }
            if (i - 1 >= 0 && j + 2 <= 8 && (m[i - 1][j + 2] === 0 || isOne(i, j, i - 1, j + 2)) && m[i][j + 1] === 0) {
                points.push({i: i - 1, j: j + 2});
            }
            if (i + 1 <= 9 && j - 2 >= 0 && (m[i + 1][j - 2] === 0 || isOne(i, j, i + 1, j - 2)) && m[i][j - 1] === 0) {
                points.push({i: i + 1, j: j - 2});
            }
            if (i + 1 <= 9 && j + 2 <= 8 && (m[i + 1][j + 2] === 0 || isOne(i, j, i + 1, j + 2)) && m[i][j + 1] === 0) {
                points.push({i: i + 1, j: j + 2});
            }
            if (i - 2 >= 0 && j - 1 >= 0 && (m[i - 2][j - 1] === 0 || isOne(i, j, i - 2, j - 1)) && m[i - 1][j] === 0) {
                points.push({i: i - 2, j: j - 1});
            }
            if (i - 2 >= 0 && j + 1 <= 8 && (m[i - 2][j + 1] === 0 || isOne(i, j, i - 2, j + 1)) && m[i - 1][j] === 0) {
                points.push({i: i - 2, j: j + 1});
            }
            if (i + 2 <= 9 && j - 1 >= 0 && (m[i + 2][j - 1] === 0 || isOne(i, j, i + 2, j - 1)) && m[i + 1][j] === 0) {
                points.push({i: i + 2, j: j - 1});
            }
            if (i + 2 <= 9 && j + 1 <= 8 && (m[i + 2][j + 1] === 0 || isOne(i, j, i + 2, j + 1)) && m[i + 1][j] === 0) {
                points.push({i: i + 2, j: j + 1});
            }
        } else if (chessmanType === 4) {
            //向上检索
            tempI = i - 1;
            while (tempI >= 0 && m[tempI][j] === 0) {
                points.push({i: tempI, j: j});
                tempI--;
            }
            if (tempI >= 0 && isOne(i, j, tempI, j)) {
                points.push({i: tempI, j: j});
            }
            //向下检索
            tempI = i + 1;
            while (tempI <= 9 && m[tempI][j] === 0) {
                points.push({i: tempI, j: j});
                tempI++;
            }
            if (tempI <= 9 && isOne(i, j, tempI, j)) {
                points.push({i: tempI, j: j});
            }
            //向左检索
            tempJ = j - 1;
            while (tempJ >= 0 && m[i][tempJ] === 0) {
                points.push({i: i, j: tempJ});
                tempJ--;
            }
            if (tempJ >= 0 && isOne(i, j, i, tempJ)) {
                points.push({i: i, j: tempJ});
            }
            //向右检索
            tempJ = j + 1;
            while (tempJ <= 8 && m[i][tempJ] === 0) {
                points.push({i: i, j: tempJ});
                tempJ++;
            }
            if (tempJ <= 8 && isOne(i, j, i, tempJ)) {
                points.push({i: i, j: tempJ});
            }
        } else if (chessmanType === 5) {//向上检索
            tempI = i - 1;
            while (tempI >= 0 && m[tempI][j] === 0) {
                points.push({i: tempI, j: j});
                tempI--;
            }
            tempI--;
            while (tempI >= 0 && m[tempI][j] === 0) {
                tempI--;
            }
            if (tempI >= 0 && m[tempI][j] > 0 && isOne(i, j, tempI, j)) points.push({i: tempI, j: j});
            //向下检索
            tempI = i + 1;
            while (tempI <= 9 && m[tempI][j] === 0) {
                points.push({i: tempI, j: j});
                tempI++;
            }
            tempI++;
            while (tempI <= 9 && m[tempI][j] === 0) {
                tempI++;
            }
            if (tempI <= 9 && m[tempI][j] > 0 && isOne(i, j, tempI, j)) points.push({i: tempI, j: j});
            //向左检索
            let tempJ = j - 1;
            while (tempJ >= 0 && m[i][tempJ] === 0) {
                points.push({i: i, j: tempJ});
                tempJ--;
            }
            tempJ--;
            while (tempJ >= 0 && m[i][tempJ] === 0) {
                tempJ--;
            }
            if (tempJ >= 0 && m[i][tempJ] && isOne(i, j, i, tempJ)) {
                points.push({i: i, j: tempJ});
            }
            //向右检索
            tempJ = j + 1;
            while (tempJ <= 8 && m[i][tempJ] === 0) {
                points.push({i: i, j: tempJ});
                tempJ++;
            }
            tempJ++;
            while (tempJ <= 8 && m[i][tempJ] === 0) {
                tempJ++;
            }
            if (tempJ <= 8 && m[i][tempJ] && isOne(i, j, i, tempJ)) {
                points.push({i: i, j: tempJ});
            }
        } else if (chessmanType === 6) {
            if (m[i][j] > 16) {
                if (i - 1 >= 0 && (m[i - 1][j] === 0 || isOne(i, j, i - 1, j))) {
                    points.push({i: i - 1, j: j});
                }
                if (i <= 4 && j - 1 >= 0 && (m[i][j - 1] === 0 || isOne(i, j, i, j - 1))) {
                    points.push({i: i, j: j - 1});
                }
                if (i <= 4 && j + 1 >= 0 && (m[i][j + 1] === 0 || isOne(i, j, i, j + 1))) {
                    points.push({i: i, j: j + 1});
                }
            }
            else {
                if (i + 1 <= 9 && (m[i + 1][j] === 0 || isOne(i, j, i + 1, j))) {
                    points.push({i: i + 1, j: j});
                }
                if (i >= 5 && j - 1 >= 0 && (m[i][j - 1] === 0 || isOne(i, j, i, j - 1))) {
                    points.push({i: i, j: j - 1});
                }
                if (i >= 5 && j + 1 >= 0 && (m[i][j + 1] === 0 || isOne(i, j, i, j + 1))) {
                    points.push({i: i, j: j + 1});
                }
            }
        }
        return points;
    }

    getMoves(m, flag) {
        let moves = [];
        let isNull = function (i, j, m) {
            let target1 = {};
            let target2 = {};
            for (let tempI = 7; tempI < 10; tempI++) {
                for (let tempJ = 3; tempJ < 6; tempJ++) {
                    if (m[tempI][tempJ] === 17) {
                        target1 = {
                            i: tempI,
                            j: tempJ
                        }
                    }
                }
            }
            for (let tempI = 0; tempI < 3; tempI++) {
                for (let tempJ = 3; tempJ < 6; ++tempJ) {
                    if (m[tempI][tempJ] === 1) {
                        target2.j = tempJ;
                        target2.i = tempI;
                    }
                }
            }
            if (target1.j === target2.j && target1.j === j) {
                let o = 0;
                for (let tempI = target2.i + 1; tempI < target1.i; tempI++) {
                    if (map[tempI][target1.j] !== 0) {
                        if (tempI === i && target1.j === j) {

                        } else {
                            o = 1;
                        }
                    }
                }
                return o === 1;
            }
            else {
                return true;
            }
        };
        for (let i = 0; i < m.length; i++) {
            for (let j = 0; j < m[i].length; ++j) {
                if (flag === -1) {
                    if (m[i][j] <= 16 && m[i][j] > 0) {
                        let p = this.getPoints(i, j, m, flag);
                        for (let k of p) {
                            if (j === k.j) {
                                moves.push([i, j, k.i, k.j, chessmans[this.changeToType(m[i][j])]]);
                            }
                            else {
                                if (isNull(i, j, m)) moves.push([i, j, k.i, k.j, chessmans[this.changeToType(m[i][j])]]);
                            }
                        }
                    }
                }
                else {
                    if (m[i][j] > 16) {
                        let p = this.getPoints(i, j, m);
                        for (let k of p) {
                            if (j === k.j) {
                                moves.push([i, j, k.i, k.j, chessmans[this.changeToType(m[i][j] - 16)]]);
                            }
                            else {
                                if (isNull(i, j, m)) moves.push([i, j, k.i, k.j, chessmans[this.changeToType(m[i][j] - 16)]]);
                            }
                        }
                    }
                }
            }
        }
        return moves;
    }

    evaluate(m, flag) {
        let value = 0;
        for (let i = 0; i < m.length; i++) {
            for (let j = 0; j < m[i].length; j++) {
                if (m[i][j] !== 0) {
                    value += (m[i][j] > 16 ? 1 * redValue[chessmans[this.changeToType(m[i][j] - 16)]][i][j] : -1 * blankValue[chessmans[this.changeToType(m[i][j])]][i][j]);
                }
            }
        }
        return value * flag;
    }

    AlphaBeta(depth, alpha, beta, m, flag) {
        let rootKey = 0;
        if (depth === 0) {
            return {value: this.evaluate(m, flag)}
        }
        let moves = this.getMoves(m, flag);
        let temp = [];
        for (let x of moves) {
            temp = [];
            temp.push(x[0]);
            temp.push(x[1]);
            temp.push(x[2]);
            temp.push(x[3]);
            temp.push(x[4]);
            let clearKey = chessmans[this.changeToType(m[x[2]][x[3]] > 16 ? m[x[2]][x[3]] - 16 : m[x[2]][x[3]])];
            let one = m[x[0]][x[1]];
            m[x[2]][x[3]] = one;
            m[x[0]][x[1]] = 0;
            if (clearKey === 'King') {
                m[x[2]][x[3]] = 0;
                m[x[0]][x[1]] = one;
                return {key: x[4], i: x[2], j: x[3], value: 8888, oldI: x[0], oldJ: x[1]};
            }
            else {
                let value = -this.AlphaBeta(depth - 1, -beta, -alpha, m, -flag).value;
                m[x[2]][x[3]] = 0;
                m[x[0]][x[1]] = one;
                if (value >= beta) {
                    return {key: x[4], i: x[2], j: x[3], value: beta, oldI: x[0], oldJ: x[1]};
                }
                if (value > alpha) {
                    alpha = value;
                    if (this.treeDepth === depth) {
                        rootKey = {key: x[4], i: x[2], j: x[3], value: alpha, oldI: x[0], oldJ: x[1]};
                        console.log(rootKey);
                    }
                }
            }
        }
        if (this.treeDepth === depth) {
            if (rootKey === 0) return false;
            else return rootKey;
        }
        return {key: temp[4], i: temp[2], j: temp[3], value: alpha, oldI: temp[0], oldJ: temp[1]};
    }

    init() {
        let bill = this.historyBill||gambit;
        let p = pace.join("");
        if (bill.length){
            let len=p.length;
            let arr=[];
            //先搜索棋谱
            for (let i=0;i< bill.length;i++){
                if (bill[i].slice(0,len)===p) {
                    arr.push(bill[i]);
                }
            }
            if (arr.length){
                let inx=Math.floor( Math.random() * arr.length );
                this.historyBill = arr ;
                let one =  arr[inx].slice(len,len+4).split("");
                return [one[1],one[0],one[3],one[2]]
            }else{
                this.historyBill = [] ;
            }

        }
        let val = this.AlphaBeta(this.treeDepth, -99999, 99999, arr2Clone(map), -1);
        if (!val || val.value === -8888) {
            this.treeDepth = 2;
            val = this.AlphaBeta(this.treeDepth, -99999, 99999, arr2Clone(map), -1);
        }
        if (val && val.value !== -8888) {
            return [val.oldI, val.oldJ, val.i, val.j]
        } else {
            return false;
        }
    }
}

class game {
    constructor() {
        this.gameMap = new gameMap();
        this.gameMap.firstPrint();
        this.isSelect = false;//判断点击之前是否已有选中的棋子
        this.gamePlayer = 'red';
        this.points = [];
        this.sP = {i: 0, j: 0};
        this.ai = new computerPlayer();
    }

    //获取当前棋子的可移动点
    getPoints(i, j) {
        let chessmanType = this.gameMap.changeToType(map[i][j] > 16 ? map[i][j] - 16 : map[i][j]);
        let points = [];
        let tempI = 0;
        let tempJ = 0;
        let isOne = function (i, j, targetI, targetJ) {
            let x = map[i][j] > 16 ? 0 : 1;
            let y = map[targetI][targetJ] > 16 ? 0 : 1;
            return x !== y;
        };
        if (chessmanType === 0) {//判断是否老将对老将
            let isNull = function (i, j, flag) {
                let target = {};
                if (flag === 0) {
                    for (let tempI = 7; tempI < 10; tempI++) {
                        for (let tempJ = 3; tempJ < 6; ++tempJ) {
                            if (map[tempI][tempJ] === 17) {
                                target.j = tempJ;
                                target.i = tempI;
                            }
                        }
                    }
                }
                else {
                    for (let tempI = 0; tempI < 3; tempI++) {
                        for (let tempJ = 3; tempJ < 6; ++tempJ) {
                            if (map[tempI][tempJ] === 1) {
                                target.j = tempJ;
                                target.i = tempI;
                            }
                        }
                    }
                }
                if (j === target.j) {
                    let f = 0;
                    for (let tempI = i + 1; tempI < target.i; ++tempI) {
                        if (map[tempI][j] !== 0) {
                            f = 1;
                        }
                    }
                    return f === 1;
                }
                return true;
            };
            if (map[i][j] < 16) {
                if (j - 1 >= 3 && isNull(i, j, 0) && (map[i][j - 1] === 0 || isOne(i, j, i, j - 1))) {
                    points.push({i: i, j: j - 1});
                }
                if (j + 1 <= 5 && isNull(i, j, 0) && (map[i][j - 1] === 0 || isOne(i, j, i, j + 1))) {
                    points.push({i: i, j: j - 1});
                }
                if (i - 1 >= 0 && (map[i - 1][j] === 0 || isOne(i, j, i - 1, j))) {
                    points.push({i: i - 1, j: j - 1});
                }
                if (i + 1 <= 2 && (map[i + 1][j] === 0 || isOne(i, j, i + 1, j))) {
                    points.push({i: i + 1, j: j});
                }
            }
            else {
                if (j - 1 >= 3 && isNull(i, j, 1) && (map[i][j - 1] === 0 || isOne(i, j, i, j - 1))) {
                    points.push({i: i, j: j - 1});
                }
                if (j + 1 <= 5 && isNull(i, j, 1) && (map[i][j - 1] === 0 || isOne(i, j, i, j + 1))) {
                    points.push({i: i, j: j - 1});
                }
                if (i - 1 >= 0 && (map[i - 1][j] === 0 || isOne(i, j, i - 1, j))) {
                    points.push({i: i - 1, j: j});
                }
                if (i + 1 <= 2 && (map[i + 1][j] === 0 || isOne(i, j, i + 1, j))) {
                    points.push({i: i + 1, j: j});
                }
            }
        } else if (chessmanType === 1) {
            if (map[i][j] > 16) {
                if (i - 1 >= 7 && j - 1 >= 3 && (map[i - 1][j - 1] === 0 || isOne(i, j, i - 1, j - 1))) {
                    points.push({i: i - 1, j: j - 1});
                }
                if (i - 1 >= 7 && j + 1 <= 5 && (map[i - 1][j + 1] === 0 || isOne(i, j, i - 1, j + 1))) {
                    points.push({i: i - 1, j: j + 1});
                }
                if (i + 1 <= 9 && j - 1 >= 3 && (map[i + 1][j - 1] === 0 || isOne(i, j, i + 1, j - 1))) {
                    points.push({i: i + 1, j: j - 1});
                }
                if (i + 1 <= 9 && j + 1 <= 5 && (map[i + 1][j + 1] === 0 || isOne(i, j, i + 1, j + 1))) {
                    points.push({i: i + 1, j: j + 1});
                }
            }
            else {
                if (i - 1 >= 0 && j - 1 >= 3 && (map[i - 1][j - 1] === 0 || isOne(i, j, i - 1, j - 1))) {
                    points.push({i: i - 1, j: j - 1});
                }
                if (i - 1 >= 0 && j + 1 <= 5 && (map[i - 1][j + 1] === 0 || isOne(i, j, i - 1, j + 1))) {
                    points.push({i: i - 1, j: j + 1});
                }
                if (i + 1 <= 2 && j - 1 >= 3 && (map[i + 1][j - 1] === 0 || isOne(i, j, i + 1, j - 1))) {
                    points.push({i: i + 1, j: j - 1});
                }
                if (i + 1 <= 2 && j + 1 <= 5 && (map[i + 1][j + 1] === 0 || isOne(i, j, i + 1, j + 1))) {
                    points.push({i: i + 1, j: j + 1});
                }
            }
        } else if (chessmanType === 2) {
            if (map[i][j] > 16) {
                if (i - 2 >= 5 && j - 2 >= 0 && map[i - 1][j - 1] === 0 && (map[i - 2][j - 2] === 0 || isOne(i, j, i - 2, j - 2))) {
                    points.push({i: i - 2, j: j - 2});
                }
                if (i - 2 >= 5 && j + 2 <= 8 && map[i - 1][j + 1] === 0 && (map[i - 2][j + 2] === 0 || isOne(i, j, i - 2, j + 2))) {
                    points.push({i: i - 2, j: j + 2});
                }
                if (i + 2 <= 9 && j - 2 >= 0 && map[i + 1][j - 1] === 0 && (map[i + 2][j - 2] === 0 || isOne(i, j, i + 2, j - 2))) {
                    points.push({i: i + 2, j: j - 2});
                }
                if (i + 2 <= 9 && j + 2 <= 8 && map[i + 1][j + 1] === 0 && (map[i + 2][j + 2] === 0 || isOne(i, j, i + 2, j + 2))) {
                    points.push({i: i + 2, j: j + 2});
                }
            }
            else {
                if (i - 2 >= 0 && j - 2 >= 3 && map[i - 1][j - 1] === 0 && (map[i - 2][j - 2] === 0 || isOne(i, j, i - 2, j - 2))) {
                    points.push({i: i - 2, j: j - 2});
                }
                if (i - 2 >= 0 && j + 2 <= 5 && map[i - 1][j + 1] === 0 && (map[i - 2][j + 2] === 0 || isOne(i, j, i - 2, j + 2))) {
                    points.push({i: i - 2, j: j + 2});
                }
                if (i + 2 <= 2 && j - 2 >= 3 && map[i + 1][j - 1] === 0 && (map[i + 2][j - 2] === 0 || isOne(i, j, i + 2, j - 2))) {
                    points.push({i: i + 2, j: j - 2});
                }
                if (i + 2 <= 2 && j + 2 <= 5 && map[i + 1][j + 1] === 0 && (map[i + 2][j + 2] === 0 || isOne(i, j, i + 2, j + 2))) {
                    points.push({i: i + 2, j: j + 2});
                }
            }
        } else if (chessmanType === 3) {
            if (i - 1 >= 0 && j - 2 >= 0 && (map[i - 1][j - 2] === 0 || isOne(i, j, i - 1, j - 2)) && map[i][j - 1] === 0) {
                points.push({i: i - 1, j: j - 2});
            }
            if (i - 1 >= 0 && j + 2 <= 8 && (map[i - 1][j + 2] === 0 || isOne(i, j, i - 1, j + 2)) && map[i][j + 1] === 0) {
                points.push({i: i - 1, j: j + 2});
            }
            if (i + 1 <= 9 && j - 2 >= 0 && (map[i + 1][j - 2] === 0 || isOne(i, j, i + 1, j - 2)) && map[i][j - 1] === 0) {
                points.push({i: i + 1, j: j - 2});
            }
            if (i + 1 <= 9 && j + 2 <= 8 && (map[i + 1][j + 2] === 0 || isOne(i, j, i + 1, j + 2)) && map[i][j + 1] === 0) {
                points.push({i: i + 1, j: j + 2});
            }
            if (i - 2 >= 0 && j - 1 >= 0 && (map[i - 2][j - 1] === 0 || isOne(i, j, i - 2, j - 1)) && map[i - 1][j] === 0) {
                points.push({i: i - 2, j: j - 1});
            }
            if (i - 2 >= 0 && j + 1 <= 8 && (map[i - 2][j + 1] === 0 || isOne(i, j, i - 2, j + 1)) && map[i - 1][j] === 0) {
                points.push({i: i - 2, j: j + 1});
            }
            if (i + 2 <= 9 && j - 1 >= 0 && (map[i + 2][j - 1] === 0 || isOne(i, j, i + 2, j - 1)) && map[i + 1][j] === 0) {
                points.push({i: i + 2, j: j - 1});
            }
            if (i + 2 <= 9 && j + 1 <= 8 && (map[i + 2][j + 1] === 0 || isOne(i, j, i + 2, j + 1)) && map[i + 1][j] === 0) {
                points.push({i: i + 2, j: j + 1});
            }
        } else if (chessmanType === 4) {
            //向上检索
            tempI = i - 1;
            while (tempI >= 0 && map[tempI][j] === 0) {
                points.push({i: tempI, j: j});
                tempI--;
            }
            if (tempI >= 0 && isOne(i, j, tempI, j)) {
                points.push({i: tempI, j: j});
            }
            //向下检索
            tempI = i + 1;
            while (tempI <= 9 && map[tempI][j] === 0) {
                points.push({i: tempI, j: j});
                tempI++;
            }
            if (tempI <= 9 && isOne(i, j, tempI, j)) {
                points.push({i: tempI, j: j});
            }
            //向左检索
            tempJ = j - 1;
            while (tempJ >= 0 && map[i][tempJ] === 0) {
                points.push({i: i, j: tempJ});
                tempJ--;
            }
            if (tempJ >= 0 && isOne(i, j, i, tempJ)) {
                points.push({i: i, j: tempJ});
            }
            //向右检索
            tempJ = j + 1;
            while (tempJ <= 8 && map[i][tempJ] === 0) {
                points.push({i: i, j: tempJ});
                tempJ++;
            }
            if (tempJ <= 8 && isOne(i, j, i, tempJ)) {
                points.push({i: i, j: tempJ});
            }
        } else if (chessmanType === 5) {//向上检索
            tempI = i - 1;
            while (tempI >= 0 && map[tempI][j] === 0) {
                points.push({i: tempI, j: j});
                tempI--;
            }
            tempI--;
            while (tempI >= 0 && map[tempI][j] === 0) {
                tempI--;
            }
            if (tempI >= 0 && map[tempI][j] > 0 && isOne(i, j, tempI, j)) points.push({i: tempI, j: j});
            //向下检索
            tempI = i + 1;
            while (tempI <= 9 && map[tempI][j] === 0) {
                points.push({i: tempI, j: j});
                tempI++;
            }
            tempI++;
            while (tempI <= 9 && map[tempI][j] === 0) {
                tempI++;
            }
            if (tempI <= 9 && map[tempI][j] > 0 && isOne(i, j, tempI, j)) points.push({i: tempI, j: j});
            //向左检索
            let tempJ = j - 1;
            while (tempJ >= 0 && map[i][tempJ] === 0) {
                points.push({i: i, j: tempJ});
                tempJ--;
            }
            tempJ--;
            while (tempJ >= 0 && map[i][tempJ] === 0) {
                tempJ--;
            }
            if (tempJ >= 0 && map[i][tempJ] && isOne(i, j, i, tempJ)) {
                points.push({i: i, j: tempJ});
            }
            //向右检索
            tempJ = j + 1;
            while (tempJ <= 8 && map[i][tempJ] === 0) {
                points.push({i: i, j: tempJ});
                tempJ++;
            }
            tempJ++;
            while (tempJ <= 8 && map[i][tempJ] === 0) {
                tempJ++;
            }
            if (tempJ <= 8 && map[i][tempJ] && isOne(i, j, i, tempJ)) {
                points.push({i: i, j: tempJ});
            }
        } else if (chessmanType === 6) {
            if (map[i][j] > 16) {
                if (i - 1 >= 0 && (map[i - 1][j] === 0 || isOne(i, j, i - 1, j))) {
                    points.push({i: i - 1, j: j});
                }
                if (i <= 4 && j - 1 >= 0 && (map[i][j - 1] === 0 || isOne(i, j, i, j - 1))) {
                    points.push({i: i, j: j - 1});
                }
                if (i <= 4 && j + 1 >= 0 && (map[i][j + 1] === 0 || isOne(i, j, i, j + 1))) {
                    points.push({i: i, j: j + 1});
                }
            }
            else {
                if (i + 1 <= 9 && (map[i + 1][j] === 0 || isOne(i, j, i + 1, j))) {
                    points.push({i: i + 1, j: j});
                }
                if (i >= 5 && j - 1 >= 0 && (map[i][j - 1] === 0 || isOne(i, j, i, j - 1))) {
                    points.push({i: i, j: j - 1});
                }
                if (i >= 5 && j + 1 >= 0 && (map[i][j + 1] === 0 || isOne(i, j, i, j + 1))) {
                    points.push({i: i, j: j + 1});
                }
            }
        }
        return points;
    }

    clickSelect(i, j) {
        if (this.isSelect) {
            if (map[i][j] > 16) {
                this.gameMap.print();
                this.gameMap.selectSomeone(i, j);
                this.points = this.getPoints(i, j);
                this.sP.i = i;
                this.sP.j = j;
            }
            else {
                for (let temp of this.points) {
                    if (temp.i === i && temp.j === j) {
                        this.isSelect = false;
                        if (map[i][j] === 1) {
                            alert('你赢了！');
                            location.reload(true);
                        }
                        map[i][j] = map[this.sP.i][this.sP.j];
                        map[this.sP.i][this.sP.j] = 0;
                        pace.push(`${this.sP.j}${this.sP.i}${j}${i}`);
                        this.gameMap.print();
                        let m = this;
                        document.getElementById('msg').innerText = 'AI正在计算！';
                        m.startTime = new Date();
                        setTimeout(function () {
                            let action = m.ai.init();
                            if (action === false) {
                                alert('你赢了！');
                                location.reload(true);
                            }
                            else {
                                console.log(action);
                                map[action[2]][action[3]] = map[action[0]][action[1]];
                                map[action[0]][action[1]] = 0;
                                pace.push(`${action[1]}${action[0]}${action[3]}${action[2]}`);
                                m.gameMap.print();
                                if (map[action[2]][action[3]] === 17) {
                                    alert('你输了！');
                                    location.reload(true);
                                }
                                document.getElementById('msg').innerText = `AI计算完成！耗时${new Date() - m.startTime - 100}ms`
                            }
                        }, 100);
                    }
                }
            }
        }
        else {
            if (map[i][j] > 16) {
                this.gameMap.print();
                this.gameMap.selectSomeone(i, j);
                this.isSelect = true;
                this.points = this.getPoints(i, j);
                this.sP.i = i;
                this.sP.j = j;
            }
        }

    }
}

let g = new game();