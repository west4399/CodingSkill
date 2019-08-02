
var canvas;
var ctx;
var cellSize = 5;   //セル1マスのサイズ
var cols;
var rows;
var cells = new Array();
var timer1;
var running = false;

window.onload = function()
{
    canvas = document.getElementById('lifegame');
    ctx = canvas.getContext('2d');
    cols = Math.floor(canvas.width / cellSize);
    rows = Math.floor(canvas.height / cellSize);
    reset_canvas();
};

//開始
function onStart(){
    if(running){
        clearInterval(timer1);
        running = false;
    } else {
        Game_Start();
        timer1 = setInterval("Game_Start()", 100);
        running = true;
    }
}

//初期化
function reset_canvas(){
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0, canvas.width, canvas.height);
    for(col=0;col<cols;col++){
        cells[col] = new Array();
        for(row=0;row<rows;row++){
            cells[col][row] = 0;
        }
    }
    redraw();
}

//ランダム
function randomCells(){
    for(col=0;col<cols;col++){
        cells[col] = new Array();
        for(row=0;row<rows;row++){
            cells[col][row] = Math.round( Math.random());
        }
    }
    redraw();
}

//再描画
function redraw(){
    for(col=0;col<cols;col++){
        for(row=0;row<rows;row++){
            drawCell(col, row);
        }
    }
}

// セルを描画
function drawCell(x, y){
    var value = cells[x][y];
    var style = value ? "red" : "black";
    ctx.fillStyle = style;
    ctx.fillRect(x * cellSize, y * cellSize,
        cellSize - 1, cellSize - 1);
}

//動かす
function Game_Start(){
    var tmpCells = new Array();
    for(col=0;col<cols;col++){
        tmpCells[col] = new Array();
        for(row=0;row<rows;row++){
            var count = countAround(col, row);
            if(cells[col][row]){
                if(count == 2 || count == 3){
                    tmpCells[col][row] = 1;
                } else {
                    tmpCells[col][row] = 0;
                }
            } else {
                if(count == 3){
                    tmpCells[col][row] = 1;
                } else {
                    tmpCells[col][row] = 0;
                }
            }
        }
    }
    cells = tmpCells;
    redraw();
}

//周囲の生存セルを数える
function countAround(x, y){
    var count = 0;
    for(i=-1;i<=1;i++){
        for(j=-1;j<=1;j++){
            if(
                (i != 0 || j != 0) &&
                x + i >= 0 && x + i < cols &&
                y + j >= 0 && y + j < rows
            ) {
                count += cells[x + i][y + j];
            }
        }
    }
    return count;
}
