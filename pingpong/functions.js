// General functions and parametrs

function rand(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}


function getRandDirection() {
    return arguments[rand(0, arguments.length-1)];
}

let canvas = document.getElementById('canv');
let ctx = canvas.getContext('2d');


var player = createPlayer(10, 300);
var player2 = createPlayer(680, 300);

var ballOwn;

// Ball functions 

let isStarted = false;

function createBall() {

    ctx.fillStyle = 'Lightgray';

    let ball;

    if(rand(0, 2) == 0 && !isStarted) {

        ctx.fillRect(player['x']+10, player['y']+35, 30, 30);

        ball = {
            x: player['x']+10,
            y: player['y']+35
        }
        ballOwn = 1;
    }   else {

        ctx.fillRect(player2['x']-30, player2['y']+35, 30, 30);

        ball = {
            x: player2['x']-30,
            y: player2['y']+35
        }
        ballOwn = 2;
    }


    return ball;
}

let ball = createBall();


// Player functions


function createPlayer(x, y) {
    let pc = {
        x: x,
        y: y
    }

    ctx.fillStyle = 'Gray';
    ctx.fillRect(pc['x'], pc['y'], 10, 100);

    return pc;
}

function reDraw(player, player2) {
    
    ctx.fillStyle = '#0a0a0a';

    ctx.fillRect(10, 0, 10, 700);
    ctx.fillRect(680, 0, 10, 700);
    ctx.fillRect(20, 0, 660, 700);

    ctx.fillStyle = 'Gray';
    ctx.fillRect(player['x'], player['y'], 10, 100);
    ctx.fillRect(player2['x'], player2['y'], 10, 100);
    
    ctx.fillStyle = 'Lightgray';
    ctx.fillRect(ball['x'], ball['y'], 30, 30);
}

let isPressedUp = false;
let isPressedDown = false;

let isPressedUp1 = false;
let isPressedDown1 = false;


$(document).keydown(function(e) {
    let key = e.originalEvent.key;
    console.log(key);
    if(key == 'w' || key == 'ц') isPressedUp = true;
    if(key == 's' || key == 'ы') isPressedDown = true;
    if(key == 'ArrowUp') isPressedUp1 = true;
    if(key == 'ArrowDown') isPressedDown1 = true;
});

$(document).keyup(function(e) {
    let key = e.originalEvent.key;
    if(key == 'w') isPressedUp = false;
    if(key == 's') isPressedDown = false;
    if(key == 'ArrowUp') isPressedUp1 = false;
    if(key == 'ArrowDown') isPressedDown1 = false;
    if(key == 'Enter') {
        isStarted = true;
        $('h1').toggle();
        // TODO: Drop ball to enemy, bouncing ball from the walls and player, onbounce enemy's wall event, score
    }
});

setInterval(() => {
    if(isPressedDown) {
        if(player['y'] <= 600) player['y']++;
    }

    if(isPressedUp) {
        if(player['y'] >= 0) player['y']--
    }

    if(isPressedDown1) {
        if(player2['y'] <= 600) player2['y']++;
    }

    if(isPressedUp1) {
        if(player2['y'] >= 0) player2['y']--
    }

    if(!isStarted) 
        if(ballOwn == 1) ball['y'] = player['y']+35;
        else ball['y'] = player2['y']+35;
    reDraw(player, player2);
}, 1);
