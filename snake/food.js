const box = 32;

const foodImg = new Image();
foodImg.src = "images/food.png";

class Food {
    constructor() {
        this.x = Math.floor(Math.random()*34+1) * box;
        this.y = Math.floor(Math.random()*20+3) * box;
    }
}

let food = new Food();