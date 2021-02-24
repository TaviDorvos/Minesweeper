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
    //adding the mines
    $('#start').click(function() {
        if (gridInput != "" && minesInput != "") {
            $('#start').remove();
            for (let i = 0; i < gridInput; i++) {
                $('#gameboard').append('<tr></tr>');
            }
            for (let i = 0; i < gridInput; i++) {
                $('#gameboard tr').append('<td></td>');
            }
            //adding the right-click option
            $("td").contextmenu(function() {
                $(this).toggleClass("right-clicked");
            })

            //click on cell
            $("td").click(function() {
                clickOnCell(this);
            })

            addMines();
        } else alert("Please select the grid and the mines number!");
    })

    //creating the mines randomly
    function addMines() {
        for (let i = 0; i < minesInput; i++) {
            var rowBomb = Math.floor(Math.random() * gridInput);
            var colBomb = Math.floor(Math.random() * gridInput);
            console.log(rowBomb, colBomb);

            var $rows = $("#gameboard").find("tr");
            var $columns = $($rows[rowBomb]).find("td");

            $($columns[colBomb]).addClass("mine");
        }
    }

    function clickOnCell( /*parameter*/ ) {
        console.log(this);
        if ($(this).hasClass("mine")) {
            alert("You clicked the mine.\nGame Over!")
            $(".mine").css("background-color", "black");
        }
    }
})(jQuery)