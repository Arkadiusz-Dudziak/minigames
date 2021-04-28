const canvas = document.getElementById("snake");
const ctx = canvas.getContext("2d");

// create the unit in px
const box = 32;

// load images
const groundImg = new Image();
groundImg.src = "images/ground2.jpg";

const foodImg = new Image();
foodImg.src = "images/food.png";

// create the snake 
let snake = [];
snake[0] = {
    x: 9 * box,
    y: 10 * box
}

// control the snake 
document.addEventListener("keydown", direction);
let d;
function direction(e) {
    let keypressed = e.key || String.fromCharCode(e.keyCode);
    if ('ArrowLeft' === keypressed && d != "RIGHT") {
        d = "LEFT";
    } else if ('ArrowUp' === keypressed && d != "DOWN") {
        d = "UP";
    } else if ('ArrowRight' === keypressed && d != "LEFT") {
        d = "RIGHT";
    } else if ('ArrowDown' === keypressed && d != "UP") {
        d = "DOWN";
    }
}

// check collision
function collision(head, array) {
    for(let i=0; i<array.length; i++) {
        if(head.x == array[i].x && head.y == array[i].y) {
            return true;
        }
    }
    return false;
}

// create the food
let food = {
    x : Math.floor(Math.random()*17+1) * box,
    y : Math.floor(Math.random()*15+3) * box
}

// score variable
let score = 0;

// draw everything to canvas
function draw() {
    ctx.drawImage(groundImg, 0, 0);

    for(let i=0; i<snake.length; i++) {
        ctx.fillStyle = ( i==0 )? "green" : "white";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);

        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.drawImage(foodImg, food.x, food.y);

    // old head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    

    // which direction
    if( d == "LEFT") snakeX -= box;
    if( d == "UP") snakeY -= box;
    if( d == "RIGHT") snakeX += box;
    if( d == "DOWN") snakeY += box;

    // if snake eats the food 
    if(snakeX == food.x && snakeY == food.y) {
        score++;
        food = {
            x : Math.floor(Math.random()*17+1) * box,
            y : Math.floor(Math.random()*15+3) * box
        }
    } else {
        // remove the tail 
        snake.pop();
    }

    // add new Head
    let newHead = {
        x : snakeX, 
        y : snakeY
    }

    // game over
    if(snakeX < box || snakeX > 17 * box || snakeY < 3*box 
        || snakeY > 17*box || collision(newHead, snake)) {
        clearInterval(game);
    }
    
    snake.unshift(newHead);

    ctx.fillStyle = "white";
    ctx.font = "45px Changa one";
    ctx.fillText(score, 2*box, 1.6*box);
}

// call draw function every 100ms
let game = setInterval(draw, 200);