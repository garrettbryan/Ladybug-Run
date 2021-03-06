var Player = function(character, scale) {
  this.active = false;
  this.draw = false;
  this.scale = scale;
  this.passed = true;
  this.dead = false;

  GamePiece.call(this);

  this.sprite = character.sprite;
  this.elementName = character.elementName;

  this.center.y = 125 * this.scale;

  this.collectables = [];
  this.collectablesWidth = 0;
  this.collectablesSpacing = 0;

  this.collisionBoundary = {
    'primary': {
      'collidesWith': [
        Player,
        Enemy,
        Collectable,
        Transporter
      ],
      'r': 15 * this.scale,
      'offset': {
        'x': 0,
        'y': 0
      }
    }
  };
};

Player.prototype = Object.create(GamePiece.prototype);
Player.prototype.constructor = Player;

/*
initialize player on level. If player character is not dead then add character to map.
*/
Player.prototype.init = function(tile) {
  var i = 0;
  game.allPlayers.forEach(function(player){
    if (!player.dead){
      player.speed = 700;
      player.tile = {
        x: tile.x + i,
        y: tile.y
      };
      i++;
    }else{
      player.noCollisions();
      i++;
    }
  });
}

/*
update character if active property is true.
*/
Player.prototype.update = function(dt) {
  if (this.active){
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
walkToTile determines if the character can move to the next tile if not return a falsey value.
*/
Player.prototype.walkToTile = function() {

  var result = 0;
  if (this.tile.x >= 0 && this.tile.x < game.world.currentMap.totalTiles.x &&
    this.tile.y >= 0 && this.tile.y < game.world.currentMap.totalTiles.y) {

    if (this.steed && this.steed.scale >= 2) {
      result = 1;
    } else {
      result = game.world.currentMap.walkMap[this.tile.y * game.world.currentMap.totalTiles.x + this.tile.x];
    }
  }
  return result;
}

/*
HandleInput changes input meaning based on status of player. If the player.active is true then the player can move the character on the game board. If player.active is false then the player may choose an option from a menu. specific key up events and updates player properties. If an inaccesable tile is attempted than the player does not move.
*/
Player.prototype.handleInput = function(key) {

  if (this.active){
    var tile0 = {
        x: this.tile.x,
        y: this.tile.y
      },
      direction0 = this.direction;

    switch (key) {
      case 'left':
        this.tile.x = this.tile.x - 1;
        this.direction = {
          x: -1,
          y: 0
        };
        if (this.steed) this.steed.direction = this.direction;
        break;
      case 'right':
        this.tile.x = this.tile.x + 1;
        this.direction = {
          x: 1,
          y: 0
        };
        if (this.steed) this.steed.direction = this.direction;
        break;
      case 'up':
        this.tile.y = this.tile.y - 1;
        this.direction = {
          x: 0,
          y: -1
        };
        break;
      case 'down':
        this.tile.y = this.tile.y + 1;
        this.direction = {
          x: 0,
          y: 1
        };
        break;
      case 'space':

        this.throw();
        break;
      case 'dismount':

        this.dismount();
        break;
    }
    if (this.walkToTile() === 0) {
      this.tile = tile0;
      this.direction = direction0;
    }
  }else{
    switch (key) {
      case 'left':
        break;
      case 'right':
        break;
      case 'up':
        break;
      case 'down':
        break;
      case 'space':
      this.active = true;
      game.nextLevel();
      game.refresh = true;
        break;
      case 'dismount':
        break;
    }
  }
};

/*
this is the method to transfer control to another player character.
*/
Player.prototype.tag = function(p) {
  var tempTile = {
    x: this.tile.x - this.direction.x,
    y: this.tile.y - this.direction.y
  };
  this.tile = p.tile;
  p.tile = tempTile;

  p.direction = {
    x: this.direction.x * -1,
    y: this.direction.y * -1
  };
  game.controlling = p;
}

/*
update a player character when level is passed.
*/
Player.prototype.passedLevel = function() {
  this.passed = true;
  game.passedPlayers++;
  this.noCollisions();
  game.nextAvailablePlayer();
}

/*
If a player character is riding a bug then dismount on a call to the death method, else drop collectables, and increment game.deadPlayers.
*/
Player.prototype.death = function() {
  if (this.steed) {
    this.dismount();
  } else {
    this.noCollisions();
    this.drop();
    this.dead = true;
    game.deadPlayers++;
    console.log("deadPlayers: " + game.deadPlayers);
  }
};

/*
adjusts enemies property to allow the player character to ride an enemy.
*/
Player.prototype.ride = function(steed) {
  if (!steed.rider) {
    steed.rider = this;
    this.steed = steed;
    this.steed.collisionBoundary.primary.collidesWith = [];
    this.steed.collisionBoundary.secondary.collidesWith = [];

    this.steed.speed = 0;
    this.steed.direction = this.direction;
  }
}

/*
The Dismount method populates the collidesWith array, and transfers player properties to the bug, then removes any connection to the bug returning it to it's default enemy state.
*/
Player.prototype.dismount = function() {
  this.steed.collisionBoundary.primary.collidesWith = [
    Player,
    Transporter,
    Collectable
  ];
  this.steed.collisionBoundary.secondary.collidesWith = [
    Player
  ];

  this.steed.speed = 3;

if (this.steed.direction.x >= 0){
  this.steed.direction = {
    x: 1,
    y: 0
  };
}else{
  this.steed.direction = {
    x: -1,
    y: 0
  };
}
  this.steed.tile.y = this.tile.y;
  this.steed.calculatePosition();
  this.steed.rider = '';
  this.steed = '';

  this.nextWalkableTile();
}

/*
nextWalkableTile allows a player to dismount from a ladybug onto a walkable tile.
*/
Player.prototype.nextWalkableTile = function() {
  for (var i = this.tile.x - 1; i < this.tile.x + 2; i++) {
    for (var j = this.tile.y - 1; j < this.tile.y + 2; j++) {
      if (i >= 0 && i < game.world.currentMap.totalTiles.x && j >= 0 && j < game.world.currentMap.totalTiles.y && !(i === this.tile.x && j === this.tile.y)) {
        if (game.world.currentMap.walkMap[j * game.world.currentMap.totalTiles.x + i] === 1) {
          this.tile = {
            x: i,
            y: j
          };
          i = game.world.currentMap.totalTiles.x;
          j = game.world.currentMap.totalTiles.y;
        }
      } else if (i === this.tile.x && j === this.tile.y + 1) {
        this.death();
      }
    }
  }
}

/*
TODO: verify wait function works, if not fix it
*/
Player.prototype.wait = function() {


  this.position.x = this.tile.x * 101 + 101 / 2 - this.center.x;
  this.position.y = this.tile.y * 83 - this.center.y;

  this.collisionBoundary.primary.x = this.position.x + this.collisionBoundary.primary.xOffset;
  this.collisionBoundary.primary.y = this.position.y + this.collisionBoundary.primary.yOffset;

  if (this.steed) {
    this.steed.position.x = -this.steed.center.x + this.tile.x * 101 + 101 / 2;
    this.steed.position.y = -this.steed.center.y + this.tile.y * 83;
    this.steed.collisionBoundary.primary.x = this.steed.position.x + this.steed.collisionBoundary.primary.xOffset;
    this.steed.collisionBoundary.primary.y = this.steed.position.y + this.steed.collisionBoundary.primary.yOffset;
    this.steed.collisionBoundary.secondary.x = this.steed.position.x + this.steed.collisionBoundary.secondary.xOffset;
    this.steed.collisionBoundary.secondary.y = this.steed.position.y + this.steed.collisionBoundary.secondary.yOffset

    this.position.x = this.position.x + 10 * this.steed.scale;
    this.position.y = this.position.y - 0.15 * this.steed.spriteDimensions.y;

  }
};

/*
When a collectable is picked up by a player or boss, the collectable is added to the character's collectables array. The collectables collidesWith array is set to empty, the offset positioning object for the sprite is modified by the pickup and calculateCollectableSpacing methods.  See the collectable update function fo r more.
*/
Player.prototype.pickup = function(collectable) {
  collectable.projectile = false;
  collectable.speed = 0;
  collectable.direction = {
    x: 0,
    y: 0
  };
  collectable.collisionBoundary.primary.collidesWith = [];
  collectable.carriedBy = this;
  game.score += collectable.points;
  this.collectables.push(collectable);
  this.collectablesWidth += collectable.spriteDimensions.x;
  this.calculateCollectableSpacing();
};

Player.prototype.calculateCollectableSpacing = function() {
  this.collectablesSpacing = 0;
  for (var i = 0; i < this.collectables.length; i++) {
    this.collectables[i].offset.x = -this.collectablesWidth / 2 + this.collectables[i].center.x + this.collectablesSpacing;
    this.collectables[i].offset.y = 60 * this.scale + this.offset.y;
    this.collectablesSpacing += this.collectables[i].spriteDimensions.x;
  }
}

/*
When a player character is not currently active (the player is not directly controlling the character) then the engine puts the nonactive characters into a wait state where they can still catch objects.
*/
Player.prototype.catchIt = function(collectable) {

  for (var collectable in game.allCollectables) {
    this.collisionCheck(game.allCollectables[collectable], "primary", this.pickup);
  }
};

/*
When a collectable is thrown the collectable is removed from the players collectables array and held in a temporary "projectile" variable. The collidesWith array populated with the correct game entities. The projectile offset is returned to zero. The projectile direction, speed, and position is set with appropriate values. Then the projectile's carriedBy property is set to the empty string severing any relationship. The position of the projectile is then updated in the collectable update method.
*/
Player.prototype.throw = function() {
  //console.log('Player ' + this.elementName + ' throw ' + this.direction.x + " " + this.direction.y);
  if (this.collectables.length > 0) {
    var projectile = this.collectables.pop();
    projectile.projectile = true;
    game.score -= projectile.points;

    projectile.collisionBoundary.primary.collidesWith = [
      Player,
      Enemy,
      Transporter
    ];
    projectile.direction = this.direction;
    projectile.speed = 700;
    projectile.offset = {
      x: 0,
      y: 0
    };
    this.collectablesWidth -= projectile.spriteDimensions.x;
    projectile.position.x = this.position.x + (this.collisionBoundary.primary.r + projectile.collisionBoundary.primary.r + 5) * projectile.direction.x;
    projectile.position.y = this.position.y + (this.collisionBoundary.primary.r + projectile.collisionBoundary.primary.r + 5) * projectile.direction.y;
    projectile.carriedBy = "";


  }
};

/*
The majority of interactions center around the player characters. The active player collisions happen here.
*/
Player.prototype.anyCollisions = function() {
  if (this.active){
    for (var enemy in game.allEnemies) {
      if (!this.steed) {
        if (this.collisionCheck(game.allEnemies[enemy], "primary", this.death)){
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

    for (var transporter in game.allTransporters){
      this.collisionCheck(game.allTransporters[transporter], "primary", this.transport);
    }

    for (var i = 0; i < game.allPlayers.length; i++) {
      if(this.collisionCheck(game.allPlayers[i], "primary", this.tag)){
        console.log("tagged");
      }
    }
  }
}