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

const tetri = [];

var bestScore = 0;
const bestScoreElement = document.getElementById('bestPoints');
const bestPlayerElement = document.getElementById('winningPlayer');
const gameStatusElement = document.getElementById('gameStatus');

function updateBestScore() {
    bestScoreElement.innerText = bestScore;
    const player1 = tetri[0].player;
    const player2 = tetri[1].player;
    gameStatusElement.innerText = "WINNING"
    if(player1.score > player2.score) {
        bestPlayerElement.innerText = "Player1";
    } else if (player1.score < player2.score) {
        bestPlayerElement.innerText = "Player2";
    } else {
        gameStatusElement.innerText = "DRAW";
    }
}

const playerElements = document.querySelectorAll('.player');
[...playerElements].forEach(element => {
    const tetris = new Tetris(element);
    tetri.push(tetris);
})


const keyListener = (e) => {
        [
            ['d', 'a', 'q', 'e', 's'],
            ['ArrowRight', 'ArrowLeft', ',', '.', 'ArrowDown']
        ].forEach((key, index) => {
            const player = tetri[index].player;
            let keypressed = e.key || String.fromCharCode(e.keyCode);
            if(e.type === 'keydown'){
                if (key[0] === keypressed) {
                    player.move(1);
                } else if(key[1] === keypressed) {
                    player.move(-1);
                } else if(key[2] === keypressed) {
                    player.rotate(1);
                } else if(key[3] === keypressed) {
                    player.rotate(-1);
                }
            }
             if(key[4] === keypressed) {
                if(e.type === 'keydown') {
                    if(player.dropInterval !== player.DROP_FAST)
                    {
                        player.drop();
                        player.dropInterval = player.DROP_FAST;
                    }
                } else {
                    player.dropInterval = player.DROP_SLOW;
                }
                
            }
        });
}

document.addEventListener('keydown', keyListener);
document.addEventListener('keyup', keyListener);

