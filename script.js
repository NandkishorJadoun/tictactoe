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
        if (board[row][column] !== " ") {
            console.log("invalid move")
            return
        }
        board[row][column] = player.getValue()
    }

    const printBoard = () => {
        const boardWithCellValues = board.map(row => row.map(cell => cell.getValue()))
        console.log(boardWithCellValues)
    }

    return { getBoard, putValue, printBoard }
}

const game = Gameboard()

