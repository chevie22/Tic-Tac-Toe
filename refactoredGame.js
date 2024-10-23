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
            return true;
        }else{
            console.log("Cell is occupied noob");
            return false;
        }

    };

    return {
        getBoard,
        addPlayerMove,
    };
};

function GameController(playerOneName = "Player1", playerTwoName = "Player2"){
    const board = Gameboard();
    let gameEnd = false;
    let whosPlayerTurn = 1;

    const winningCombinations = [
        [ [0, 0], [0, 1], [0, 2] ],
        [ [1, 0], [1, 1], [1, 2] ],
        [ [2, 0], [2, 1], [2, 2] ],

        [ [0, 0], [1, 0], [2, 0] ],
        [ [0, 1], [1, 1], [2, 1] ],
        [ [0, 2], [1, 2], [2, 2] ],

        [ [0, 0], [1, 1], [2, 2] ],
        [ [2, 0], [1, 1], [0, 2] ],
    ];

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

    const getCurrentPlayerTurnPlayerSymbol = () =>{
        return players[whosPlayerTurn - 1].symbol;
    }

    const switchPlayerTurn = () =>{
        whosPlayerTurn = whosPlayerTurn === 1 ? 2 : 1;
    };

    const playerMove = (boardX, boardY) =>{
        console.log(checkWin());
        if(!gameEnd){
            isMoveSuccessful = board.addPlayerMove(boardX, boardY, getCurrentPlayerTurnPlayerSymbol());
            
            if(isMoveSuccessful){
                switchPlayerTurn();
            }
            console.log(board.getBoard());
            console.log(`Player ${whosPlayerTurn}'s Turn`);
        }
        else{
            console.log("Game is over bruh!!!");
        }
    };

    const checkWin = () =>{
        boardState = board.getBoard();
        for(let i = 0; i < winningCombinations.length; i++){
            const [a, b, c] = winningCombinations[i];
            if(
                boardState[a[0]][a[1]] &&
                boardState[a[0]][a[1]] === boardState[b[0]][b[1]] &&
                boardState[a[0]][a[1]] === boardState[c[0]][c[1]]
            ){
                gameEnd = true;
                return `${ boardState[a[0]][a[1]] } winz!`;
            }
        }
        return `no winnar yet :C`;
    };

    return {
        playerMove,
    }
}

const game = GameController();


game.playerMove(0, 0);
game.playerMove(0, 1);
game.playerMove(1, 0);
game.playerMove(1, 1);
game.playerMove(2, 0);
game.playerMove(2, 1);
game.playerMove(2, 1);
game.playerMove(2, 1);
game.playerMove(2, 1);


