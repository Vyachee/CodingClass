let turn = 'x';
let dev = false;

let score = {
    'o': 0,
    'x': 0
};

let field = [
    [1, 1, 1],
    [1, 1, 1],
    [1, 1, 1]
];

let isStopped = false;

function initGame() {
    isStopped = false;
    field = [
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1]
    ];

    $('.cell').removeClass('activated x o').addClass('none');

    $('#p1').text(score['o']);
    $('#p2').text(score['x']);
    $('.restart').fadeOut();
}

function addScore(to) {
    score[to]++;
}

function changeTurn() {
    if(turn == 'x') {
        turn = 'o';
        $('#turn').text('Нолик');
    }
    else {
        turn = 'x';
        $('#turn').text('Крестик');
    }
}

function changeCell(cellNumber, value) {
    if(cellNumber >= 1 && cellNumber <= 3) field[0][cellNumber-1] = value;
    if(cellNumber >= 4 && cellNumber <= 6) field[1][cellNumber-4] = value;
    if(cellNumber >= 7 && cellNumber <= 9) field[2][cellNumber-7] = value;
}

function getCell(cellNumber) {
    if(cellNumber >= 1 && cellNumber <= 3) return field[0][cellNumber-1];
    if(cellNumber >= 4 && cellNumber <= 6) return field[1][cellNumber-4];
    if(cellNumber >= 7 && cellNumber <= 9) return field[2][cellNumber-7];
}

function isAnyoneWon() {
    // Horizontal
    if(getCell(1) == getCell(2) && getCell(2) == getCell(3)) return getCell(1);
    if(getCell(4) == getCell(5) && getCell(5) == getCell(6)) return getCell(5);
    if(getCell(7) == getCell(8) && getCell(8) == getCell(9)) return getCell(8);

    // Vertical
    if(getCell(1) == getCell(4) && getCell(4) == getCell(7)) return getCell(7);
    if(getCell(2) == getCell(5) && getCell(5) == getCell(8)) return getCell(5);
    if(getCell(3) == getCell(6) && getCell(6) == getCell(9)) return getCell(9);

    // Diagonal

    if(getCell(3) == getCell(5) && getCell(5) == getCell(7)) return getCell(7);
    if(getCell(1) == getCell(5) && getCell(5) == getCell(9)) return getCell(9);

    // Else

    return 'no';
}

function isAllFilled() {
    let row1 = field[0].indexOf(1);
    let row2 = field[1].indexOf(1);
    let row3 = field[2].indexOf(1);
    if(row1 == row2 && row2 == row3 && row1 == -1) return true;
    else return false;
}

function logField() {
    let s = "";
    for(let i = 0; i < 3; i++) {
        for(let u = 0; u < 3; u++) {
            s += field[i][u];
        }
        s += "\n";
    }
    console.log(s);
}

$('.cell').click(function(e) {
    if(!isStopped) {
        let numOfElem = $(e.currentTarget).attr('cell-num');

        if(getCell(numOfElem) == 1) {
            $(this).removeClass('none').addClass('activated');
            if(turn == 'x') {
                changeCell(numOfElem, 'x');
                $(this).addClass('x');
            }
            else {
                changeCell(numOfElem, 'o');
                $(this).addClass('o');
            }
            changeTurn();
            
            let isWin = isAnyoneWon();
            if(dev) {
                logField();
                console.log(isWin);
                console.log("filled: " + isAllFilled());
            }
    
            if(isWin != 1) {
    
    
                if(isWin == 'x') {
                    addScore('x');
                    $('#won').text('Крестик победил');
                
                    isStopped = true;
                    $('.restart').css({
                        'display':'flex'
                    });
                }

                if(isWin == 'o') {
                    addScore('o');
                    $('#won').text('Нолик победил');
                
                    isStopped = true;
                    $('.restart').css({
                        'display':'flex'
                    });
                }

                if(!isStopped && isAllFilled()) {
                    $('#won').text('Ничья');
                
                    isStopped = true;
                    $('.restart').css({
                        'display':'flex'
                    });
                }
            }
        }        
    }
});

$('.restart').click(() => initGame());