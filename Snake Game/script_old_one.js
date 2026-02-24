const board = document.querySelector(".board");
const startButton = document.querySelector(".btn-start");

const modal = document.querySelector(".modal");
const startGameModal = document.querySelector(".start-game");
const gameOverModal = document.querySelector(".game-over");
const restartButton = document.querySelector(".btn-restart");

const highScoreElement = document.querySelector("#high-score");
const scoreElement = document.querySelector("#score");
const timeElement = document.querySelector("#time");

const blockHeight = 50;
const blockWidth = 50;

let highScore = localStorage.getItem("highScore") || 0;
let score = 0;
let time = `00:00`;

let speed = 700;

highScoreElement.innerHTML = highScore;

const cols = Math.floor(board.clientWidth / blockWidth);
const rows = Math.floor(board.clientHeight / blockHeight);
let intervalId = null;
let timerIntervalId = null;
let food = {
    x: Math.floor(Math.random() * rows),
    y: Math.floor(Math.random() * cols),
};

const blocks = [];

//snake spawn location
let snake = [
    {
        x: 1,
        y: 1,
    },
];

// first time snake moving direction
let direction = "right";

// for(let i=0; i< rows*cols ;i++){
//     const block = document.createElement('div');
//     block.classList.add('block');
//     board.appendChild(block);
// }

// creating the grid in which snake will move
for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
        const block = document.createElement("div");
        block.classList.add("block");
        board.appendChild(block);

        // block.innerText = `${row}-${col}`;
        blocks[`${row}-${col}`] = block;
    }
}

function render() {
    let head = null;

    blocks[`${food.x}-${food.y}`].classList.add("food");

    //moving the snake according to the command we are getting from teh key board
    if (direction === "left") {
        head = { x: snake[0].x, y: snake[0].y - 1 };
    } else if (direction === "right") {
        head = { x: snake[0].x, y: snake[0].y + 1 };
    } else if (direction === "up") {
        head = { x: snake[0].x - 1, y: snake[0].y };
    } else if (direction === "down") {
        head = { x: snake[0].x + 1, y: snake[0].y };
    }

    //if strike with walls game over
    if (head.x < 0 || head.x >= rows || head.y < 0 || head.y >= cols) {
        // alert("Game Over");
        clearInterval(intervalId);

        modal.style.display = "flex";
        startGameModal.style.display = "none";
        gameOverModal.style.display = "flex";
        return;
    }

    snake.forEach((segment) => {
        blocks[`${segment.x}-${segment.y}`].classList.remove("fill");
    });


    //self collision
    for (let segment of snake) {
        if (segment.x === head.x && segment.y === head.y) {
            restartGame();
        }
    }

    snake.unshift(head);
    snake.pop();

    // food consume logic

    //removing the food consumed and adding the new food
    if (head.x == food.x && head.y == food.y) {
        blocks[`${food.x}-${food.y}`].classList.remove("food");
        food = {
            x: Math.floor(Math.random() * rows),
            y: Math.floor(Math.random() * cols),
        };
        blocks[`${food.x}-${food.y}`].classList.add("food");

        //adding the snake body part after the food consumed
        snake.unshift(head);

        //updating the score part
        score += 1;
        scoreElement.innerHTML = score;

        if (score % 5 === 0) {
            increaseSpeed();
        }

        if (score > highScore) {
            highScore = score;
            localStorage.setItem("highScore", highScore.toString());
        }

    }

    // storing all the coordinates of the snake is moving
    snake.forEach((segment) => {
        blocks[`${segment.x}-${segment.y}`].classList.add("fill");
    });
}

// intervalId = setInterval(() => {
//   render();
// }, 500);

//start button and calling the render function
startButton.addEventListener("click", () => {
    modal.style.display = "none";
    intervalId = setInterval(() => {
        render();
    }, speed);
    timerIntervalId = setInterval(() => {
        let [min, sec] = time.split("-").map(Number)

        if (sec == 59) {
            min += 1
            sec = 0
        } else {
            sec += 1
        }

        time = `${min}-${sec}`
        timeElement.innerHTML = time
    }, 1000)
});

//taking input on the restart button
restartButton.addEventListener("click", restartGame);

// after the game over restart the game and removing the screen and past food and snake location and then spawning the food and snake again
function restartGame() {
    // removing the last food location
    blocks[`${food.x}-${food.y}`].classList.remove("food");

    // removing the last snake location
    snake.forEach((segment) => {
        blocks[`${segment.x}-${segment.y}`].classList.remove("fill");
    });

    score = 0;
    time = `00-00`;

    scoreElement.innerHTML = score
    timeElement.innerHTML = time
    highScoreElement.innerHTML = highScore

    //getting thing ready for the next game resetting basic game logic
    modal.style.display = "none";
    direction = "right";
    snake = [{ x: 1, y: 1 }];
    food = {
        x: Math.floor(Math.random() * rows),
        y: Math.floor(Math.random() * cols),
    };

    intervalId = setInterval(() => {
        render();
    }, speed);
}


//controlling the speed of the snake as game progress
function increaseSpeed() {
    clearInterval(intervalId)
    speed -= 200;

    if (speed < 150) {
        speed = 150;
    }
    intervalId = setInterval(() => {
        render();
    }, speed);
}

//taking input from the keyboard
addEventListener("keydown", (e) => {
    if (e.key == "ArrowUp" && direction !== "down") {
        direction = "up";
    } else if (e.key == "ArrowDown" && direction !== "up") {
        direction = "down";
    } else if (e.key == "ArrowLeft" && direction !== "right") {
        direction = "left";
    } else if (e.key == "ArrowRight" && direction !== "left") {
        direction = "right";
    }
});


// addEventListener("keydown", (e) => {
//     if ((direction = "up") && (e.key == "ArrowDown")) {
//         restartGame()
//     }
// })
