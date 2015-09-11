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

function init() {
　//set initial player to X
  $("#current_player").text("X");
  createBoard();
}

/* Control game flow*/
function createBoard() {
  //document.getElementById("debug").innerHTML = "Create Board";
   $("#board td").each(function(){
     $(this).text("");
   });
}

function squareSelected(evt, current_player) {
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
    switch_player(current_player);
    return;
  }
}

function fillSquareWithMarker(square, player) {
  var marker = document.createElement('div');
  marker.className = player + "-marker";
  square.appendChild(marker);
}

function getCurrentPlayer() {
  current_player = $("#current_player").text();
  return current_player;
}

function switch_player(current_player){
  if (current_player == "X" ) {
    $("#current_player").text("O");
  }
  else {
    $("#current_player").text("X");
  }
}