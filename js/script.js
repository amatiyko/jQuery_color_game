console.clear();
$('#set_size_btn').click(function(){
    var width = $('#width').val();
    var height = $('#height').val();

    var amount = width*height;

    var fieldWidth = width*62;
    $('#field').width(fieldWidth)

    $('#field').empty();

    for (var j=0; j<amount; j++) {
        $('#field').append("<div class='frame'></div>");
    }

    $('#start_btn').click(function() {

        var pastNumbers = [];
        var startGame = setInterval(function(){


            var number = randomNumber(0, amount-1);

            pastNumbers.push(number);

            $('.frame').eq(number).removeClass('cheaked');
            $('.frame').eq(number).addClass('random');

            var cheaker = 0;
            for (var i=0; i<amount; i++) {
                if ($('.frame').eq(i).hasClass('random')) cheaker++;
            }

            console.log(cheaker);
            if (cheaker == amount) {
                console.log('loser');
                clearInterval(startGame);
            }
        }, 2000);
    });

    $('#field').on('click', '.frame', function(){
        if($(this).hasClass('random')) {
            $(this).removeClass('random');
            $(this).addClass('cheaked');
        }
    });
});

function randomNumber(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1)
    rand = Math.round(rand);
    return rand;
}