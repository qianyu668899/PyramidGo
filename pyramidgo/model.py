from datetime import datetime
import uuid
import json

class Player:
    def __init__(self, name):
        self._id = uuid.uuid4() #generate a unique random UUID for each user
        self._name = name

class History:#game history
    _history = []

    def __init__(self):
        self._history = []

    def add(self, game):
        self._history.append(game)

class Game:
    _player1 = None #use 'o' to mark the move of player_one
    _player2 = None #use 'x' to mark the move of player_two
    _winner= None
    _game_board = [] #use a list to store board state,
    _current_player = None #use 'o' 'x' to mark
    _start_time = datetime.now()
    _end_time = None

    def __init__(self, player1, player2):
        self._start_time = datetime.now().isoformat()
        self._id = uuid.uuid4()
        self._game_board = list('_________')
        self._player1 = player1
        self._player2 = player2
        self._current_player = 'o' #Always start from the first player
        self._winner = None

    def id(self):
        return self._id

    def check_winner(self):
        if self._has_winner():
            self._record_winner()
            self._end_time = datetime.now().isoformat()
        else:
            print 'turn player...'
            self._turn_player()

    def update_board(self, index):
        print "_current_player", self._current_player
        self._game_board[index] = self._current_player

    def is_finished(self):
        return self._winner is not None

    def _turn_player(self):
        if self._current_player == 'o':
            self._current_player = 'x'
        elif self._current_player == 'x':
            self._current_player = 'o'
        else:
            self._current_player = '_' # mark an error

    def _record_winner(self):
        if self._current_player == 'o':
            self._winner = self._player1
        elif self._current_player == 'x':
            self._winner = self._player2

    def _has_winner(self):#1 winner 2 
        board = self._game_board
        #check if all cell are filled
        is_filled = True
        for i in range(9):
            if '_' == board[i]:
                is_filled = False
                break

        for i in range(3):
            if '_' != board[3*i] == board[3*i+1] == board[3*i+2]:
                return True
        for i in range(3):
            if '_' != board[i] == board[3+i] == board[6+i]:
                return True

        if '_' != board[0] == board[4] == board[8]: return True

        if '_' != board[2] == board[4] == board[6]: return True

        return False

    def toJSON(self):
        jsonData = json.loads(json.dumps(self, default=lambda o: o.__dict__))
        print jsonData
        return jsonData




