var Boss = function() {
  Player.call(this, characters[0], 2);
}

Boss.prototype = Object.create(Player.prototype);
Boss.prototype.constructor = Boss;

/* When creating a Boss and his steed it is important to verify the directions
are set properly so that the collisionBoundaries are placed properly. */
Boss.prototype.init = function(tile) {
  this.tile = tile;
  this.direction = {
    x: -1,
    y: 0
  };
  this.scale = 2;
  this.name = "Boss";
  this.moveAI = ['left', 'right', 'up', 'down', 'space'];
  this.collisionBoundary.primary.collidesWith = []; //this.moveAI = ['space'];
  this.moveInterval = 1;
  this.speed = 800;
  var e = new Enemy(3);
  //console.log(e)
  this.ride(e);
  this.steed.direction = {
    x: -1,
    y: 0
  };
  this.draw = true;
  this.steed.draw = true;
  this.steed.active = true;
  game.allEnemies[game.numberOfEnemies] = e;
}

Boss.prototype.armaments = function(){
  for (var i = 0; i < 7; i++) {
    var c = new Collectable(collectables[6]);
    c.speed = 600;
    c.draw = true;
    game.allCollectables.push(c);
    this.pickup(c);
  }
}

Boss.prototype.cutscene = function(tile){
  this.init(tile);
  this.moveAI = [''];
}

Boss.prototype.bossFight = function(){
  this.moveAI = ['left', 'right', 'up', 'down', 'space'];
}

Boss.prototype.target = function(player) {
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
//  //console.log("boss move");
  this.moveInterval -= dt;
  this.target(game.controlling);

  if (this.moveInterval < 0) {
    this.handleInput(this.moveAI[Math.floor(Math.random() * this.moveAI.length)])
    this.moveInterval = Math.random();
  }
}

Boss.prototype.death = function() {
  cp('Player death');
  this.collectables.forEach(function(collectable) {
    //console.log(collectable);
    collectable.placeRandomly(game.world.currentMap);
  });

  if (this.steed) {
    this.dismount();
    //console.log("dismount");

  } else {
    //console.log("Boss died");
    this.drop();
    this.noCollisions();
    this.dead = true;
  }
};

Boss.prototype.update = function(dt) {
  if (this.active){
    this.move(dt);
    if (this.steed) {
      this.offset = {
        x: 0,
        y: 40 * this.steed.scale
      };
      this.steed.offset = {
        x: -15 * this.steed.scale * this.steed.direction.x,
        y: 0
      };
    } else {
      this.offset = {
        x: 0,
        y: 0
      };
    }
    this.calculatePosition();
    this.anyCollisions();
    this.calculateCollectableSpacing();
  }
};

