$(document).on('scroll', function(e) {
    if ($(document).scrollTop() > 30)
        $('nav').addClass('down');
    else $('nav').removeClass('down');
});

backgrounds = ['a.jpg', 'b.jpg', 'c.jpg', 'd.jpg', 'e.jpg', 'f.jpg']
var re = /\/([^\/]*)\)$/;

function nextForeground() {
    var current = backgrounds.indexOf($('.slider-fore').css('background-image').match(re)[1]);
    var next;
    if (current == backgrounds.length - 1) next = 0;
    else next = current + 1;
    return next;
}

function nextBackground() {
    var current = backgrounds.indexOf($('.slider-back').css('background-image').match(re)[1]);
    var next;
    if (current == backgrounds.length - 1) next = 0;
    else next = current + 1;
    return next;
}

function slider() {
    //$('.slider-back').css('left','100%');
    $('.slider-fore').animate({
        'left': '-100%'
    }, 750, function() {
        $('.slider-fore').css({
            'left': '0',
            'background-image': 'url(images/' + backgrounds[nextForeground()] + ')'
        });
        $('.slider-back').css({
            'background-image': 'url(images/' + backgrounds[nextBackground()] + ')'
        });
    });
    $('.slider-back').animate({
        'left': '0'
    }, 750, function() {
      $('.slider-back').css({
          'ileft': '100%',
      });
    });
    setTimeout(function() {
        slider();
    }, 5000);
}
setTimeout(function() {
    slider();
}, 1000);
