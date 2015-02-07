/*
Boss uses the player class as the basis, and adds additional functionality.
*/
var Boss = function() {
  Player.call(this, characters[0], 2);
}

Boss.prototype = Object.create(Player.prototype);
Boss.prototype.constructor = Boss;

/*
When creating a Boss and his steed it is important to verify the directions are set properly so that the collisionBoundaries are placed properly.
*/
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
};

/*
creates 7 collectables and asssigns them to the boss for the final boss fight.
*/
Boss.prototype.armaments = function(){
  for (var i = 0; i < 7; i++) {
    var c = new Collectable(collectables[6]);
    c.speed = 600;
    c.draw = true;
    game.allCollectables.push(c);
    this.pickup(c);
  }
};

/*
places the boss on his cutscene tile and empties his movment array.
*/
Boss.prototype.cutscene = function(tile){
  this.init(tile);
  this.moveAI = [''];
};

/*
populates the bosses move array.
*/
Boss.prototype.bossFight = function(){
  this.moveAI = ['left', 'right', 'up', 'down', 'space'];
};

/*
uses vector analysis to target the player in case, the boss throws a projectile.
*/
Boss.prototype.target = function(player) {
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
};

/*
decrements a random moveinterval when it reaches zero the boss performs a random action and the  moveInterval is randomly set.
*/
Boss.prototype.move = function(dt) {
  this.moveInterval -= dt;
  this.target(game.controlling);
  if (this.moveInterval < 0) {
    this.handleInput(this.moveAI[Math.floor(Math.random() * this.moveAI.length)])
    this.moveInterval = Math.random();
  }
};

/*
If the boss is riding a steed then any call to death will result in the boss falling off.
*/
Boss.prototype.death = function() {
  this.collectables.forEach(function(collectable) {
    collectable.placeRandomly(game.world.currentMap);
  });
  if (this.steed) {
    this.dismount();
  } else {
    this.drop();
    this.noCollisions();
    this.dead = true;
  }
};

/*
boss update makes a call to boss.move to allow for random movemnet.
*/
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

/*
Determines if the boss has picked up a collectable or been hit by a projectile.
*/
Boss.prototype.anyCollisions = function() {
  if (this.active){
    for (var enemy in game.allEnemies) {
      if (!this.steed) {
        if (this.collisionCheck(game.allEnemies[enemy], "primary", this.ride)){
        }
        if (game.allEnemies[enemy].scale >= this.scale && this.collisionCheck(game.allEnemies[enemy], "secondary", this.ride)) {
            game.allEnemies[enemy].collidesWithNothing();
        }
      }
    }
    for (var collectable in game.allCollectables) {
      if (game.allCollectables[collectable].projectile && this.collisionCheck(game.allCollectables[collectable], "primary", this.death)) {
        game.allCollectables[collectable].noCollisions();
      } else {
        this.collisionCheck(game.allCollectables[collectable], "primary", this.pickup);
      }
    }
  }
}