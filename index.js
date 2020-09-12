document.addEventListener("DOMContentLoaded", () => {
    const CELL_WIDTH = 10;
    const INTERVAL_SPEED = 10;

    const board = document.querySelector('.board');
    const width = Math.floor(board.offsetWidth / CELL_WIDTH);
    const height = Math.floor(board.offsetHeight / CELL_WIDTH);
    const startButton = document.querySelector('.start_btn');
    let gameInterval;
    let currentCellArray = [];

    board.style.width = `${width * CELL_WIDTH}px`;
    board.style.height = `${height * CELL_WIDTH}px`;
    board.parentElement.style.display = 'flex';
    board.parentElement.style.alignItems = 'center';
    board.parentElement.style.justifyContent = 'center';
    board.parentElement.style.flexDirection = 'column';

    // Create the cells
    for (let i = 0; i < height; i++) {
        const row = document.createElement('div');
        row.classList.add('board__row');
        board.appendChild(row);

        currentCellArray.push([]);

        for (let j = 0; j < width; j++) {
            const cell = document.createElement('div');
            cell.setAttribute('row', i.toString());
            cell.setAttribute('col', j.toString());
            cell.classList.add('board__row__cell');
            currentCellArray[i].push(0);
            row.appendChild(cell);
        }
    }

    const cells = document.querySelectorAll('.board__row__cell');

    // Add cell click listeners
    cells.forEach(cell => {
        cell.addEventListener('click', function() {
            this.classList.toggle('active');
            currentCellArray[parseInt(this.getAttribute('row'), 10)][parseInt(this.getAttribute('col'), 10)] = 1;
        });
    });

    // Add start button event listener
    startButton.addEventListener('click', function() {
        if (this.classList.contains('active')) {
            this.innerHTML = 'START';
            this.classList.remove('active');
            stopGame();
            return;
        }

        this.innerHTML = 'STOP';
        this.classList.add('active');
        startGame();
    });

    const startGame = () => {
        gameInterval = setInterval(() => {
            const newCellArray = [];
            currentCellArray.forEach(row => {
                newCellArray.push([...row]);
            });

            currentCellArray.forEach((row, rowNumber) => {
                row.forEach((isAlive, colNumber) => {

                    const neighbourCount = getNumberOfNeighbours(rowNumber, colNumber);
                    if (isAlive) {
                        if (neighbourCount === 2 || neighbourCount === 3) {
                            newCellArray[rowNumber][colNumber] = 1;
                            return;
                        }

                        newCellArray[rowNumber][colNumber] = 0;
                        return;
                    }

                    if (neighbourCount === 3) {
                        newCellArray[rowNumber][colNumber] = 1;
                    }
                });
            });

            currentCellArray = newCellArray;

            document.querySelectorAll('.board__row').forEach((row, rowNumber) => {
               row.querySelectorAll('.board__row__cell').forEach((cell, colNumber) => {
                  if (currentCellArray[rowNumber][colNumber]) {
                      cell.classList.add('active');

                      return;
                  }

                  cell.classList.remove('active');
               });
            });
        }, INTERVAL_SPEED);
    }

    const getNumberOfNeighbours = (row, col) => {
        let neighbourCount = 0;

        if (row !== 0) {
            // Top left
            if (col !== 0) {
                if (currentCellArray[row - 1][col - 1] === 1) {
                    neighbourCount++;
                }
            }

            // Top
            if (currentCellArray[row - 1][col] === 1) {
                neighbourCount++;
            }

            // Top right
            if (col !== width - 1) {
                if (currentCellArray[row - 1][col + 1] === 1) {
                    neighbourCount++;
                }
            }
        }

        if (row !== height - 1) {
            // Bottom left
            if (col !== 0) {
                if (currentCellArray[row + 1][col - 1] === 1) {
                    neighbourCount++;
                }
            }

            // Bottom
            if (currentCellArray[row + 1][col] === 1) {
                neighbourCount++;
            }

            // Bottom right
            if (col !== width - 1) {
                if (currentCellArray[row + 1][col + 1] === 1) {
                    neighbourCount++;
                }
            }
        }

        // Left
        if (col !== 0) {
            if (currentCellArray[row][col - 1] === 1) {
                neighbourCount++;
            }
        }

        // Right
        if (col !== height - 1) {
            if (currentCellArray[row][col + 1] === 1) {
                neighbourCount++;
            }
        }
        return neighbourCount;
    }

    const stopGame = () => {
        clearInterval(gameInterval);
    }
});
