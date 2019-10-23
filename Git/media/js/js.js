$('.toOpen').click(() => {
    $('.navContent').slideToggle();
});

let isDark = false;

$('.changeTheme').click(() => {
    if(!isDark) {
        darkTheme();
        isDark = true;
    }   else {
        lightTheme();
        isDark = false;
    }
});

$('.scrollWrap').scroll(function() {
    if($(document).width() > 950) {
        if($(this).scrollTop() > 500) {
            $('aside').css({
                'position':'fixed',
                'top':'0',
                'left':'0'
            });
        }   else {
            $('aside').css({
                'position':'absolute',
                'top':'0',
                'left':'0'
            });
        }
    }   else {
        $('aside').css({
            'position':'relative',
            'top':'0',
            'left':'0'
        });

    }
});


$('a').click(function() {
    let attr = $(this).attr('href');
    if(attr[0] == '#')
        $(" "+ attr +" ").addClass('lightLink');
        setTimeout(() => {
            $(" "+ attr +" ").removeClass('lightLink');
        }, 1500);
});



function darkTheme() {
    let aside = $('.asideInner'),
        body = $('body'),
        article = $('.articleInner');

    aside.css({
        'background-color':'#252a2f'
    });
    article.css({
        'background-color':'#252a2f',
        'color':'lightgray'
    });
    $('.menu p').css({
        'color':'lightgray'
    });
    body.css({
        'background-color':'#545252'
    });
    $('.changeTheme').text('Светлая тема');
}


function lightTheme() {
    let aside = $('.asideInner'),
        body = $('body'),
        article = $('.articleInner');

    aside.css({
        'background-color':'#fff'
    });
    article.css({
        'background-color':'#fff',
        'color':'#000'
    });
    $('.menu p').css({
        'color':'#000'
    });
    body.css({
        'background-color':'#f2f2f2'
    });
    $('.changeTheme').text('Темная тема');
}

SimpleScrollbar.initEl(document.querySelector('.scrollWrap'));