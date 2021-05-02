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

function snakes_collision(head, array) {
    //check head collision
    if(head.x == array[0].x && head.y == array[0].y) {
        return true;
    } else {
        for(let i=0; i<array.length; i++) {
            if(head.x == array[i].x && head.y == array[i].y) {
                return true;
            }
        }
        return false;
    }
}

var s1 = new Snake(15, 10);
var s2 = new Snake(15,12);

var snakes = [];
snakes[0] = s1;
snakes[1] = s2;


// draw everything to canvas
function draw() {
    ctx.drawImage(groundImg, 0, 0);

    snakes.forEach((e, i) => {
        for(let j=0; j<e.snake.length; j++) {
            if( i == 0)
                ctx.fillStyle = ( j==0 )? "green" : "#b8ffba";
            if( i == 1)
                ctx.fillStyle = ( j==0 )? "blue" : "#4287f5";
            ctx.fillRect(e.snake[j].x, e.snake[j].y, box, box);
    
            ctx.strokeStyle = "red";
            ctx.strokeRect(e.snake[j].x, e.snake[j].y, box, box);
        }

        ctx.drawImage(foodImg, food.x, food.y);
        ctx.drawImage(foodImg, food2.x, food2.y);

        // old head position
        let snakeX = e.snake[0].x;
        let snakeY = e.snake[0].y;

        // which direction
        if( e.direction == "LEFT") snakeX -= box;
        if( e.direction == "UP") snakeY -= box;
        if( e.direction == "RIGHT") snakeX += box;
        if( e.direction == "DOWN") snakeY += box;

        // if snake eats the food 
        if(snakeX == food.x && snakeY == food.y) {
            e.score++;
            food = new Food();
        } else {
            if(snakeX == food2.x && snakeY == food2.y) {
                e.score++;
                food2 = new Food();
            } else {
                // remove the tail 
                e.snake.pop();
            }
        }
        


        // add new Head
        let newHead = {
            x : snakeX, 
            y : snakeY
        }

        // game over
        if(snakeX < box || snakeX > 36 * box || snakeY < 3*box 
            || snakeY > 22*box || collision(newHead, e.snake) 
            || snakes_collision(newHead, snakes[(i+1)%2].snake)) {
            clearInterval(game);
        }

        e.snake.unshift(newHead);

        ctx.fillStyle = "white";
        ctx.font = "45px Changa one";

        ctx.fillText(e.score, (i+1)*2*box, 1.6*box);

    });
}

// call draw function every 200ms
let game = setInterval(draw, 200);