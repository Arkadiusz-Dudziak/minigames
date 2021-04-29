const canvas = document.getElementById("snake");
const ctx = canvas.getContext("2d");

// create the unit in px
// const box = 32;

// load images
const groundImg = new Image();
groundImg.src = "images/ground.jpg";

// check collision
function collision(head, array) {
    for(let i=0; i<array.length; i++) {
        if(head.x == array[i].x && head.y == array[i].y) {
            return true;
        }
    }
    return false;
}

var s1 = new Snake(9, 10);


// draw everything to canvas
function draw() {
    ctx.drawImage(groundImg, 0, 0);

    for(let i=0; i<s1.snake.length; i++) {
        ctx.fillStyle = ( i==0 )? "green" : "white";
        ctx.fillRect(s1.snake[i].x, s1.snake[i].y, box, box);

        ctx.strokeStyle = "red";
        ctx.strokeRect(s1.snake[i].x, s1.snake[i].y, box, box);
    }

    ctx.drawImage(foodImg, food.x, food.y);

    // old head position
    let snakeX = s1.snake[0].x;
    let snakeY = s1.snake[0].y;

    

    // which direction
    if( d == "LEFT") snakeX -= box;
    if( d == "UP") snakeY -= box;
    if( d == "RIGHT") snakeX += box;
    if( d == "DOWN") snakeY += box;

    // if snake eats the food 
    if(snakeX == food.x && snakeY == food.y) {
        score++;
        food = {
            x : Math.floor(Math.random()*34+1) * box,
            y : Math.floor(Math.random()*20+3) * box
        }
    } else {
        // remove the tail 
        s1.snake.pop();
    }

    // add new Head
    let newHead = {
        x : snakeX, 
        y : snakeY
    }

    // game over
    if(snakeX < box || snakeX > 36 * box || snakeY < 3*box 
        || snakeY > 22*box || collision(newHead, s1.snake)) {
        clearInterval(game);
    }
    
    s1.snake.unshift(newHead);

    ctx.fillStyle = "white";
    ctx.font = "45px Changa one";
    ctx.fillText(score, 2*box, 1.6*box);
}

// call draw function every 100ms
let game = setInterval(draw, 200);