const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');

context.scale(20, 20);



function createPiece(type) {
    if(type === 'T') {
        return [
            [0, 0, 0],
            [1, 1, 1],
            [0, 1, 0]
        ];
    } else if(type === 'O') {
        return [
            [2, 2],
            [2, 2]
        ];
    } else if(type === 'L') {
        return [
            [0, 3, 0],
            [0, 3, 0],
            [0, 3, 3]
        ];
    } else if(type === 'J') {
        return [
            [0, 4, 0],
            [0, 4, 0],
            [4, 4, 0]
        ];
    } else if(type === 'I') {
        return [
            [0, 5, 0, 0],
            [0, 5, 0, 0],
            [0, 5, 0, 0],
            [0, 5, 0, 0]
        ];
    } else if(type === 'S') {
        return [
            [0, 6, 6],
            [6, 6, 0],
            [0, 0, 0]
        ];
    } else if(type === 'Z') {
        return [
            [7, 7, 0],
            [0, 7, 7],
            [0, 0, 0]
        ];
    }
}


function draw() {
    context.fillStyle = '#000';
    context.fillRect(0, 0, canvas.width, canvas.height);

    drawMatrix(arena.matrix, {x:0, y:0});
    drawMatrix(player.matrix, player.pos);
}










let lastTime = 0;

function update(time = 0) {
    const deltaTime = time - lastTime;
    lastTime = time;

    player.update(deltaTime);

    draw();
    requestAnimationFrame(update);
}

function updateScore() {
    document.getElementById("score").innerText = player.score;
}

function drawMatrix(matrix, offset){
    matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if(value !== 0) {
                context.fillStyle = colors[value];
                context.fillRect(x + offset.x, y + offset.y, 1, 1);
            }
        });
    });
}

const colors = [
    null, 
    'red',
    'blue',
    'violet',
    'green',
    'purple',
    'orange',
    'pink'
]

const arena = new Arena(12, 20);
console.log(arena); console.table(arena);

const player = new Player;

document.addEventListener('keydown', e => {
    let key = e.key || String.fromCharCode(e.keyCode);
    if ('ArrowRight' === key) {
        player.move(1);
    } else if('ArrowLeft' === key) {
        player.move(-1);
    } else if('ArrowDown' === key) {
        player.drop();
    } else if('q' === key) {
        player.rotate(1);
    } else if('e' === key) {
        player.rotate(-1);
    }
    
})

player.reset();
updateScore();
update();