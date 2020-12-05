/**
 * UI
 * @author C1101
 */


//获取绘画接口
var canv = document.getElementById('mycanv');
var ctx = canv.getContext('2d');
var over = false; //游戏是否结束
var player = 0; //当前棋手 0代表玩家 1代表电脑
var chessBoard = []; //游戏坐标记录 玩家下棋置1 电脑下棋置2
var myWin = []; //玩家赢法数组
var aiWin = []; //电脑赢法数组


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

//玩家回合
canv.addEventListener('click', function(ev) { //向画布添加点击事件(DOM事件)
    if (over)
        return;
    //获取点击事件的坐标,并修正坐标
    //当前坐标与行距的比值四舍五入 再回乘行距即可
    let x = Math.round(ev.offsetX / 50),
        y = Math.round(ev.offsetY / 50);

    //边框修正 重复值修正
    if (x * y > 0 && x < 16 && y < 16 && chessBoard[y - 1][x - 1] == 0) {
        //玩家下棋 置1
        chessBoard[y - 1][x - 1] = 1; //记录 由于canvans画布与数组的x,y差一并且颠倒 故修正
        playChess(x * 50, y * 50, player); //显示

        //判断输赢
        if (ifPlayerWin()) {
            over = true;
            window.alert("Congratulations! Player Win!")
        }

        if (!over) {
            player ^= 1; //交换棋手
            //电脑下棋
            aiGo();
        }
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
 * @param x     棋子x轴位置
 * @param y     棋子y轴位置
 * @param c     bool类型,用来区别玩家，显示不同颜色棋子
 */
function playChess(x, y, c) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, 25, 0, 2 * Math.PI);
    var chessstyle = ctx.createRadialGradient(x, y, 25, x, y, 1);
    /* chesstype true 为黑子*/
    if (c == 0) {
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
 * AI回合
 */
function aiGo() {
    if (over)
        return;
    //寻找最优位置

    //在最优位置下棋：调用playChess()显示 并且置棋盘数组对应位置为2

    //调用ifAIWin()判断电脑是否获胜
    //如果获胜，输出提示，并置over = true
    //如果未获胜 交换棋权player ^= 1
}

/**
 * 判断玩家是否获胜
 * @returns bool
 */
function ifPlayerWin() {

}

/**
 * 判断电脑是否获胜
 * @returns bool
 */
function ifAIWin() {

}