document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("board");
    const message = document.getElementById("message");
    const size = 15;
    let currentPlayer = "black";
    const cells = [];

    // Create board
    for (let i = 0; i < size; i++) {
        cells[i] = [];
        for (let j = 0; j < size; j++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.row = i;
            cell.dataset.col = j;
            cell.addEventListener("click", () => makeMove(cell, i, j));
            board.appendChild(cell);
            cells[i][j] = "";
        }
    }

    function makeMove(cell, row, col) {
        if (cells[row][col] !== "") {
            return;
        }
        cells[row][col] = currentPlayer;
        cell.classList.add(currentPlayer);
        if (checkWin(row, col)) {
            message.textContent = `Player ${currentPlayer === "black" ? 1 : 2} wins!`;
            board.removeEventListener("click", makeMove);
        } else {
            currentPlayer = currentPlayer === "black" ? "white" : "black";
            message.textContent = `Player ${currentPlayer === "black" ? 1 : 2}'s turn (${currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1)})`;
        }
    }

    function checkWin(row, col) {
        return (
            checkDirection(row, col, 1, 0) || // Horizontal
            checkDirection(row, col, 0, 1) || // Vertical
            checkDirection(row, col, 1, 1) || // Diagonal down-right
            checkDirection(row, col, 1, -1)   // Diagonal down-left
        );
    }

    function checkDirection(row, col, rowDir, colDir) {
        let count = 1;
        let r = row + rowDir;
        let c = col + colDir;
        while (r >= 0 && r < size && c >= 0 && c < size && cells[r][c] === currentPlayer) {
            count++;
            r += rowDir;
            c += colDir;
        }
        r = row - rowDir;
        c = col - colDir;
        while (r >= 0 && r < size && c >= 0 && c < size && cells[r][c] === currentPlayer) {
            count++;
            r -= rowDir;
            c -= colDir;
        }
        return count >= 5;
    }
});
