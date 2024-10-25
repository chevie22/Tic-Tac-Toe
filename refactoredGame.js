const Gameboard = (function() {
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
})();

function ShowGame(){

    let boardArray = Gameboard.getBoard();

    let gameEnd;

    let currentPlayerSymbol;

    let cellsInBoard = 0;

    let gameContainer = document.querySelector("#gameContainer");


    const updateBoard = () =>{
        for(let i = 0; i < boardArray.length; i++){
            for(let j = 0; j < boardArray[i].length; j++){
                document.querySelector(`#a${i}a${j}`).innerHTML = boardArray[i][j];
            }
        }

    }
    return{
        updateBoard,
    }
};

(function GameListener(){
    const gameController = GameController();
    const showGame = ShowGame();

    let boardArray = Gameboard.getBoard();

    for(let i = 0; i < boardArray.length; i++){
        for(let j = 0; j < boardArray[i].length; j++){
            let cell = document.createElement("button");
            cell.className = "cell";
            cell.id = `a${i}a${j}`;
            gameContainer.appendChild(cell);
        }
    }

    gameContainer.addEventListener("click", (e) =>{
        gameEnd = gameController.getGameEnd();
        currentPlayerSymbol = gameController.getCurrentPlayerTurnPlayerSymbol();

        let target = e.target;
        
        coordinatesClicked = e.target.id.split("a").map(Number);

        gameController.playerMove(coordinatesClicked[1], coordinatesClicked[2]);
        showGame.updateBoard();
        // updateBoard();
    });

})();

function GameController(playerOneName = "Player1", playerTwoName = "Player2"){
    let gameEnd = false;
    let whosPlayerTurn = 1;
    let gameMoves = 0;

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
        if(!gameEnd){
            isMoveSuccessful = Gameboard.addPlayerMove(boardX, boardY, getCurrentPlayerTurnPlayerSymbol());
            
            if(isMoveSuccessful){
                checkWin();
                switchPlayerTurn();
                gameMoves++;
            }
            if(gameMoves >= 9){
                gameEnd = true;
                console.log("Game Tied!");
            }else{
                if(!gameEnd){
                    console.log(Gameboard.getBoard());
                    console.log(`${players[whosPlayerTurn - 1].name}'s Turn`);
                }
            }
        }
        else{
            console.log("Game is over bruh!!!");
        }
    };

    const checkWin = () =>{
        boardState = Gameboard.getBoard();

        for(let i = 0; i < winningCombinations.length; i++){
            const [a, b, c] = winningCombinations[i];
            if(
                boardState[a[0]][a[1]] &&
                boardState[a[0]][a[1]] === boardState[b[0]][b[1]] &&
                boardState[a[0]][a[1]] === boardState[c[0]][c[1]]
            ){
                const blurDiv = document.createElement("div");
                blurDiv.id = "transparentScreen";
                document.body.appendChild(blurDiv);

                const winnerMessage = document.createElement("div");
                winnerMessage.id = "winnerMessage"
                winnerMessage.innerHTML = `${players[whosPlayerTurn - 1].name} winz!`;

                document.body.appendChild(winnerMessage);

                winnerMessage.classList.add("fadeIn");

                console.log(`${players[whosPlayerTurn - 1].name} winz!`);
                gameEnd = true;
            }
        }
    };

    const getGameEnd = () =>{
        return gameEnd;
    }

    return {
        playerMove,
        getCurrentPlayerTurnPlayerSymbol,
        getGameEnd,
    }
}




