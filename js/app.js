// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

/*

var world = new World();

var allCollectables = [];
for (var i = 0; i < 7; i++){
    allCollectables.push(new Collectable( Math.floor(Math.random()*10), Math.floor(Math.random()*5+2), 500, 0.3, i));

}

var allEnemies = [];

//for (var i = 1; i < 6; i++){
//    allEnemies.push(function(){
//        return new Enemy( -1, i+1, 3, 0.5*i, 1);
//    }());

//}
allEnemies.push(new Enemy(-1, 4, 3, 1, 1));

var allPlayers = [];
for (var i = 0, p = 1; i < 2; i++){
    for (var j = 0; j < 2; j++, p++){
            allPlayers.push(function(){
                return new Player( 4+i, 7+j, 300, 0.6+0.2* i, p);
        }());
    }

}

allPlayers.push(new Boss( 4,4,500, 0.75));


var transporters = [];
//for (var i = 0; i < 2; i++){
//    transporters.push(function(){
//        return new Transporter( Math.floor(Math.random()*4+5*i), Math.f//loor(Math.random()*5+2));//
//    }());
//}


var mess = "";
//var mess = createBugMessage("UDACITY ROCKS ! LADY BUG RUN !");

*/var titleMenu = [
  {
    tag: 'h1',
    active: false,
    content: 'Ladybug Run',
    gameVariable: '',
    position: {
//      x:  game.world.canvasSize.x * 0.025,
//      y:  game.world.canvasSize.y * 0.3
    }
  },
  {
    tag: 'h2',
    active: false,
    content: 'An Epic Five Levels',
    gameVariable: '',
    position: {
//      x: game.world.canvasSize.x * 0.025,
//      y:  game.world.canvasSize.y * 0.8
    }
  },
  {
    tag: 'h3',
    active: true,
    content: 'Press the Spacebar to Play',
    gameVariable: '',
    position: {
//    x:  game.world.canvasSize.x * 0.025,
//    y:  game.world.canvasSize.y * 0.9
    }
  }
]

var collectables = [{
  elementName: 'Blue Gem',
  sprite: 'images/Gem Blue.png',
  points: 40,
}, {
  elementName: 'Green Gem',
  sprite: 'images/Gem Green.png',
  points: 60,
}, {
  elementName: 'Orange Gem',
  sprite: 'images/Gem Orange.png',
  points: 100,
}, {
  elementName: 'Heart',
  sprite: 'images/Heart.png',
  points: 75,
}, {
  elementName: 'Key',
  sprite: 'images/Key.png',
  points: 200,

}, {
  elementName: 'Star',
  sprite: 'images/Star.png',
  points: 500,
}, {
  elementName: 'Rock',
  sprite: 'images/Rock.png',
  points: -100,
}, ];

var characters = [{
  elementName: 'Bug Boy',
  sprite: 'images/char-boy.png',
}, {
  elementName: 'Cat Girl',
  sprite: 'images/char-cat-girl.png',
}, {
  elementName: 'Goth Girl with Issues',
  sprite: 'images/char-horn-girl.png',
}, {
  elementName: 'Pinky',
  sprite: 'images/char-pink-girl.png',
}, {
  elementName: 'Princess Lily',
  sprite: 'images/char-princess-girl.png',
}];

cl('app.js');
var game = new Game();
game.init(1, 0);
game.startLevel(false);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',
    32: 'space',
    68: 'dismount'

  };

  game.player.handleInput(allowedKeys[e.keyCode]);
});