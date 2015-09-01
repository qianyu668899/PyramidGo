from pyramid.view import view_config
from model import Player, History, Game

TEST_TEXT = {'name': "Yu Qian", "age": "24"}

@view_config(route_name='home', renderer='templates/index.pt')
def my_view(request):
    return {}

@view_config(route_name='api.test', renderer='json')
def test_server(request):
    return TEST_TEXT

@view_config(route_name='api.init', renderer='json')
def init_game(request):
    print "init game..."
    player1 = Player("Player 1")
    player2 = Player("Player 2")
    history = History()
    game = Game(player1, player2)
    # Store game and history objects to session
    session = request.session
    session['game'] = game
    session['history'] = history
    # Print game id for DEBUG
    print game.id()
    return game.toJSON()

@view_config(route_name='api.update', renderer='json')
def update_board(request):
    game = request.session['game']
    print 'Update game board...'
    index = int(request.params['index'])
    print game.id() #for DEBUG
    game.update_board(index)
    game.check_winner()
    return game.toJSON()

