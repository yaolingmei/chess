var canvas=document.getElementById('myCanvas');
var ctx=canvas.getContext('2d');
var flag=true;
//定义数组储存棋子,初始化
var model = [];
for(var i=0;i<15;i++){
     model[i]=[];
    for(j=0;j<15;j++){
        model[i][j]=0;
    }
}
//    画棋盘
function chessline(){
    ctx.beginPath();
    ctx.strokeStyle="#888888";
    for(var i=0;i<15;i++){
        ctx.moveTo(15+i*30,15);
        ctx.lineTo(15+i*30,435);
        ctx.moveTo(15,15+i*30);
        ctx.lineTo(435,15+i*30);
        ctx.stroke();
    }
    ctx.closePath();
}
chessline();

//    画棋子
function chessmodel(i,j,model){
    ctx.beginPath();
    ctx.arc(15+i*30,15+j*30,13,0,Math.PI*2);
    var grd = ctx.createRadialGradient(15+i*30,15+j*30,13,15+i*30,15+j*30,2);//颜色渐变的起始坐标和终点坐标
//        黑子
    if(model){
        grd.addColorStop(0, "#0A0A0A");
        grd.addColorStop(1, "#636766");
    }
//        白子
    else{
        grd.addColorStop(0, "#D1D1D1");
        grd.addColorStop(1, "#F9F9F9");
    }
    ctx.fillStyle=grd;
    ctx.closePath();
    ctx.fill();
}
//    落子
//获取到点击的坐标
canvas.onclick=function(e){
    var x= e.offsetX;
    var y= e.offsetY;
    var i=Math.floor(x/30);
    var j=Math.floor(y/30);
    //判断无子才能落子
    if(model[i][j]==0){
        chessmodel(i,j,flag);
        if(flag){
            model[i][j]=1;
            //判断是否赢
            checkwin(i,j,1);
        }else{
            model[i][j]=2;
            //判断是否赢
            checkwin(i,j,2);
        }
        flag=!flag;
    }
}
//是否赢的函数
function checkwin(i,j,k){
    var win=false;
    var counmodel=1;
    var minx=i-4;
    var maxx=i+4;
    if(minx<0){
        minx=0;
    }
    if(maxx>15){
        maxx=15
    }
    for(var x=minx;x<=maxx;x++){
      console.log(model[x][j],x)
    }
}