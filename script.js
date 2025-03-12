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

    return { getBoard, putValue, printBoard }
}

// create GameController object which will take the Gameboard object,
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

    const playRound = (row, column) => {
        console.log(`${getActivePlayer().name} putitng value in row ${row} & column ${column}...`)

        board.putValue(row, column, getActivePlayer().value)

        switchActivePlayer()

        printNewRound()
    }

    printNewRound()

    return { playRound }
}

let x = GameController()



