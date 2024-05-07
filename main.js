const ticTacToe = (function () {
    const gameboard = {
        tiles: ["", "", "",
                "", "", "",
                "", "", ""]
    };
    
    const players = {
        playerOne: "X",
        playerTwo: "O"
    };

    const gameFlow = {
        playerTurn: "",
        gameResult: "",

        checkWinner: function () {
            if ((gameboard.tiles[0] === "X" && gameboard.tiles[1] === "X" && gameboard.tiles[2] === "X") ||
                (gameboard.tiles[3] === "X" && gameboard.tiles[4] === "X" && gameboard.tiles[5] === "X") ||
                (gameboard.tiles[6] === "X" && gameboard.tiles[7] === "X" && gameboard.tiles[8] === "X") ||
                (gameboard.tiles[0] === "X" && gameboard.tiles[3] === "X" && gameboard.tiles[6] === "X") ||
                (gameboard.tiles[1] === "X" && gameboard.tiles[4] === "X" && gameboard.tiles[7] === "X") ||
                (gameboard.tiles[2] === "X" && gameboard.tiles[5] === "X" && gameboard.tiles[8] === "X") ||
                (gameboard.tiles[0] === "X" && gameboard.tiles[4] === "X" && gameboard.tiles[8] === "X") ||
                (gameboard.tiles[2] === "X" && gameboard.tiles[4] === "X" && gameboard.tiles[6] === "X")) {
                gameFlow.gameResult = "Player One WINS!"
            } else if ((gameboard.tiles[0] === "O" && gameboard.tiles[1] === "O" && gameboard.tiles[2] === "O") ||
                       (gameboard.tiles[3] === "O" && gameboard.tiles[4] === "O" && gameboard.tiles[5] === "O") ||
                       (gameboard.tiles[6] === "O" && gameboard.tiles[7] === "O" && gameboard.tiles[8] === "O") ||
                       (gameboard.tiles[0] === "O" && gameboard.tiles[3] === "O" && gameboard.tiles[6] === "O") ||
                       (gameboard.tiles[1] === "O" && gameboard.tiles[4] === "O" && gameboard.tiles[7] === "O") ||
                       (gameboard.tiles[2] === "O" && gameboard.tiles[5] === "O" && gameboard.tiles[8] === "O") ||
                       (gameboard.tiles[0] === "O" && gameboard.tiles[4] === "O" && gameboard.tiles[8] === "O") ||
                       (gameboard.tiles[2] === "O" && gameboard.tiles[4] === "O" && gameboard.tiles[6] === "O")) {
                gameFlow.gameResult = "Player Two WINS!"
            } else {
                if (gameboard.tiles.join("").length === 9) gameFlow.gameResult = "TIE!";
            }
        },

        displayResult: () => {console.log(gameFlow.gameResult);},

        resetGame: () => {
            gameboard.tiles = ["", "", "",
                               "", "", "",
                               "", "", ""];
            gameFlow.playerTurn = "";
            gameFlow.gameResult = "";
        },

        addMark: function(tile) {
            if (gameboard.tiles[tile] || gameFlow.gameResult) return;
    
            if (gameFlow.playerTurn === "X") {
                gameboard.tiles[tile] = players["playerTwo"];
                gameFlow.playerTurn = gameboard.tiles[tile];
            } else {
                gameboard.tiles[tile] = players["playerOne"];
                gameFlow.playerTurn = gameboard.tiles[tile];
            }
    
            gameFlow.checkWinner();
            if (gameFlow.gameResult) gameFlow.displayResult();
            console.log(gameboard.tiles);
        }
    };

    const displayDOM = {
        displayBoard: (function () {
            const gameboardDiv = document.createElement("div");
            gameboardDiv.classList.add("gameboard");
            document.body.appendChild(gameboardDiv);
    
            gameboard.tiles.forEach(tile => {
                const gameboardTile = document.createElement("div");
                gameboardTile.classList.add("gameboard-tile");
                gameboardTile.textContent = tile;
                gameboardDiv.appendChild(gameboardTile);
            });
        })(),

        displayMark: (function (gameboardTile) {
            const gameboardTiles = Array.from(document.querySelectorAll(".gameboard-tile"));

            gameboardTiles.forEach(gameboardTile => {
                gameboardTile.addEventListener("click", () => {
                    gameFlow.addMark(gameboardTiles.indexOf(gameboardTile));
                    gameboardTile.textContent = gameboard.tiles[gameboardTiles.indexOf(gameboardTile)];
                })
            });
        })()
    };

    console.log(gameboard.tiles);
    return {gameFlow, displayDOM};
})();