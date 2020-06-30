
var values = ['X','O'];
var currentPlayer;
var board;
var winCombos =[
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

var sock = io();

var gamestatus;
var cells = document.querySelectorAll('.cell');

function init()
{
    gamestatus = true;
    currentPlayer=0;
    board = ['', '', '', '', '', '', '', '', ''];
    for(var i=0;i<cells.length;i++){
        cells[i].textContent = '';
        cells[i].style.removeProperty('background-color');
        cells[i].addEventListener('click',turnClick,false);
    
        
    }
    document.querySelector('.player_turn').textContent = "X's Turn";
}
function turn(id){ 

    board[id] = values[currentPlayer];
    document.getElementById(id).textContent = values[currentPlayer];
    cells[id].removeEventListener('click',turnClick,false);
    let gameWon = checkWin(board);
    if(gameWon){
        gameOver(gameWon);
    }
    checkBoard(board);
    changeplayer();
}

function changeplayer(){
    if (gamestatus){
        currentPlayer = currentPlayer === 0 ? 1 : 0;
        document.querySelector('.player_turn').textContent = values[currentPlayer]+"'s Turn";
    }
}


function turnClick(square){
    if(gamestatus){
        turn(square.target.id);
    }
}

function checkWin(board){
    let plays = board.reduce((a,e,i) =>
        (e === values[currentPlayer])? a.concat(i) : a, []);
    let gameWon = null;
    for(let [index,win] of winCombos.entries()){
        if(win.every(elem => plays.indexOf(elem)> -1)){
            gameWon = {index: index, Player: currentPlayer};
            gamestatus = false;
            break;
        }
    }

    return gameWon;

}
 
function gameOver(gameWon){

    document.querySelector('.player_turn').textContent = values[currentPlayer]+" Wins!";
    for(let index of winCombos[gameWon.index]){
        document.getElementById(index).style.backgroundColor =
        gameWon.Player == 0 ? 'blue' : 'red';
    }
    for(var i=0;i<cells.length;i++){
        cells[i].removeEventListener('click',turnClick,false); 
    }
    

}

function checkBoard(board){
    if(gamestatus){
        for(var i=0;i<board.length;i++){
            if(board[i] == '') return;
        }
        document.querySelector('.player_turn').textContent = "It's a tie!";
        gamestatus = false;
        alert('Game staring shortly!');
        setTimeout(init,500);
    }
}



init();





