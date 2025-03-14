// create Cell object for each square which will contain some value

function Cell() {
    let value = " ";

    const getValue = () => value;

    const getNewValue = (player) => value = player;

    return { getValue, getNewValue }
}

// create a Gameboard object which will generate the board, 
// method to give the board, method to put the value in board,
// method to print the board

function Gameboard() {
    let board = [];
    let row = 3;
    let column = 3;

    for (let i = 0; i < row; i++) {
        board[i] = []
        for (let j = 0; j < column; j++) {
            board[i].push(Cell())
        }
    }

    const getBoard = () => board

    const putValue = (row, column, player) => {
        if (board[row][column].getValue() !== " ") {
            console.log("invalid move")
            return
        }
        board[row][column].getNewValue(player)
    }

    const printBoard = () => {
        const boardWithCellValues = board.map(row => row.map(cell => cell.getValue()))
        console.log(boardWithCellValues)
    }

    const checkWin = (name) => {
        for (let i = 0; i < row; i++) {
            if (
                board[i][0].getValue() !== " " &&
                board[i][0].getValue() === board[i][1].getValue() &&
                board[i][1].getValue() === board[i][2].getValue()
            ) {

                return `${name} won`
            }
        }

        for (let i = 0; i < column; i++) {
            if (
                board[0][i].getValue() !== " " &&
                board[0][i].getValue() === board[1][i].getValue() &&
                board[1][i].getValue() === board[2][i].getValue()
            ) {
                return `${name} won`

            }
        }

        if (
            board[0][0].getValue() !== " " &&
            board[0][0].getValue() === board[1][1].getValue() &&
            board[1][1].getValue() === board[2][2].getValue() ||

            board[0][2].getValue() !== " " &&
            board[0][2].getValue() === board[1][1].getValue() &&
            board[1][1].getValue() === board[2][0].getValue()
        ) {
            return `${name} won`
        }

        let boardFilled = true

        for (let i = 0; i < row; i++) {
            for (let j = 0; j < column; j++) {
                if (board[i][j].getValue() === " ") {
                    boardFilled = false
                }
            }
        }

        if (boardFilled) {
            return "It's a Tie!"
        }

        return false
    }

    return { getBoard, putValue, printBoard, checkWin }
}

// create GameController object which will take the GameBoard object,
// create an array which will have two players' object with name & value,
// a method to get active player
// a method to switch active player
// a method to print new round
// a method to play the round

function GameController(
    playerOneName = "Player One",
    playerTwoName = "Player Two"
) {
    const board = Gameboard()
    const players = [
        {
            name: playerOneName,
            value: "O"
        },
        {
            name: playerTwoName,
            value: "X"
        }
    ];

    let activePlayer = players[0];

    const switchActivePlayer = () => activePlayer = activePlayer === players[0] ? players[1] : players[0];

    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        board.printBoard()
        console.log(`${getActivePlayer().name}'s turn.`)
    }

    let winner;

    const playRound = (row, column) => {
        console.log(`${getActivePlayer().name} putting value in row ${row} & column ${column}...`)

        board.putValue(row, column, getActivePlayer().value)

        winner = board.checkWin(getActivePlayer().name)

        console.log(winner)

        if (!winner) {
            switchActivePlayer()
            printNewRound()
        }

    }
    const getWinner = () => winner

    printNewRound()

    return { playRound, getActivePlayer, getBoard: board.getBoard, getWinner }
}

function ScreenController() {
    const game = GameController();
    const playerTurnDiv = document.querySelector(".turn")
    const boardDiv = document.querySelector(".board")
    const result = document.querySelector(".result")

    const updateScreen = () => {
        boardDiv.textContent = "";
        const board = game.getBoard();
        const activePlayer = game.getActivePlayer();

        playerTurnDiv.textContent = `${activePlayer.name}'s turn...`

        if (game.getWinner()) {
            result.textContent = game.getWinner()
            boardDiv.removeEventListener("click", clickHandlerBoard)

        }

        board.forEach((row, rowIndex) => {
            row.forEach((cell, columnIndex) => {
                const cellButton = document.createElement("button")
                cellButton.classList.add("cell");

                cellButton.dataset.row = rowIndex
                cellButton.dataset.column = columnIndex
                cellButton.textContent = cell.getValue()
                boardDiv.appendChild(cellButton)
            })
        })
    }

    function clickHandlerBoard(e) {

        const selectedColumn = e.target.dataset.column
        const selectedRow = e.target.dataset.row

        if (!selectedColumn && !selectedRow) return;

        game.playRound(selectedRow, selectedColumn)
        updateScreen();
    }

    boardDiv.addEventListener("click", clickHandlerBoard);
    updateScreen()
}

ScreenController()