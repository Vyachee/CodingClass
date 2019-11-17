/*

    author Grinvald
    vk.com/gora_pl

*/

let c = document.getElementById('field');
let ctx = c.getContext('2d');

let field = new Array(35);

let gameStarted = false;
let score = 0;
let foodExist = true;
let dir = 'right';

let lastCoord = [9, 10];

let player = {
    'x': 10,
    'y': 10
};

let food = {
    'x': 1,
    'y': 7
};

let tail = [];

let tailSize = 0;

function rand(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function initField() {
    for(let i = 0; i < 35; i++) {
        field[i] = new Array(35);
        for(let u = 0; u < 35; u++) {
            field[i][u] = 0;
        }
    }
}

function logField() {
    let s = "";

    for(let i = 0; i < 35; i++) {
        for(let u = 0; u < 35; u++) {
            s += field[i][u];
        }
        s += "\n";
    }

    console.log(s);
}

function drawGrid () {

    let x = 0, y = 0;
    
    ctx.fillStyle = 'rgba(255, 255, 255, .5)';

    for(let i = 0; i < 35; i++) {
        for(let u = 0; u < 35; u++) {
            ctx.fillRect(x + 19, y, 1, 20);
            ctx.fillRect(x, y + 19, 20, 1);
            x += 20;
        }
        x = 0;
        y += 20;
    }
}

function drawCell(x, y, type, color) {

    field[y][x] = type;

    ctx.fillStyle = color;
    ctx.fillRect(20*x, y * 20, 19, 19);

}

function clearField() {
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, 700, 700);
}

function isFoodOnSnake(x, y) {
    if(x == player['x'] && y == player['y']) 
        return true;

    for(let i = 0; i < tail.length; i++) 
        if(tail[i][0] == x && tail[i][1] == y) 
            return true;
    
    return false;
}

function isHeadOnTail() {
    for(let i = 0; i < tail.length; i++)
        if(tail[i][0] == player['x'] && tail[i][1] == player['y']) {
            for(let u = 0; u < i; u++) {
                tail.shift();
            }
            score -= i;
            tailSize -= i;
    
            $('.score').addClass('oof');
            setTimeout(() => {
                $('.score').removeClass('oof');
            }, 500);
        }
}

function genFood() {
    if(!foodExist) {

        while(isFoodOnSnake(food['x'], food['y'])) {
            food['x'] = rand(35);
            food['y'] = rand(35);
        }
        foodExist = true;
    }
    drawCell(food['x'], food['y'], 2, 'red');
}

function drawTail() {
    for(let i = 0; i < tail.length; i++) {
        drawCell(tail[i][0], tail[i][1], 3, 'green');
    }
}

function refreshField() {
    clearField();

    drawCell(player['x'], player['y'], 1, 'lime');
    drawTail();

    genFood();
}

function updateScore() {
    $('.score').text(score);
}

function initGame() {
    initField();
    refreshField();
}

function round(num) {
    return Math.round(num * 100) / 100;
}

initGame();

$('body').keydown(function(e) {
    let key = e.originalEvent.key;
    if(!gameStarted) gameStarted = true;
    if(key == 'w' || key == 'ArrowUp' && dir != 'down') dir = 'top';
    if(key == 's' || key == 'ArrowDown' && dir != 'top') dir = 'down';
    if(key == 'a' || key == 'ArrowLeft' && dir != 'right') dir = 'left';
    if(key == 'd' || key == 'ArrowRight' && dir != 'left') dir = 'right';
});

setInterval(() => {
    if(gameStarted) {
        if(dir == 'right') player['x'] += 1;
        if(dir == 'left') player['x'] -= 1;
        if(dir == 'top') player['y'] -= 1;
        if(dir == 'down') player['y'] += 1;

        if(player['y'] > 34) player['y'] = 0;
        if(player['y'] < 0) player['y'] = 34;
        if(player['x'] < 0) player['x'] = 34; 
        if(player['x'] > 35) player['x'] = 0;

        if(player['x'] == food['x'] && player['y'] == food['y']) {

            score++;
            foodExist = false;
            genFood();
            tailSize++;

            if(dir == 'right') tail.unshift([tail[0][0] -= 1, tail[0][1]]);
            if(dir == 'left') tail.unshift([tail[0][0] += 1, tail[0][1]]);
            if(dir == 'top') tail.unshift([tail[0][0], tail[0][1] -= 1]);
            if(dir == 'down') tail.unshift([tail[0][0], tail[0][1] += 1]);
        }

        isHeadOnTail();

        if(tailSize != 0) {
            tail.shift();
            tail.push(lastCoord);
        }

        lastCoord = [player['x'], player['y']];

        updateScore();
    }
    refreshField();
}, 75);