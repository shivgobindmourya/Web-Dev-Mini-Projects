const board = document.querySelector(".board")
const startButton = document.querySelector(".btn-start")
const restartButton = document.querySelector(".btn-restart")

const modal = document.querySelector(".modal")
const startGameModal = document.querySelector(".start-game")
const gameOverModal = document.querySelector(".game-over");

const highScoreElement = document.querySelector("#high-score")
const scoreElement = document.querySelector("#score")
const timeElement = document.querySelector("#time")



// basic game config

const blockSize = 50;

// let rows = Math.floor(board.clientHeight / blockSize)
// let cols = Math.floor(board.clientWidth / blockSize)
let rows;
let cols;
let blocks = {};

let speed;
let intervalId = null;
let timerIntervalId = null;

let score = 0;
let highScore = Number(localStorage.getItem("highScore")) || 0;
let time = "00:00";

highScoreElement.innerHTML = highScore;




let snake;
let direction;
let food;

function createGrid() {
    board.innerHTML = "";
    blocks = {}
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const cell = document.createElement("div")
            cell.classList.add("block")
            board.appendChild(cell)
            blocks[`${row}-${col}`] = cell;
        }
    }
}


function initGame() {
    snake = [{ x: 1, y: 1 }]
    direction = "right"
    score = 0;
    speed = 700;
    time = "00:00"

    scoreElement.innerHTML = score;
    timeElement.innerHTML = time;
    spawnFood();
}

function spawnFood() {
    food = {
        x: Math.floor(Math.random() * rows),
        y: Math.floor(Math.random() * cols)
    }
}

function gameOver() {
    clearInterval(intervalId)
    clearInterval(timerIntervalId)

    modal.style.display = "flex";
    startGameModal.style.display = "none"
    gameOverModal.style.display = "flex"
}


function increaseSpeed() {
    clearInterval(intervalId)

    speed -= 150;

    if (speed < 150) {
        speed = 150;
    }
    intervalId = setInterval(render, speed);
}

function render() {
    Object.values(blocks).forEach(cell => {
        cell.classList.remove("food");
    });
    snake.forEach(segment => {
        blocks[`${segment.x}-${segment.y}`].classList.remove("fill");
    })

    let head = { ...snake[0] };


    //moving snake according to the direction
    if (direction === "left") {
        head = { x: snake[0].x, y: snake[0].y - 1 };
    } else if (direction === "right") {
        head = { x: snake[0].x, y: snake[0].y + 1 };
    } else if (direction === "up") {
        head = { x: snake[0].x - 1, y: snake[0].y };
    } else if (direction === "down") {
        head = { x: snake[0].x + 1, y: snake[0].y };
    }


    //Wall Collision
    if (head.x < 0 || head.x >= rows || head.y < 0 || head.y >= cols) {
        gameOver();
        return;
    }

    //snake self collision
    if (snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)) {
        gameOver();
        return;
    }


    //add new head
    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score++;
        scoreElement.innerHTML = score;

        if (score > highScore) {
            highScore = score;
            highScoreElement.innerHTML = highScore;
            localStorage.setItem("highScore", highScore);
        }

        if (score % 5 === 0) increaseSpeed();

        spawnFood();
    } else {
        //remove tail if not eating
        snake.pop();
    }

    //draw food
    blocks[`${food.x}-${food.y}`].classList.add("food");

    //draw snake
    snake.forEach(segment => {
        blocks[`${segment.x}-${segment.y}`].classList.add("fill");
    });
}


function startTimer() {
    timerIntervalId = setInterval(() => {
        let [min, sec] = time.split(":").map(Number);

        sec++;
        if (sec === 60) {
            min++;
            sec = 0;
        }
        time = `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
        timeElement.innerText = time;
    }, 1000);

}

//event listeners



window.addEventListener("load", () => {
    rows = Math.floor(board.clientHeight / blockSize)
    cols = Math.floor(board.clientWidth / blockSize)
    createGrid();
})
startButton.addEventListener("click", () => {
    modal.style.display = "none";
    initGame();
    intervalId = setInterval(render, speed);
    startTimer();
})

restartButton.addEventListener("click", () => {
    modal.style.display = "none";
    initGame();
    clearInterval(intervalId);
    clearInterval(timerIntervalId);
    intervalId = setInterval(render, speed);
    startTimer();
});


document.addEventListener("keydown", (e) => {
    if ((e.key === "ArrowUp" || e.key === "w") && direction !== "down") {
        direction = "up";
    } else if ((e.key === "ArrowDown" || e.key === "s") && direction !== "up") {
        direction = "down";
    } else if ((e.key === "ArrowLeft" || e.key === "a") && direction !== "right") {
        direction = "left";
    } else if ((e.key === "ArrowRight" || e.key === "d") && direction !== "left") {
        direction = "right";
    }
})


