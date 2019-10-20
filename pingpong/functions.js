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

let score1 = 0;
let score2 = 0;

var ballOwn;

// Ball functions 

let isStarted = false;

function createBall(isRandom, ballOwner) {

    ctx.fillStyle = 'Lightgray';

    let ball;

    if(rand(0, 2) == 0 && !isStarted && isRandom) {

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

    if(!isRandom && ballOwner == 1) {
        ctx.fillRect(player['x']+10, player['y']+35, 30, 30);

        ball = {
            x: player['x']+10,
            y: player['y']+35
        }
        ballOwn = 1;
    }  
    if(!isRandom && ballOwner == 2) {
        ctx.fillRect(player2['x']-30, player2['y']+35, 30, 30);

        ball = {
            x: player2['x']-30,
            y: player2['y']+35
        }
        ballOwn = 2;
    }


    return ball;
}

let ball = createBall(true);


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

function clearField() {
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, 700, 700);
}

function restart(ballOwner) {
    player = createPlayer(10, 300);
    player2 = createPlayer(680, 300);
    ball = createBall(false, ballOwner);
    touched = false;
    isStarted = false;
    clearField();
    reDraw();
}

function reDraw() {
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
        $('h1').slideToggle();
        // TODO: bouncing ball from the walls and player, onbounce enemy's wall event, score

        if(ballOwn == 1) ball['x'] += 2;
        else ball['x'] -= 2;

        let droppedBall = setInterval(() => {
            if(ballOwn == 1) ball['x'] += 2;
            else ball['x'] -= 2;
            if(ball['x'] <= 20 || ball['x'] >= 650) clearInterval(droppedBall);
        }, 5);

    }
});

let playerAndBallCoords, diff, diff2, direction, dirTo;
let touched = false;

setInterval(() => {
    // Players' moves
    if(!touched) {
        if(isPressedDown) {
            if(player['y'] <= 598) player['y'] += 2;
        }
    
        if(isPressedUp) {
            if(player['y'] >= 2) player['y'] -= 2;
        }
    
        if(isPressedDown1) {
            if(player2['y'] <= 598) player2['y'] += 2;
        }
    
        if(isPressedUp1) {
            if(player2['y'] >= 2) player2['y'] -= 2;
        }
    }
    // *****

    if(!isStarted) 
        if(ballOwn == 1) ball['y'] = player['y']+35;
        else ball['y'] = player2['y']+35;

    if(isStarted && !touched) {
        diff = player['y']+100 - ball['y'];
        diff2 = player2['y']+100 - ball['y'];

        if(ball['x'] == 20 && diff <= 120 && diff >= 0) {       // Первый отбил
            console.log('2');
            ball['x'] += 2;
            if(rand(0, 2) == 0) direction = 'right-top';
            else direction = 'right-down';

            dirTo = 2;
        }

        if(ball['x'] == 650 && diff2 <= 120 && diff2 >= 0) {    // Второй отбил
            console.log('1');
            ball['x'] -= 2;
            if(rand(0, 2) == 0) direction = 'left-top';
            else direction = 'left-down';

            dirTo = 1;
            
        }
        
        if(ball['x'] == 20 && (diff > 120 || diff < 0)) {       // Первый не отбил
            ball['x'] = 0;
            score2++;
            $('.scoreP').text(score1 + ":" + score2);
            $('.scoreP').addClass('scored');
            touched = true;
            setTimeout(() => {
                restart(2);
                $('.scoreP').removeClass('scored');
            }, 1000);
        }

        if(ball['x'] == 650 && (diff2 > 120 || diff2 < 0)) {    // Второй не отбил
            ball['x'] = 670;
            score1++;
            $('.scoreP').text(score1 + ":" + score2);
            $('.scoreP').addClass('scored');
            touched = true;
            setTimeout(() => {
                restart(1);
                $('.scoreP').removeClass('scored');
            }, 1000);
        }

        if(direction == 'left-top') {
            ball['x']--;
            ball['y']--;
        }

        if(direction == 'left-down') {
            ball['x']--;
            ball['y']++;
        }

        if(direction == 'right-top') {
            ball['x']++;
            ball['y']--;
        }
        
        if(direction == 'right-down') {
            ball['x']++;
            ball['y']++;
        }

        if(ball['y'] <= 0 && dirTo == 1){
            console.log('ld');
            direction = 'left-down';
        }
        
        if(ball['y'] <= 0 && dirTo == 2) {
            console.log('rd');
            direction = 'right-down';
        }

        if(ball['y'] >= 670 && dirTo == 1) {
            console.log('lt');
            direction = 'left-top';
        }
            
        if(ball['y'] >= 670 && dirTo == 2) {
            console.log('rt');
            direction = 'right-top';
        }


    }

    $('.p1').text(player['x'] + ":" + player['y']);
    $('.p2').text(player2['x'] + ":" + player2['y']);
    $('.ball').text(ball['x'] + ":" + ball['y']);
    $('.diff').text(diff);
    $('.diff2').text(diff2);
    $('.score1').text(score1);
    $('.score2').text(score2);

    reDraw();
}, 1);