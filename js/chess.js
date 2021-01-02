/**
 * UI
 * @author C1101
 */


//获取绘画接口
var canv = document.getElementById('mycanv');
var undo = document.getElementById('undo');
var restart = document.getElementById('restart');
var ctx = canv.getContext('2d');
var over = false; //游戏是否结束
var player = 0; //当前棋手 0代表玩家 1代表电脑
var chessBoard = []; //游戏坐标记录 玩家下棋置1 电脑下棋置2
var record = []; //记录数组 记录下棋点的顺序 玩家电脑都要记录
var record2cp = []; //记录覆盖，用于悔棋
var record2man = []; //
var count = 0; //（x，y）在的赢法种类
var wins = []; //赢法数组，记录所有五子连成一线的情况
var manWin = []; //玩家赢法数组
var computerWin = []; //电脑赢法数组


//绘制棋盘
createChessBoard();

// 初始化棋盘信息
for (var i = 0; i < 15; i++) {
    chessBoard[i] = [];
    for (var j = 0; j < 15; j++) {
        chessBoard[i][j] = 0;
    }
}

/*
以下是函数区域
*/

//默认棋盘数组为 [xx,yy]的集合， 像素点为[x,y]的集合
//其中xx = y - 1, yy = x - 1;
//这样编写是玩家先手

//玩家回合


for (i = 0; i < 15; i++) { //定义三维数组
    wins[i] = [];
    for (j = 0; j < 15; j++) {
        wins[i][j] = [];
    }
}
//横线能赢情况
for (var x = 0; x < 11; x++) {
    for (var y = 0; y < 15; y++) {
        for (var z = 0; z < 5; z++) { //z代表向后5个字
            //true代表是一种赢法，用count记录下来
            wins[x + z][y][count] = true; //横向
            wins[y][x + z][count + 1] = true; //纵向
        }
        count += 2; //(x,y)在另一个赢法中
    }
}
for (x = 0; x < 11; x++) {
    //正斜线
    for (y = 0; y < 11; y++) {
        for (z = 0; z < 5; z++) {
            wins[x + z][y + z][count] = true;
        }
        count++;
    }
    //反斜线
    for (y = 4; y < 15; y++) {
        for (z = 0; z < 5; z++) {
            wins[x + z][y - z][count] = true;
        }
        count++;
    }
}

for (i = 0; i < count; i++) {
    manWin[i] = 0;
    computerWin[i] = 0;
}

/**
 * 下棋事件
 */
canv.addEventListener('click', function (ev) { //向画布添加点击事件(DOM事件)
    if (over)
        return;
    //获取点击事件的坐标,并修正坐标
    //当前坐标与行距的比值四舍五入 再回乘行距即可
    let x = Math.round(ev.offsetX / 50),
        y = Math.round(ev.offsetY / 50);
    //边框修正 重复值修正
    if (x * y > 0 && x < 16 && y < 16 && chessBoard[y - 1][x - 1] === 0) {
        let xx = y - 1,
            yy = x - 1; //记录 由于canvans画布与数组的x,y差一并且颠倒 故修正
        //玩家下棋 置1
        chessBoard[xx][yy] = 1;
        record.push([xx, yy]);
        playChess(x * 50, y * 50); //显示
        //判断输赢
        for (var i = 0; i < count; i++) { //遍历赢法

            if (wins[xx][yy][i]) { //（x，y）在赢法i上 该赢法将赢数加一
                manWin[i]++;
                if (computerWin[i] !== 6) {
                    record2cp[i] = computerWin[i]; //将电脑的下棋记录中的这个点的值下来，方便悔棋
                }
                computerWin[i] = 6; //电脑不可能再用这种赢法获胜了，将其置为非法值
            }
            if (manWin[i] === 5) {
                over = true; //为五，赢了
                alert("你赢了");
            }
        }
        player ^= 1; //交换棋手
        aiGo();
    }

})

/**
 * 悔棋事件
 */

undo.addEventListener('click', function () {
    //由于下棋事件中包括了 玩家、电脑 故记录数应是偶数
    if (record.length > 0) {
        let xy = record.pop(); //会先将电脑的棋悔掉
        let xx = xy[0],
            yy = xy[1];
        let x = yy + 1,
            y = xx + 1;
        for (var i = 0; i < count; i++) { //遍历赢法

            if (wins[xx][yy][i]) { //（x，y）在赢法i上 该赢法将赢数减一
                computerWin[i]--;
                if (manWin[i] >= 6) { //将玩家这个点的记录恢复
                    manWin[i] = record2man[i];
                }
            }
        }
        chessBoard[xx][yy] = 0; //所在位置置0
        reset(x * 50, y * 50); //悔棋显示


        xy = record.pop(); //然后将玩家的棋悔掉
        xx = xy[0];
        yy = xy[1];
        x = yy + 1;
        y = xx + 1;
        for (i = 0; i < count; i++) { //遍历赢法
            if (wins[xx][yy][i]) { //（x，y）在赢法i上 该赢法将赢数减一
                manWin[i]--;
                if (computerWin[i] >= 6) { //将电脑这个点的记录恢复
                    computerWin[i] = record2cp[i];
                }
            }
        }
        chessBoard[xx][yy] = 0; //所在位置置0
        reset(x * 50, y * 50); //悔棋显示
        over = false;
    }
})

/**
 * 重新开始事件
 */
