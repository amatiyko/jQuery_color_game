$('body').click(function () {
    $('#popup').fadeOut(400);
});
$('#open-settings').click(function () {
    $('#select-width').slideDown(500).fadeIn(1000);
    $('#top-move').slideUp(1000);
});

$('#width').change(function () {
    $('#select-height').slideDown(500).fadeIn(1000);
});

$('#height').change(function () {
    $('#select-set-size').slideDown(500).fadeIn(1000);
});




$('#set_size_btn').click(function(){

    $('#select-start').slideDown(500).fadeIn(1000);

    setTimeout(function () {
        $('#field-container').slideDown(500).fadeIn(1000);
    }, 400);

    setTimeout(function () {
        $('html').animate({
            scrollTop: ($('#start_btn').offset().top)
        },500);
    }, 700);


    var width = $('#width').val();
    var height = $('#height').val();

    var amount = width*height;

    var fieldWidth = width*64;
    $('#field').width(fieldWidth)

    $('#field').empty();

    for (var j=0; j<amount; j++) {
        $('#field').append("<div class='frame'></div>");
    }

    $('#start_btn').click(function() {

        $('html').animate({
            scrollTop: ($('#field').offset().top)
        },500);

        var startGame = setInterval(function(){
            var check = checkFunc(amount);

            if (check === 'w') {
                $('#popup>div').append("<p>You Win!</p>");
                $('#popup').fadeIn(1000, function () {
                    setTimeout(function () {
                        $('#popup').fadeOut(400);
                    }, 2000)
                });
            } else if (check === 'l'){
                $('#popup>div').append("<p>You Lose!</p>");
                $('#popup').fadeIn(1000, function () {
                    setTimeout(function () {
                        $('#popup').fadeOut(400);
                    }, 2000)
                });
                clearInterval(startGame);
            }

            var number = randomNumber(0, amount-1);

            $('.frame').eq(number).removeClass('cheaked');
            $('.frame').eq(number).addClass('random');


            $('#field').on('click', '.frame', function(){
                if($(this).hasClass('random')) {
                    $(this).removeClass('random');
                    $(this).addClass('cheaked');
                }
            });
        }, 200);
    });


});

function randomNumber(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1)
    rand = Math.round(rand);
    return rand;
}

function checkFunc(amount) {
    var сodeWinsConter = 0;
    var userWinsCounter = 0;

    for (var i=0; i<amount; i++) {
        if ($('.frame').eq(i).hasClass('random')) {
            сodeWinsConter++;
        }
        if ($('.frame').eq(i).hasClass('cheaked')) {
            userWinsCounter++;
        }
    }
    if (сodeWinsConter == amount) {
        return 'l';
    }

    if (userWinsCounter == amount) {
        return 'w'
    }
    return '';
}