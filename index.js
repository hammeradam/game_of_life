document.addEventListener("DOMContentLoaded", () => {
    const board = document.querySelector('.board');
    const width = Math.floor(board.offsetWidth / 20);
    const height = Math.floor(board.offsetHeight / 20);
    const startButton = document.querySelector('.start_btn');
    let gameInterval;
    let currentCellArray = [];

    board.style.width = `${width * 20}px`;
    board.style.height = `${height * 20}px`;

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
            console.log('round');
            const newCellArray = [];

            currentCellArray.forEach(row => {
                newCellArray.push([...row]);
            })

            cells.forEach(cell => {
                const neighbourCount = getNumberOfNeighbours(cell);
                const isAlive = cell.classList.contains('active');

                if (isAlive) {

                    return;
                }

            });
        }, 1000);
    }

    const getNumberOfNeighbours = cell => {
        const row = parseInt(cell.getAttribute('row'),10);
        const col = parseInt(cell.getAttribute('col'), 10);
        const neighbourCount = 0;

        // if (row !== 0) {
        //     // Top left
        //     if (col !== 0) {
        //         const topLeft = document.querySelector(`[data-row="${row - 1}"][data-row="${col - 1}"]`)
        //         console.log(`[data-row="${row - 1}"][data-row="${col - 1}"]`);
        //         console.log(topLeft.classList.contains('active'));
        //     }
        // }
        //
        // if (row !== width - 1) {
        //
        // }
        //
        // if (col !== 0) {
        //
        // }
        //
        // if (col !== height - 1) {
        //
        // }
    }

    const stopGame = () => {
        clearInterval(gameInterval);
    }
});