restart.addEventListener('click', function () {
    canv.height = 800; //清空canv(重新设置高度会重绘画布)
    createChessBoard(); //重绘
    record = []; //清空数组
    record2cp = [];
    record2man = [];
    manWin = [];
    computerWin = [];
    for (var i = 0; i < 15; i++) {
        chessBoard[i] = [];
        for (var j = 0; j < 15; j++) {
            chessBoard[i][j] = 0;
        }
    }
    over = false;
    for (i = 0; i < count; i++) { //清空棋盘
        manWin[i] = 0;
        computerWin[i] = 0;
    }
})


/**
 * 绘制棋盘 15 * 15
 */
function createChessBoard() {
    for (let i = 1; i <= 15; ++i) {
        //竖线
        ctx.beginPath();
        ctx.moveTo(50 * i, 50);
        ctx.lineTo(50 * i, 750);
        ctx.stroke();
        //横线
        ctx.beginPath();
        ctx.moveTo(50, 50 * i);
        ctx.lineTo(750, 50 * i);
        ctx.stroke();
    }
}

/**
 * 绘制棋子
 * @param x     棋子x轴像素位置
 * @param y     棋子y轴像素位置
 */
function playChess(x, y) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, 24.5, 0, 2 * Math.PI);
    var chessstyle = ctx.createRadialGradient(x, y, 24.5, x, y, 1);
    /* chesstype true 为黑子*/
    if (player === 0) {
        chessstyle.addColorStop(0, "#0A0A0A");
        chessstyle.addColorStop(1, "#636766");
    } else {
        chessstyle.addColorStop(0, "#D1D1D1");
        chessstyle.addColorStop(1, "#F9F9F9");
    }
    ctx.fillStyle = chessstyle;
    ctx.fill();
    ctx.closePath();
    ctx.restore();
}

/**
 * 悔棋用 棋盘背景恢复
 * @param x     棋子x轴像素位置
 * @param y     棋子y轴像素位置
 */
function reset(x, y) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, 25.5, 0, 2 * Math.PI);
    ctx.fillStyle = "#963";
    ctx.strokeStyle = "#963";
    ctx.fill();
    ctx.closePath();
    ctx.restore();
    reset2(x, y);
}

/**
 * 悔棋用 棋盘轴恢复
 * @param x     棋子x轴像素位置
 * @param y     棋子y轴像素位置
 */
function reset2(x, y) {
    let x1 = x - 25.6,
        x2 = x + 25.6,
        y1 = y - 25.6,
        y2 = y + 25.6;

    if (x === 50)
        x1 = x;
    if (x === 15 * 50)
        x2 = x;
    if (y === 50)
        y1 = y;
    if (y === 15 * 50)
        y2 = y;

    ctx.beginPath();
    ctx.moveTo(x1, y);
    ctx.lineTo(x2, y);
    ctx.moveTo(x, y1);
    ctx.lineTo(x, y2);
    ctx.stroke();
    ctx.closePath();
}


/**
 * AI回合
 */
function aiGo() {
    if (over) {
        return;
    }
    var xx, yy;
    //寻找最优位置[xx,yy]
    let manOfValue = []; //玩家赢的权值
    let computerOfValue = []; //电脑赢的权值
    var max = 0;
    for (x = 0; x < 15; x++) {
        manOfValue[x] = [];
        computerOfValue[x] = [];
        for (y = 0; y < 15; y++) {
            manOfValue[x][y] = 0;
            computerOfValue[x][y] = 0;
        }
    }
    for (x = 0; x < 15; x++) {
        for (y = 0; y < 15; y++) {
            if (chessBoard[x][y] === 0) { //查找空白棋

                for (i = 0; i < count; i++) { //遍历count
                    if (wins[x][y][i]) {
                        if (manWin[i] === 1) {
                            manOfValue[x][y] += 200;
                        } //给予权值
                        else if (manWin[i] === 2) {
                            manOfValue[x][y] += 400;
                        } else if (manWin[i] === 3) {
                            manOfValue[x][y] += 2000;
                        } else if (manWin[i] === 4) {
                            manOfValue[x][y] += 10000;
                        }

                        if (computerWin[i] === 1) {
                            computerOfValue[x][y] += 220;
                        } //电脑相同条件权值要比玩家高，主要还是自己赢
                        else if (computerWin[i] === 2) {
                            computerOfValue[x][y] += 420;
                        } else if (computerWin[i] === 3) {
                            computerOfValue[x][y] += 2200;
                        } else if (computerWin[i] === 4) {
                            computerOfValue[x][y] += 20000;
                        }
                    }
                }


                if (manOfValue[x][y] > max) { //寻找最大权值
                    max = manOfValue[x][y];
                    xx = x;
                    yy = y;
                }
                if (computerOfValue[x][y] > max) {
                    max = computerOfValue[x][y];
                    xx = x;
                    yy = y;
                }


            }
        }
    }
    //获取像素坐标 xx = y - 1, yy = x - 1;
    x = yy + 1;
    y = xx + 1;
    chessBoard[xx][yy] = 2;
    record.push([xx, yy]);
    playChess(x * 50, y * 50);
    //在最优位置下棋：调用playChess(x * 50, y * 50, player)显示 并且置棋盘数组对应位置为2 并记录下棋点record.push([xx, yy]);

    //判断输赢
    for (var i = 0; i < count; i++) { //遍历赢法

        if (wins[xx][yy][i]) { //（x，y）在赢法i上 该赢法将赢数加一
            computerWin[i]++;
            if (manWin[i] !== 6) {
                record2man[i] = manWin[i]; //将玩家的下棋记录中的这个点的值下来，方便悔棋
            }
            manWin[i] = 6; //玩家不可能再用这种赢法获胜了，将其置为非法值
        }
        if (computerWin[i] === 5) {
            over = true; //为五，赢了
            alert("AI赢了");
        }
    }
    player ^= 1; //交换棋手
}