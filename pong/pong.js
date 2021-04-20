// select canvas
const cvs = document.getElementById("pong");
const ctx = cvs.getContext("2d");
const playVersusComputer = false;
var pauseButton = document.getElementById("pauseButton");
var isPaused = true;
var goalsNeededToWin = 5;
var player1InitState, player2InitState, ballInitState;
// create the player1 padle
var player1 = {
    x: 50,
    y: cvs.height/2 - 100/2,
    width: 10,
    height: 100,
    color: "WHITE",
    score: 0
}

// create the player2 padle
var player2 = {
    x: cvs.width - 60,
    y: cvs.height/2 - 100/2,
    width: 10,
    height: 100,
    color: "WHITE",
    score: 0
}

//create the ball
var ball = {
    x: cvs.width/2,
    y: cvs.height/2,
    radius: 10,
    velocityX: 5,
    velocityY: 0,
    speed: 5,
    color: "WHITE"
}

//create the net
const net = {
    x: cvs.width/2 - 1,
    y: 0,
    width: 2,
    height: 10,
    color: "WHITE"
}

//draw net
function drawNet(){
    for(let i=0; i<=cvs.height; i+=15){
        drawRect(net.x, net.y + i, net.width, net.height, net.color);
    }
}

// draw rect function
function drawRect(x, y, w, h, color){
    ctx.fillStyle = color; 
    ctx.fillRect(x,y,w,h);
}

// draw Circle
function drawCircle(x,y,r,color){
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x,y,r,0,Math.PI*2,true);
    ctx.closePath();
    ctx.fill();
}

//draw Text
function drawText(text,x,y,color){
    ctx.fillStyle = color; 
    ctx.font = "45px fantasy";
    ctx.fillText(text,x,y);
}

//control the player1 padle 
// cvs.addEventListener("mousemove", movePadle);

document.addEventListener('keydown', paddleControllerDown);
document.addEventListener('keyup', paddleControllerUp);

const controller = {
    w: false,
    s: false, 
    up: false,
    down: false,
    space: false
}


function paddleControllerDown(e) {
    let key = e.key || String.fromCharCode(e.keyCode);
    if ('w' === key) {
        controller.w = true;
    }
    if ('s' === key) {
        controller.s = true;
    }

    if ('ArrowUp' === key) {
        controller.up = true;
    }
    if ('ArrowDown' === key) {
        controller.down = true;
    }
    if(' ' === key)
    {
        controller.space = true;
        pause();
    }
    if('r' === key)
        resetGame();    
}

function paddleControllerUp(e) {
    let key = e.key || String.fromCharCode(e.keyCode);
    if ('w' === key) {
        controller.w = false;
    }
    if ('s' === key) {
        controller.s = false;
    }

    if ('ArrowUp' === key) {
        controller.up = false;
    }
    if ('ArrowDown' === key) {
        controller.down = false;
    }
    if(' ' === key)
    {
        controller.space = false;
    }
}

function movePadles(){
    if(controller.w)
        movePadleUp(player1);
    if(controller.s)
        movePadleDown(player1);
    if(controller.up)
        movePadleUp(player2);
    if(controller.down)
        movePadleDown(player2);
}

function movePadle(evt){
    let rect = cvs.getBoundingClientRect();

    player1.y = evt.clientY - rect.top - player1.height/2;
}

function movePadleDown(player){
    player.y = player.y + 5;
}
function movePadleUp(player){
    player.y = player.y - 5;
}


function render(){
    //clear the canvas
    drawRect(0, 0, cvs.width, cvs.height, "BLACK");

    //draw the net
    drawNet();

    //draw score
    drawText(player1.score, cvs.width/4, cvs.height/5, "WHITE");
    drawText(player2.score, 3*cvs.width/4, cvs.height/5, "WHITE");

    //draw the player1 and player2 padle
    drawRect(player1.x, player1.y, player1.width, player1.height, player1.color);
    drawRect(player2.x, player2.y, player2.width, player2.height, player2.color);

    //draw the ball
    drawCircle(ball.x, ball.y, ball.radius, ball.color);
}

function collision(b, p){
    b.top = b.y - b.radius;
    b.bottom = b.y + b.radius;
    b.left = b.x - b.radius;
    b.right = b.x + b.radius; 

    p.top = p.y; 
    p.bottom = p.y + p.height;
    p.left = p.x;
    p.right = p.x + p.width;

    return b.right > p.left && b.bottom > p.top && b.left < p.right && b.top < p.bottom;
}

//reset ball
function resetBall(){
    ball.x = cvs.width/2;
    ball.y = cvs.height/2;

    ball.speed = 5;
    ball.velocityX = 5;
    ball.velocityY = 0;
    ball.velocityX = -ball.velocityX;
    pause();
}

//update: pos, mov, score, ...
function update(){
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;

    movePadles();

    if(playVersusComputer)
    {
        // simple AI to control the com paddle
        let computerLevel = 0.1;
        player2.y += (ball.y - (player2.y + player2.height/2)) * computerLevel;
    }
    

    if(ball.y + ball.radius > cvs.height || ball.y - ball.radius < 0){
        ball.velocityY = -ball.velocityY;
    }

    let player = (ball.x < cvs.width/2) ? player1 : player2;

    if(collision(ball, player)){
        // where the ball hit the player
        let collidePoint = ball.y - (player.y + player.height/2);

        //normalization
        collidePoint = collidePoint/(player.height/2);

        //calculate angle in Radian
        let angleRad = collidePoint * Math.PI/4;

        // X direction of the ball when it's hit
        let direction = (ball.x < cvs.width/2) ? 1 : -1;

        //change velocity X and Y
        ball.velocityX = direction * ball.speed * Math.cos(angleRad);
        ball.velocityY = direction * ball.speed * Math.sin(angleRad);

        //everytime the ball hit a paddle, we encrease its speed
        ball.speed += 0.2;
    }

    //update the score
    if(ball.x - ball.radius < 0){
        //the player2 win
        player2.score++;
        resetPositions();
    }else if(ball.x + ball.radius > cvs.width){
        //the player1 win
        player1.score++;
        resetPositions();
    }

}
function game(){
    if(!isPaused)
    {
        update();
    }
    render();
}

function pause(){
    if(controller.space == true)
        isPaused = !isPaused;
    if(pauseButton.getAttribute("onclick"))
        isPaused = !isPaused;
    if(isPaused)
        pauseButton.style="background-image: url(play-button.svg);"
    else
        pauseButton.style="background-image: url(pause.svg);"
}

function resetPositions(){
    player1.x = 50;
    player1.y = cvs.height/2 - 100/2;
    player2.x = cvs.width - 60;
    player2.y = cvs.height/2 - 100/2;
    resetBall();
    isPaused = true;
}

function resetGame(){
    player1 = jQuery.extend(true, {}, player1InitState);
    player2 = jQuery.extend(true, {}, player2InitState);
    ball = jQuery.extend(true, {}, ballInitState);
    isPaused = true;
}

function copyInitGameState(){
    player1InitState = jQuery.extend(true, {}, player1);
    player2InitState = jQuery.extend(true, {}, player2);
    ballInitState = jQuery.extend(true, {}, ball);
}
// number of frames per second
let framePerSecond = 60;
copyInitGameState();
//call the game function 60 times every 1 Sec
let loop = setInterval(game,1000/framePerSecond);
