var gameStatus = "stoped";

function startGame(){
    gameStatus = "started";
    resetGame();
    createOneNum();
    createOneNum();
    drawGameView();
}

/**/
function isGameOver() {
    if (getEmptySize()==0 && !canMoveLeft() && !canMoveUp() && !canMoveRight() && !canMoveDown()) {
        return true;
    }
    return false;
}

/*控制*/
function keyDown(e) {
    if(gameStatus != "started")return;
    var code = e.which;
    if (code >= 37 && code <= 40) {
        /*禁用按钮原有功能*/
        event.returnValue = false;
        switch (code) {
            case 37:/*左*/
                moveLeft();
                break;
            case 38:/*上*/
                moveUp();
                break;
            case 39:/*右*/
                moveRight();
                break;
            case 40:/*下*/
                moveDown();
                break;
        }
        drawGameView();
        if(isGameOver()){
            gameStatus="stoped";
            alert("游戏结束");
        }
    }
}

document.onkeydown = keyDown;