/**
 * UI
 * @author C1101
 */


//获取绘画接口
var canv = document.getElementById('mycanv');
var ctx = canv.getContext('2d');
var over = false;

//绘制棋盘
createChess();

//初始化游戏基础信息
var fiveChess = [{
    name: '黑子'
}, {
    name: '白子'
}];
var chess = 0; //当前棋手
var chess_rec = []; //游戏坐标记录


//向画布添加点击事件(DOM事件)
canv.addEventListener('click', function(ev) {
    if (over)
        return;
    //获取点击事件的坐标,并修正坐标
    //当前坐标与行距的比值四舍五入 再回乘行距即可
    let x = Math.round(ev.offsetX / 50),
        y = Math.round(ev.offsetY / 50);

    //边框修正 重复值修正
    if (x * y > 0 && x < 16 && y < 16 && !chess_rec.includes(x + '-' + y)) {
        chess_rec.push(x + '-' + y); //记录
        // console.log(getwins_5(x, y));
        setChess(x * 50, y * 50, fiveChess[chess].color); //显示
        if (chess_rec.length > 8)
            checkOver(x, y, chess); //判断输赢
        chess ^= 1; //交换棋手
    }

})


/**
 * 绘制棋盘 15 * 15
 */
function createChess() {
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
 */
function setChess(x, y, color) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, 25, 0, 2 * Math.PI);
    var chessstyle = ctx.createRadialGradient(x, y, 25, x, y, 1);
    /* chesstype true 为黑子*/
    if (chess == 0) {
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
 * 九连数组
 * @param x     棋子x轴位置
 * @param y     棋子y轴位置
 */
function getwins_9(x, y) {
    var wins = [
        [],
        [],
        [],
        []
    ];
    for (let i = -4; i <= 4; ++i) {
        let rg1 = x + i > 0 && x + i < 16,
            rg2 = y + i > 0 && y + i < 16,
            rg3 = y - i > 0 && y - i < 16;
        //0°
        if (rg1)
            wins[0].push(`${x+i}-${y}`);
        //90°
        if (rg2)
            wins[1].push(`${x}-${y+i}`);
        //135°
        if (rg1 && rg2)
            wins[2].push(`${x+i}-${y+i}`);
        //45°
        if (rg1 && rg3)
            wins[3].push(`${x+i}-${y-i}`);
    }
    //array.filter(func);  参数 => 函数体
    return wins.filter(arr => arr.length >= 5);
}

/**
 * 五连数组 通过九连数组分割
 * @param x     棋子x轴位置
 * @param y     棋子y轴位置
 */
function getwins_5(x, y) {
    var wins = [];
    //遍历分割即可
    getwins_9(x, y).forEach(arr => {
        for (let i = 0; i < arr.length - 4; ++i) {
            wins.push(arr.slice(i, i + 5));
        }
    })

    return wins;
}

/**
 * 判断输赢
 * @param x     棋子x轴位置
 * @param y     棋子y轴位置
 * @param chess 棋手
 */
function checkOver(x, y, chess) {
    //array.filter(function(currentValue,index,arr), thisValue)
    let chs = chess_rec.filter((n, i) => i % 2 == chess);
    let win = getwins_5(x, y).some(arr => arr.every(n => chs.includes(n)));
    if (win) {
        //setTimeout(JavaScript 函数, 等待的毫秒数)
        setTimeout(() => {
            alert(`恭喜${fiveChess[chess].name}胜利`)
        }, 10);
        over = true;
    }
}