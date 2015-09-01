/***************************************/
/*         intial setup                */
/***************************************/

function init() {
  var down = "mousedown"; 
  var up = "mouseup";
  //Add event listener for button 'New  Game'
  //var newgame = document.getElementsByTagName("newgame");
  //newgame.addEventListener(up, newGame, false);
  //document.querySelector("input.button").addEventListener(up, newGame, false);
  var squares = document.getElementsByTagName("td");
  for (var s = 0; s < squares.length; s++) {
    squares[s].addEventListener(down, function(evt){squareSelected(evt, getCurrentPlayer());}, false);
  }
  
  initGame();
}

function initGame() {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
        	var result = JSON.parse(xmlHttp.responseText);
          createBoard(result._game_board);
          setInitialPlayer(result._current_player);
          history();
        }
   }
  var url = "http://localhost:6543/api/init";
  xmlHttp.open('GET', url, true);
  xmlHttp.send(null);
}

function createBoard(board) {
  //document.getElementById("debug").innerHTML = "Create Board";
  for(var i = 0; i < board.length; i++) {
    if (board[i] == "_") {
      document.getElementById(i).innerHTML = "";
    }else{
      document.getElementById(i).innerHTML = board[i];
    }
  }
}

function setInitialPlayer(currentPlayer) {
  //document.getElementById("debug").innerHTML = currentPlayer;
  var playerX = document.getElementById("X");
  var playerO = document.getElementById("O");
  playerX.className = "";
  playerO.className = "";
 
  if (currentPlayer == 'o') {
    playerO.className = "current-player";
  }
  else {
    playerX.className = "current-player";
  }
}

function newGame() {
  if (confirm("Start a new game?")) {
    initGame();
    //document.getElementById("debug").innerHTML = "Start a new game";
  }
}

/*** call this function whenever a square is clicked or tapped ***/
function squareSelected(evt, currentPlayer) {
  var square = evt.target;
  /* check to see if the square already contains an X or O marker */
  if (square.className.match(/marker/)) {
    alert("Sorry, that space is taken!  Please choose another square.");
    return;
  }
  /* if not already marked, mark the square, update the array that tracks our board, check for a winner, and switch players */
  else {
    //Call API service to update game state
    fillSquareWithMarker(square, currentPlayer);
    updateBoard(square.id);
  }
}

function getCurrentPlayer() {
  id = document.querySelector(".current-player").id; //X or O
  alert(id)
  return id;
}

/*** create an X or O div and append it to the square ***/
function fillSquareWithMarker(square, player) {
  var marker = document.createElement('div');
  marker.className = player + "-marker";
  square.appendChild(marker);
}

/*** update our array which tracks the state of the board, and write the current state to local storage ***/
function updateBoard(index) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
          var result = JSON.parse(xmlHttp.responseText);
          //judge winner
          check_winner(result._winner);
          //switch player
          switch_player(result._current_player)
        }
   }
  var url = "http://localhost:6543/api/update?index="+index;
  xmlHttp.open('GET', url, true);
  xmlHttp.send(null);
}

function check_winner(winner){
  if (winner) {
    alert("We have a winner.");
    initGame();
    history();
    return;
  }
}

function switch_player(next_player){
  var playerX = document.getElementById("X");
  var playerO = document.getElementById("O");
  if (playerX.className.match(/current-player/) ) {
    playerO.className = "current-player";
    playerX.className = "";
  }
  else {
    playerX.className = "current-player";
    playerO.className = "";
  }
}

function remove_Event_Listener(){
  var squares = document.getElementsByTagName("td");
  for (var s = 0; s < squares.length; s++) {
    //alert(eventsId[s]);
    squares[s].removeEventListener(eventsId[s]);
  } 
}

function history(){
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange = function() { 
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
      var history = JSON.parse(xmlHttp.responseText);
      length = history._history.length;
      for(var i=0; i<length; i++) {
        insertTable('h'+i, history._history[i]._game_board, history._history[i]._end_time)
      }
    }
   }
  var url = "http://localhost:6543/api/history";
  xmlHttp.open('GET', url, true);
  xmlHttp.send(null);
}

function insertTable(cell, board, time)
{
  var date = new Date(time)
  var theader = "<div class='div-table'><div class='div-table-caption'> Ended at:"+ time +"</div>";
  var tbody = "";
  for(var i = 0; i < 3; i++)
  {
    tbody += "<div class='div-table-row'>";
    for(var j = 0; j < 3; j++)
    {
      tbody += "<div class='div-table-col'>";
      tbody += board[3*i+j];
      tbody += "</div>"
    }
    tbody += "</div>";
  }
  var tfooter = "</div>";
  document.getElementById(cell).innerHTML = theader + tbody + tfooter;
}