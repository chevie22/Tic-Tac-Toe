function Gameboard(){
    let board = [];

    for(let i = 0; i < 3; i++){
        board[i] = [];
        for(let j = 0; j < 3; j++){
            board[i].push("");
        };
    };

    const getBoard = () =>{
        return board;
    };

    const addPlayerMove = (boardX, boardY, symbol) =>{
        if(!board[boardX][boardY]){
            board[boardX][boardY] = symbol;
        }else{
            console.log("Cell is occupied noob");
        }

    };

    return {
        getBoard,
        addPlayerMove,
    };
};

function GameController(playerOneName = "Player1", playerTwoName = "Player2"){
    const board = Gameboard();

    const players = [
        {
            name: playerOneName,
            symbol: "X",
        },
        {
            name: playerTwoName,
            symbol: "O",
        }
    ];
    
    let whosPlayerTurn = 1;

    const getCurrentPlayerTurnPlayerSymbol = () =>{
        return players[whosPlayerTurn - 1].symbol;
    }

    const switchPlayerTurn = () =>{
        whosPlayerTurn = whosPlayerTurn === 1 ? 2 : 1;
    };

    const gameEnd = false;

    const playerMove = (boardX, boardY) =>{
        if(!gameEnd){
            board.addPlayerMove(boardX, boardY, getCurrentPlayerTurnPlayerSymbol());
            switchPlayerTurn();
            console.log(board.getBoard());
            console.log(`Player ${whosPlayerTurn}'s Turn`);
        }
    };

    const getPlayerTurn = () =>{
        return whosPlayerTurn;
    };



    return {
        getPlayerTurn,
        playerMove,
        getCurrentPlayerTurnPlayerSymbol,
        board,
    }
}

const game = GameController();


// bug, moves on to next turn even if cell is occupied
game.playerMove(0, 0);
game.playerMove(0, 0);

