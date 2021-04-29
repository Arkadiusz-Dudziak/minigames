const box = 32;

const foodImg = new Image();
foodImg.src = "images/food.png";

// create the food
let food = {
    x : Math.floor(Math.random()*17+1) * box,
    y : Math.floor(Math.random()*15+3) * box
}