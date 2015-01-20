var Boss = function() {
  Player.call(this, characters[0]);
}

Boss.prototype = Object.create(Player.prototype);
Boss.prototype.constructor = Boss;

/* When creating a Boss and his steed it is important to verify the directions
are set properly so that the collisionBoundaries are placed properly. */
Boss.prototype.init = function(tile) {
  this.tile = tile;
  this.lastDirection = 1;
  this.direction = {
    x: 1,
    y: 0
  };
  this.name = "Boss";
  this.moveAI = ['left', 'right', 'up', 'down', 'space'];
  this.collisionBoundary.primary.collidesWith = []; //this.moveAI = ['space'];
  this.moveInterval = 1;
  this.speed = 800;
  var e = new Enemy();
  e.lastDirection = 1;
  e.direction = {
    x: 1,
    y: 0
  };
  this.ride(e);
  game.allEnemies.push(e);
  this.draw = true;
  e.draw = true;

  for (var i = 0; i < 7; i++) {
    var c = new Collectable(collectables[6]);
    c.speed = 600;
    c.draw = true;
    game.allCollectables.push(c);
    this.pickup(c);
  }
}

GamePiece.prototype.target = function(player) {
  ce('target');

  var vector = {},
    vector1 = this.position;
  vector2 = player.position;
  vectorMagnitude = 0,
    normal = {};

  vector = {
    x: vector2.x - (vector1.x),
    y: vector2.y - (vector1.y)
  };
  vectorMagnitude = Math.sqrt(vector.x * vector.x + vector.y * vector.y);

  this.direction = {
    x: vector.x / vectorMagnitude,
    y: vector.y / vectorMagnitude
  };

  ce(this.direction);

};

Boss.prototype.move = function(dt) {
  this.moveInterval -= dt;
  this.target(game.player);

  if (this.moveInterval < 0) {
    this.handleInput(this.moveAI[Math.floor(Math.random() * 5)])
    this.moveInterval = Math.random();
  }
}

Boss.prototype.death = function() {
  cp('Player death');
  this.collectables.forEach(function(collectable) {
    console.log(collectable);
    collectable.placeRandomly(game.world.currentMap);
  });

  if (this.steed) {
    this.dismount();
    console.log("dismount");

  } else {
    console.log("I died");
    this.drop();
    this.noCollisions();
  }

  console.log('Do the victory thing');

};