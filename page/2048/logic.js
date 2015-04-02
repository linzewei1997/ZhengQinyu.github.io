var gameGrid = [];
var gameSize = 4;
var gameScore = 0;

/*初始化游戏数据*/
function newArray() {
    for(var i=0;i<gameSize;++i) {
        gameGrid[i] = [];
    }
}

/*分数显示*/
function updateScore(){
    var score = document.getElementById("score");
    score.innerText = gameScore.toString();
}

function getLeft(i,j){
    return 20 + j * 120;
}

function getTop(i,j){
    return 20 + i * 120;
}

/*初始化网页元素*/
function init() {
    var main = document.getElementsByClassName("game-grid")[0];
    /*添加子元素*/
    for(var i=0;i<gameSize;++i)
    {
        for(var j=0;j<gameSize;++j)
        {
            var child = document.createElement("div");
            child.className  = "game-cell";
            child.style.left = getLeft(i,j) +"px";
            child.style.top  = getTop(i,j) +"px";
            child.id = "child-"+i+"-"+j;
            main.appendChild(child);
        }
    }
    newArray();
}


/*获得游戏空格子的数量*/
function getEmptySize() {
    var sum=0;
    for(var i=0;i<gameSize;++i) {
        for(var j=0;j<gameSize;++j)if(gameGrid[i][j]==0)sum++;
    }
    return sum;
}


/*随机生成数字*/
function createOneNum() {
    var emptySize = getEmptySize();
    if(emptySize==0)return;
    var ranNum = parseInt(Math.random()*emptySize);
    var id = 0, x,y;
    while(ranNum >= 0) {
        x = parseInt(id / gameSize);
        y = parseInt(id % gameSize);
        id++;
        if(gameGrid[x][y]==0)ranNum--;
    }
    gameGrid[x][y] = Math.random()<0.5?2:4;
}

/*数据重置*/
function resetGame(){
    gameScore = 0;
    for(var i=0;i<gameSize;++i)
        for(var j=0;j<gameSize;++j){
            gameGrid[i][j]=0;
        }
}

function canMoveLeft() {
    for (var i = 0; i < gameSize; i++)
        for (var j = 1; j < gameSize; j++)
            if (gameGrid[i][j] != 0) {
                //left为空或者两个数字相等
                if (gameGrid[i][j - 1] == 0 || gameGrid[i][j] == gameGrid[i][j - 1])
                    return true;
            }
    return false;
}

function canMoveUp() {

    for (var i = 1; i < gameSize; i++)
        for (var j = 0; j < gameSize; j++)
            if (gameGrid[i][j] != 0) {
                //up为空或者两个数字相等
                if (gameGrid[i - 1][j] == 0 || gameGrid[i][j] == gameGrid[i - 1][j])
                    return true;
            }
    return false;
}

function canMoveRight() {
    for (var i = 0; i < gameSize; i++)
        for (var j = 2; j >= 0; j--)
            if (gameGrid[i][j] != 0) {
                //right为空或者两个数字相等
                if (gameGrid[i][j + 1] == 0 || gameGrid[i][j] == gameGrid[i][j + 1])
                    return true;
            }
    return false;
}

function canMoveDown() {
    for (var j = 0; j < gameSize; j++)
        for (var i = 2; i >= 0; i--)
            if (gameGrid[i][j] != 0) {
                //down为空或者两个数字相等
                if (gameGrid[i + 1][j] == 0 || gameGrid[i][j] == gameGrid[i + 1][j])
                    return true;
            }
    return false;
}


function moveLeft(){
    if(!canMoveLeft())return;
    for(var i=0;i<gameSize;++i) {
        var low= 0;
        for (var j = 1; j < gameSize; ++j) {
            //low表示格子能到达的最终位置,t表示当前位置
            var t = j;
            while(t!=low && gameGrid[i][t]!=0){
                if(gameGrid[i][t-1]==0){
                    gameGrid[i][t-1]=gameGrid[i][t];
                    gameGrid[i][t] = 0;
                    t--;
                }
                else if(gameGrid[i][t-1] == gameGrid[i][t]){
                    gameGrid[i][t-1] += gameGrid[i][t];
                    gameScore += gameGrid[i][t-1];
                    gameGrid[i][t] = 0;
                    low = t;
                    break;
                }
                else {
                    low = t;
                    break;
                }
            }
        }
    }
    createOneNum();
}
function moveRight(){
    if(!canMoveRight())return;
    for(var i=0;i<gameSize;++i) {
        var low= gameSize-1;
        for (var j = gameSize-2; j >=0; --j) {
            //low表示格子能到达的最终位置,t表示当前位置
            var t = j;
            while(t!=low && gameGrid[i][t]!=0){
                if(gameGrid[i][t+1]==0){
                    gameGrid[i][t+1]=gameGrid[i][t];
                    gameGrid[i][t] = 0;
                    t++;
                }
                else if(gameGrid[i][t+1] == gameGrid[i][t]){
                    gameGrid[i][t+1] += gameGrid[i][t];
                    gameScore += gameGrid[i][t+1];
                    gameGrid[i][t] = 0;
                    low = t;
                    break;
                }
                else {
                    low = t;
                    break;
                }
            }
        }
    }
    createOneNum();
}
function moveUp(){
    if(!canMoveUp())return;
    for(var i=0;i<gameSize;++i) {
        var low= 0;
        for (var j = 1; j < gameSize; ++j) {
            //low表示格子能到达的最终位置,t表示当前位置
            var t = j;
            while(t!=low && gameGrid[t][i]!=0){
                if(gameGrid[t-1][i]==0){
                    gameGrid[t-1][i]=gameGrid[t][i];
                    gameGrid[t][i] = 0;
                    t--;
                }
                else if(gameGrid[t-1][i] == gameGrid[t][i]){
                    gameGrid[t-1][i] += gameGrid[t][i];
                    gameGrid[t][i] = 0;
                    gameScore += gameGrid[t-1][i];
                    low = t;
                    break;
                }
                else {
                    low = t;
                    break;
                }
            }
        }
    }
    createOneNum();
}
function moveDown(){
    if(!canMoveDown())return;
    for(var i=0;i<gameSize;++i) {
        var low= gameSize-1;
        for (var j = gameSize-2; j >= 0; --j) {
            //low表示格子能到达的最终位置,t表示当前位置
            var t = j;
            while(t!=low && gameGrid[t][i]!=0){
                if(gameGrid[t+1][i]==0){
                    gameGrid[t+1][i]=gameGrid[t][i];
                    gameGrid[t][i] = 0;
                    t++;
                }
                else if(gameGrid[t+1][i] == gameGrid[t][i]){
                    gameGrid[t+1][i] += gameGrid[t][i];
                    gameScore += gameGrid[t+1][i];
                    gameGrid[t][i] = 0;
                    low = t;
                    break;
                }
                else {
                    low = t;
                    break;
                }
            }
        }
    }
    createOneNum();
}