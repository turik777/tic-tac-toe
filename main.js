const ticTacToe = (function () {
    const gameboard = {
        tiles: ["", "", "",
                "", "", "",
                "", "", ""]
    };
    
    const players = {
        playerOne: "X",
        playerTwo: "O",
        playerOneName: "Player 1",
        playerTwoName: "Player 2"
    };

    const gameFlow = {
        playerTurn: "",
        gameResult: "",
        isGameStarted: false,

        checkWinner: function () {
            if ((gameboard.tiles[0] === "X" && gameboard.tiles[1] === "X" && gameboard.tiles[2] === "X") ||
                (gameboard.tiles[3] === "X" && gameboard.tiles[4] === "X" && gameboard.tiles[5] === "X") ||
                (gameboard.tiles[6] === "X" && gameboard.tiles[7] === "X" && gameboard.tiles[8] === "X") ||
                (gameboard.tiles[0] === "X" && gameboard.tiles[3] === "X" && gameboard.tiles[6] === "X") ||
                (gameboard.tiles[1] === "X" && gameboard.tiles[4] === "X" && gameboard.tiles[7] === "X") ||
                (gameboard.tiles[2] === "X" && gameboard.tiles[5] === "X" && gameboard.tiles[8] === "X") ||
                (gameboard.tiles[0] === "X" && gameboard.tiles[4] === "X" && gameboard.tiles[8] === "X") ||
                (gameboard.tiles[2] === "X" && gameboard.tiles[4] === "X" && gameboard.tiles[6] === "X")) {
                gameFlow.gameResult = players.playerOneName + " WINS!";
            } else if ((gameboard.tiles[0] === "O" && gameboard.tiles[1] === "O" && gameboard.tiles[2] === "O") ||
                       (gameboard.tiles[3] === "O" && gameboard.tiles[4] === "O" && gameboard.tiles[5] === "O") ||
                       (gameboard.tiles[6] === "O" && gameboard.tiles[7] === "O" && gameboard.tiles[8] === "O") ||
                       (gameboard.tiles[0] === "O" && gameboard.tiles[3] === "O" && gameboard.tiles[6] === "O") ||
                       (gameboard.tiles[1] === "O" && gameboard.tiles[4] === "O" && gameboard.tiles[7] === "O") ||
                       (gameboard.tiles[2] === "O" && gameboard.tiles[5] === "O" && gameboard.tiles[8] === "O") ||
                       (gameboard.tiles[0] === "O" && gameboard.tiles[4] === "O" && gameboard.tiles[8] === "O") ||
                       (gameboard.tiles[2] === "O" && gameboard.tiles[4] === "O" && gameboard.tiles[6] === "O")) {
                gameFlow.gameResult = players.playerTwoName + " WINS!";
            } else {
                if (gameboard.tiles.join("").length === 9) gameFlow.gameResult = "TIE!";
            }
            displayDOM.updateInfo();
        },

        startGame: function () {
            gameFlow.isGameStarted = true;
            displayDOM.updateInfo();
        },

        resetGame: () => {
            gameboard.tiles = ["", "", "",
                               "", "", "",
                               "", "", ""];
            gameFlow.playerTurn = "";
            gameFlow.gameResult = "";

            const gameboardTiles = Array.from(document.querySelectorAll(".gameboard-tile"));
            gameboardTiles.forEach(gameboardTile => {
                gameboardTile.textContent = "";
            });
            gameFlow.isGameStarted = false;
            displayDOM.updateInfo();
        },

        addMark: function(tile) {
            if (gameboard.tiles[tile] || gameFlow.gameResult || !this.isGameStarted) return;
    
            if (gameFlow.playerTurn === "X") {
                gameboard.tiles[tile] = players["playerTwo"];
                gameFlow.playerTurn = gameboard.tiles[tile];
            } else {
                gameboard.tiles[tile] = players["playerOne"];
                gameFlow.playerTurn = gameboard.tiles[tile];
            }
            displayDOM.updateInfo();
    
            gameFlow.checkWinner();
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

        displayMark: (function () {
            const gameboardTiles = Array.from(document.querySelectorAll(".gameboard-tile"));

            gameboardTiles.forEach(gameboardTile => {
                gameboardTile.addEventListener("click", () => {
                    gameFlow.addMark(gameboardTiles.indexOf(gameboardTile));
                    gameboardTile.textContent = gameboard.tiles[gameboardTiles.indexOf(gameboardTile)];

                    if (gameFlow.playerTurn === "X") {
                        gameboardTile.style.color = "#0000FF";
                    } else {
                        gameboardTile.style.color = "#FF0000";
                    }
                })
            });
        })(),

        displayInfo: (function () {
            const gameInfo = document.createElement("p");
            gameInfo.classList.add("game-info");
            document.body.appendChild(gameInfo);
            gameInfo.textContent = "Press Start to play";
        })(),

        updateInfo: function () {
            players.playerOneName = document.querySelector("#player-one").value || players.playerOneName;
            players.playerTwoName = document.querySelector("#player-two").value || players.playerTwoName;
            const gameInfo = document.querySelector(".game-info");

            if (gameFlow.playerTurn === "O" || !gameFlow.playerTurn) {
                gameInfo.textContent = players.playerOneName + "'s Turn";
            } else if (gameFlow.playerTurn === "X") {
                gameInfo.textContent = players.playerTwoName + "'s Turn";
            }
            if (gameFlow.isGameStarted === false) gameInfo.textContent = "Press Start to play";
            if (gameFlow.gameResult) gameInfo.textContent = gameFlow.gameResult;
        },
    };

    const buttons = {
        startButton: (() => {
            const start = document.querySelector(".start");
            start.addEventListener("click", () => {
                gameFlow.startGame();
            })
        })(),

        resetButton: (() => {
            const reset = document.querySelector(".reset");
            reset.addEventListener("click", () => {
                gameFlow.resetGame();
            })
        })()
    };
})();