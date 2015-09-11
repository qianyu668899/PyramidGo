var how_to_play = "Introduction, ................................................................................................................................."

$("#how_to_play").click(function(){
    if($(this).text().trim() == 'How to Play' ){
        $(this).text("Hide message");
        $("#how_to_play_content").text(how_to_play);
    }else{
        $(this).text("How to Play");
        $("#how_to_play_content").text("");
    }
})

function init() {
  $("table.d td").on(
       'mouseenter', function(evt) {
           squareSelected(evt);
       }
  );
  //initGame();
}

function squareSelected(evt) {
  var square = evt.target;
  /* check to see if the square already contains an X or O marker */
  if (square.className.match(/marker/)) {
    alert("Sorry, that space is taken!  Please choose another square.");
    return;
  }
  else {
    alert("selected one");
    return;
  }
}