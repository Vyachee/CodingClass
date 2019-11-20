let canv = document.getElementById('flappy');
let ctx = canv.getContext('2d');

let pipes = [];

let failed = false;
let score = 0;

let p = {
	'x' : 10,
	'y' : 10
}

let vlad = document.getElementById('sprite');

function rand(min, max) {
	return Math.random() * (max - min) + min;
}

function initGame() {
	createPipes(300);
}

function createPipes(x) {

	let firstPipe = rand(50, 200);

	ctx.fillStyle = '#6aa64e';
	ctx.fillRect(x, 0, 50, firstPipe);

	let freeSpace = rand(100, 200);

	ctx.fillRect(x, freeSpace+firstPipe, 50, 500-firstPipe-freeSpace);

	pipes.push([[x, 0, firstPipe], [x, freeSpace+firstPipe, 500-firstPipe-freeSpace] ]);

}

function reDraw() {

	ctx.fillStyle = '#0a0a0a';
	ctx.fillRect(0, 0, 500, 500);
	ctx.fillStyle = '#6aa64e';

	for(let i = 0; i < pipes.length; i++) {
		ctx.fillRect(pipes[i][0][0], pipes[i][0][1], 50, pipes[i][0][2]);
		ctx.fillRect(pipes[i][1][0], pipes[i][1][1], 50, pipes[i][1][2]);
	}

	ctx.drawImage(vlad, p['x'], p['y']);
}

function move() {
	for(let i = 0; i < pipes.length; i++) {
		pipes[i][0][0] -= 5;
		pipes[i][1][0] -= 5;

		if(pipes[i][0][0] < -50) pipes.shift();
		if(pipes[i][1][0] < -50) pipes.shift();
	}
}

$(document).keyup((e) => {
	let key = e.originalEvent.key;
	let i = 0;
	let jumping;
	if(key == ' ')
		jumping = setInterval(() => {
			p['y'] -= 8;
			i++;
			if(i == 10) {
				clearInterval(jumping);
				i = 0;
			}
		}, 10);
});

$(document).keyup((e) => {
	if(failed) {
		failed = false;
		pipes = [];
		p['x'] = 10;
		p['y'] = 10;
		score = 0;
	}
});

setInterval(() => {
	if(p['x'] + 36 >= pipes[0][0][0] && !(p['y'] - 1 >= pipes[0][0][1] + pipes[0][0][2])) failed = true;
	if(p['x'] + 36 >= pipes[0][1][0] && !(p['y'] + 36 <= pipes[0][1][1])) failed = true;

	if(p['y'] + 35 >= 500) failed = true;
	if(p['y'] <= 0) failed = true;
}, 1);

setInterval(() => {
	if(!failed) {
		move();
		reDraw();
		p['y'] += 5;
	}
}, 30);

setInterval(() => {
	if(!failed) {
		createPipes(500);
	}
}, 2000);

initGame();