(function($) {

    var gridInput = "";
    var minesInput = "";

    //selecting the grid value
    $("#grid-select button").click(function() {
        $('#grid-select button').not(this).removeClass('selected');
        $(this).toggleClass("selected");
        gridInput = $(this).val();
    })

    //selecting the number of the mines
    $("#mines-select button").click(function() {
        $('#mines-select button').not(this).removeClass('selected');
        $(this).toggleClass("selected");
        minesInput = $(this).val();
    })

    //creating the restart button
    $('#restart').click(function() {
        location.reload();
    })

    //starting the game
    //removing the 'start' button
    //creating the gameboard
    $('#start').click(function() {
        if (gridInput != "" && minesInput != "") {
            $('#start').remove();
            for (let i = 0; i < gridInput; i++) {
                $('#gameboard').append('<tr></tr>');
            }
            for (let i = 0; i < gridInput; i++) {
                $('#gameboard tr').append('<td></td>');
            }
        } else alert("Please select the grid and the mines number!");
    })
})(jQuery)