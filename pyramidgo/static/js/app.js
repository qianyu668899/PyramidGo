var how_to_play = "Introduction, ................................................................................................................................."

/* ADD LISTENERS FOR ALL EVENTS*/
$("#how_to_play").click(function(){
    if($(this).text().trim() == 'How to Play' ){
        $(this).text("Hide message");
        $("#how_to_play_content").text(how_to_play);
    }else{
        $(this).text("How to Play");
        $("#how_to_play_content").text("");
    }
})

$("#new_game").click(function(){
    init();
})

$("#warning_alert").hide();

$("#board td").on(
   'mousedown', function(evt) {
     return squareSelected(evt, getCurrentPlayer());
   }
);

/* Control Game flow*/
function init() {
  //Call API service to init game and get board
  $.ajax({
    url: "http://0.0.0.0:6543/api/init",
    dataType: 'json',
    success: function(results){　
        console.log("Init...");
    　  createBoard(results._game_board);
    　　$("#current_player").text(results._current_player);
    }
  });
}

function createBoard(board) {
   var id = 0;
   $("#board td").each(function(){
     if (board[id] == "_") {
       $(this).text("");
     }else{
       alert(board[id]);
       $(this).text(board[id]);
     }
     id = id + 1;
   });
}

function squareSelected(evt, current_player) {
  console.log( "You clicked");
  $("#warning_alert").hide();
  var square = evt.target;
  /* check to see if the square already contains an X or O marker */
  if (square.className.match(/marker/)) {
    $("#warning_alert").show();
    $("#warning").text("Sorry,that space is taken!");
    //alert("Sorry, that space is taken!  Please choose another square.");
    return;
  }
  else {
    fillSquareWithMarker(square, current_player);
    updateBoard(square.id);
    return;
  }
}

function fillSquareWithMarker(square, player) {
  var marker = document.createElement('div');
  marker.className = player + "-marker";
  square.appendChild(marker);
}

function updateBoard(index) {
  $.ajax({
    url: "http://0.0.0.0:6543/api/update?index="+index,
    dataType: 'json',
    success: function(results){　
        check_winner(results._winner);
        switch_to_player(results._current_player);
    }
  });
}

function check_winner(winner){
  if (winner) {
    console.log("We have a winner.");
    init();
    $("#warning").text("We have a winner!");
    //history();
    return;
  }
}

/* Get current player from game board*/
function getCurrentPlayer() {
  return $("#current_player").text();
}

function switch_to_player(current_player){
  $("#current_player").text(current_player);
}