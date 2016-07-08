var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
var flag = true;
var iswell=false;
//初始化黑子
//定义数组储存棋子,初始化
var model = [];
for (var i = 0; i < 15; i++) {
    model[i] = [];
    for (j = 0; j < 15; j++) {
        model[i][j] = 0;
    }
}
//    画棋盘
function chessline() {
    ctx.beginPath();
    ctx.strokeStyle = "#888888";
    for (var i = 0; i < 15; i++) {
        ctx.moveTo(15 + i * 30, 15);
        ctx.lineTo(15 + i * 30, 435);
        ctx.moveTo(15, 15 + i * 30);
        ctx.lineTo(435, 15 + i * 30);
        ctx.stroke();
    }
    ctx.closePath();
}
chessline();

//    画棋子
function chessmodel(i, j, model) {
    ctx.beginPath();
    ctx.arc(15 + i * 30, 15 + j * 30, 13, 0, Math.PI * 2);
    var grd = ctx.createRadialGradient(15 + i * 30, 15 + j * 30, 13, 15 + i * 30, 15 + j * 30, 2);//颜色渐变的起始坐标和终点坐标
//        黑子
    if (model) {
        grd.addColorStop(0, "#0A0A0A");
        grd.addColorStop(1, "#636766");
    }
//        白子
    else {
        grd.addColorStop(0, "#D1D1D1");
        grd.addColorStop(1, "#F9F9F9");
    }
    ctx.fillStyle = grd;
    ctx.closePath();
    ctx.fill();
}
//    落子
//获取到点击的坐标
canvas.onclick = function (e) {
    var x = e.offsetX;
    var y = e.offsetY;
    var i = Math.floor(x / 30);
    var j = Math.floor(y / 30);
    //先判断是否结局
    if(iswell){
        alert("该局已结束，可刷新重新开始")
    }
    else{
        //判断无子才能落子
        if (model[i][j] == 0) {
            //画棋子
            chessmodel(i, j, flag);
            if (flag) {
                model[i][j] = 1;
                //判断是否赢
                judge(i, j, 1);
            } else {
                model[i][j] = 2;
                //判断是否赢
                judge(i, j, 2);
            }
            flag = !flag;
        }
    }

}
//是否赢的函数
function judge(x, y, chess) {//判断该局棋盘是否赢了
    var count1 = 0;
    var count2 = 0;
    var count3 = 0;
    var count4 = 0;

    //左右判断
    for (var i = x; i >= 0; i--) {
        if (model[i][y] != chess) {
            break;
        }
        count1++;
    }
    for (var i = x + 1; i < 15; i++) {
        if (model[i][y] != chess) {
            break;
        }
        count1++;
    }
    //上下判断
    for (var i = y; i >= 0; i--) {
        if (model[x][i] != chess) {
            break;
        }
        count2++;
    }
    for (var i = y + 1; i < 15; i++) {
        if (model[x][i] != chess) {
            break;
        }
        count2++;
    }
    //左上右下判断
    for (var i = x, j = y; i >= 0, j >= 0; i--, j--) {
        if (model[i][j] != chess) {
            break;
        }
        count3++;
    }
    for (var i = x + 1, j = y + 1; i < 15, j < 15; i++, j++) {
        if (model[i][j] != chess) {
            break;
        }
        count3++;
    }
    //右上左下判断
    for (var i = x, j = y; i >= 0, j < 15; i--, j++) {
        if (model[i][j] != chess) {
            break;
        }
        count4++;
    }
    for (var i = x + 1, j = y - 1; i < 15, j >= 0; i++, j--) {
        if (model[i][j] != chess) {
            break;
        }
        count4++;
    }

    if (count1 >= 5 || count2 >= 5 || count3 >= 5 || count4 >= 5) {
        if (chess == 1) {
            alert("黑棋赢了");
        }
        else {
            alert("白棋赢了");
        }
        iswell = true;//设置该局棋盘已经赢了，不可以再走了
    }
}
