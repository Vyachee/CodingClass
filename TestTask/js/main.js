let isToggled = false;

$('.toggle').click(() => {
    if(!isToggled) {
        $('.toggle').text('Не хочу больше видеть это недоразумение');
        $('.toggleContent').slideToggle(300);
        isToggled = true;
    }   else {
        $('.toggle').text('Кликните сюда, чтобы узнать меня подробнее');
        $('.toggleContent').slideToggle(300);
        isToggled = false;
    }
});