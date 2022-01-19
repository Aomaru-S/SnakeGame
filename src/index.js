const container = document.querySelector('#container')
let x
let y
let isStartedGame
let direction
let isPause
let oldX
let oldY
let interval

for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
        const cell = document.createElement('div')
        cell.id = 'cell' + i.toString() + j.toString()
        cell.classList.add('cell')
        container.appendChild(cell)
    }
}

initGame()

const move = () => {
    oldX = x
    oldY = y
    switch (direction) {
        case 0:
            y--
            break
        case 1:
            x--
            break
        case 2:
            y++
            break
        case 3:
            x++
            break
    }
    if (checkWall()) {
        alert('Game over')
        clearInterval(interval)
        isStartedGame = false
        return
    }
    const oldCell = document.querySelector('#cell' + oldY + oldX)
    oldCell.classList.remove('activeCell')
    const newCell = document.querySelector('#cell' + y + x);
    newCell.classList.add('activeCell')
}

document.body.addEventListener('keydown',
    event => {
        if (!isStartedGame || isPause) {
            return
        }
        switch (event.key) {
            case 'w':
                direction = 0
                break
            case 'a':
                direction = 1
                break
            case 's':
                direction = 2
                break
            case 'd':
                direction = 3
                break
        }
    })

function checkWall() {
    return x === -1 || x === 10 || y === -1 || y === 10;
}

function initGame() {
    clearInterval(interval)
    x = 0
    y = 0
    isStartedGame = false
    direction = 2
    isPause = false
    const oldCell = document.querySelector('#cell' + oldY + oldX)
    if (oldCell != null) {
        oldCell.classList.remove('activeCell')
    }

    document.querySelector('#cell00').classList.add('activeCell')
}

function startGame() {
    if (isStartedGame) {
        return
    }
    initGame();
    interval = setInterval(move, 100)
    isStartedGame = true
    document.querySelector('#cell00').classList.add('activeCell')
}

function pauseGame() {
    if (isStartedGame === false) {
        return
    }
    if (isPause) {
        interval = setInterval(move, 100);
    } else {
        clearInterval(interval);
    }
    console.log(isPause)
    isPause = !isPause
}