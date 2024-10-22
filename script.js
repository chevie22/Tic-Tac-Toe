let Gameboard = (function(){
    let board = [];
    let gameEnd = false;
    let playerTurn = "player1";

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

    for(let i = 0; i < 3; i++){
        board[i] = [];
        for(let j = 0; j < 3; j++){
            board[i].push("");
        };
    };

    const getBoard = () =>{
        return board;
    };

    const playerMove = (boardX, boardY) =>{
        if(!gameEnd){
            if(playerTurn == "player1"){
                board[boardX][boardY] = "X";
                playerTurn = "player2";
            }
            else{
                board[boardX][boardY] = "O";
                playerTurn = "player1";
            }
    
            console.log(getBoard());
            console.log(`${playerTurn}'s Turn`);
            console.log(checkWin());
        }
        else{
            console.log("Game already ended :C");
        }
    }

    const checkWin = () =>{
        for(let i = 0; i < winningCombinations.length; i++){
            const [a, b, c] = winningCombinations[i];
            if(
                board[a[0]][a[1]] &&
                board[a[0]][a[1]] === board[b[0]][b[1]] &&
                board[a[0]][a[1]] === board[c[0]][c[1]]
            ){
                gameEnd = true;
                return `${ board[a[0]][a[1]] } winz!`;
            }
        }
        return `no winnar yet :C`;
    }

    return {
        getBoard, 
        playerMove,
    };

})();

let playerController = (function(){
    const player1 = {
        name: "player1", 
        symbol: "X",
    };

    const player2 = {
        name: "player2",
        symbol: "O",
    };

})();

// Gameboard.playerMove(1, 0);
// Gameboard.playerMove(1, 1);
// Gameboard.playerMove(0, 0)
// Gameboard.playerMove(0, 1)



