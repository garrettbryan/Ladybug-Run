
var titleMenu = [
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
];

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
game.init(0, 0);
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

  game.allPlayers[0].handleInput(allowedKeys[e.keyCode]);
});