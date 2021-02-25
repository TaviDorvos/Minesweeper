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
                clickOnThisCell(this);
            })

            addMines();
        } else alert("Please select the grid and the mines number!");
    })

    //creating the mines randomly
    function addMines() {
        for (let i = 0; i < minesInput; i++) {
            var rowBomb = Math.floor(Math.random() * gridInput);
            var colBomb = Math.floor(Math.random() * gridInput);

            var $rows = $("#gameboard").find("tr");
            var $columns = $($rows[rowBomb]).find("td");

            $($columns[colBomb]).addClass("mine");
        }
    }

    function clickOnThisCell($this) {
        //lose condition and showing the mines
        if ($($this).hasClass("mine")) {
            alert("You clicked the mine.\nGame Over!")
            $(".mine").css("background-color", "black");
        } else {
            $($this).addClass("safe").css("pointer-events", "none");
            //getting the actual row and column
            var cellRow = $($this).parent().index();
            var cellCol = $($this).index();

            var $rows = $("#gameboard").find("tr");
            var $columns = $($rows[cellRow]).find("td");

            var minesCounter = 0;

            //checking if there is a mine beside the cell I've clicked
            //and incrementing the counter if exists
            for (let i = Math.max(cellRow - 1, 0); i <= Math.min(cellRow + 1, gridInput); i++) {
                for (let j = Math.max(cellCol - 1, 0); j <= Math.min(cellCol + 1, gridInput); j++) {
                    var $rows = $("#gameboard").find("tr");
                    var $columns = $($rows[i]).find("td");
                    if ($($columns[j]).hasClass("mine")) {
                        minesCounter++;
                    }
                }
            }

            //appending to the cell the number of the mines
            $($this).text(minesCounter);

            //recall the function if there I've clicked on a cell
            //that has 0 mines beside
            if (minesCounter == 0) {
                for (let i = Math.max(cellRow - 1, 0); i <= Math.min(cellRow + 1, gridInput); i++) {
                    for (let j = Math.max(cellCol - 1, 0); j <= Math.min(cellCol + 1, gridInput); j++) {
                        var $rows = $("#gameboard").find("tr");
                        var $columns = $($rows[i]).find("td");
                        if ($($columns[j]).text() == "") {
                            clickOnThisCell($columns[j]);
                        }
                    }
                }
            }
            checkWin();
        }
    }

    //verifying if there are now cells undiscovered
    //showing the win message
    function checkWin() {
        var win = true;
        for (let i = 0; i < gridInput; i++) {
            for (let j = 0; j < gridInput; j++) {
                var $rows = $("#gameboard").find("tr");
                var $columns = $($rows[i]).find("td");
                if ($($columns[j]).hasClass("safe") == false && $($columns[j]).hasClass("mine") == false) {
                    win = false;
                    break;
                }
            }
        }
        if (win) {
            alert("Good job! You win!");
            $(".mine").css("background-color", "black");
        }
    }
})(jQuery)