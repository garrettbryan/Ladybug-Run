var Player = function(character) {
  this.active = false;
  this.scale = 1;

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

Player.prototype.init = function(tile) {
  cp("Player " + this.elementName + " initialize");
  this.speed = 700;
  this.tile = tile;
  if (!this.steed) {
    var e = new Enemy();
    this.ride(e);
    game.allEnemies.push(e);
    e.draw = true;
  }
  this.draw = true;
}

Player.prototype.update = function(dt) {
  //cp('Player update');
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
};

Player.prototype.walkToTile = function() {
  cp('Player walkToTile');
  var result = 0;
  if (this.tile.x >= 0 && this.tile.x < game.world.currentMap.totalTiles.x &&
    this.tile.y >= 0 && this.tile.y < game.world.currentMap.totalTiles.y) {
    cp(game.world.currentMap.walkMap);
    if (this.steed && this.steed.scale >= 2) {
      result = 1;
    } else {
      result = game.world.currentMap.walkMap[this.tile.y * game.world.currentMap.totalTiles.x + this.tile.x];
    }
  }
  return result;
}

/*
HandleInput changes input meaning based on status of player. If the player.active is true then the player can move the character on the game board. If player.active is false then the player may choose an option from a menu. specific key up events and updates player properties. If an inaccesable tile is sttempted than the player does not move.
*/
Player.prototype.handleInput = function(key) {
  cp('Player handleInput');
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
      console.log('previous Option');
        break;
      case 'right':
      console.log('next Option');
        break;
      case 'up':
      console.log('previous Option');
        break;
      case 'down':
      console.log('next Option');
        break;
      case 'space':
      console.log('select');
        break;
      case 'dismount':
        break;
    }
  }
};

Player.prototype.tag = function(p) {
  cp('Player tag');
  p.tile = {
    x: this.tile.x + 1 * this.direction.x,
    y: this.tile.y + 1 * this.direction.y
  }

  if (p.tile.x < 0 || p.tile.x > world.tileSize.x) {
    p.tile.x = this.tile.x;
    p.tile.y = this.tile.y + 1;
  }
  if (p.tile.y < 0 || p.tile.y > world.tileSize.y) {
    p.tile.y = this.tile.y;
    p.tile.x = this.tile.x + 1;
  }

  p.direction = this.direction;

  for (var i = 1; i < game.allPlayers.length; i++) {
    if (game.allPlayers[i] === p) {

      game.allPlayers.splice(i, 1, game.allPlayers[0]);
      game.allPlayers[0] = p;
    }
  }
};

Player.prototype.death = function() {
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

  game.startLevel(true);
};


Player.prototype.ride = function(steed) {
  cp('Player ' + this.elementName + ' ride');
  console.log('ride');

  if (steed.rider) {
    steed.rider.dismount();
  }

  steed.rider = this;
  this.steed = steed;

  steed.speed = 0;
  steed.direction = this.direction;
}

/*
The Dismount method populates the collidesWith array, and transfers player properties to the bug, then removes any connection to the bug returning it to it's default enemy state.
*/
Player.prototype.dismount = function() {
  cp('Player dismount');


  this.steed.collisionBoundary.primary.collidesWith = [
    Player,
    Transporter,
    Collectable
  ];
  this.steed.collisionBoundary.secondary.collidesWith = [
    Player
  ];

  this.steed.speed = 3;
  this.steed.direction = {
    x: this.direction.x || 1,
    y: 0
  };
  this.steed.tile.y = this.tile.y;
  this.steed.calculatePosition();
  this.steed.rider = '';
  this.steed = '';


  console.log(this.tile);
  for (var i = this.tile.x - 1; i < this.tile.x + 2; i++) {
    console.log(i);
    for (var j = this.tile.y - 1; j < this.tile.y + 2; j++) {
      console.log(j);
      if (i >= 0 && i < game.world.currentMap.totalTiles.x && j >= 0 && j < game.world.currentMap.totalTiles.y && !(j === this.tile.y)) {
        console.log(game.world.currentMap.walkMap[j * game.world.currentMap.totalTiles.x + i]);
        if (game.world.currentMap.walkMap[j * game.world.currentMap.totalTiles.x + i] === 1) {
          this.tile = {
            x: i,
            y: j
          };
          console.log(this.tile);
          i = game.world.currentMap.totalTiles.x;
          j = game.world.currentMap.totalTiles.y;
        }
      } else if (i === this.tile.x && j === this.tile.y + 1) {
        console.log("no walkable tile");
        this.death();
      }
    }
  }
}

/*
TODO: verify wait function works, if not fix it
*/
Player.prototype.wait = function() {
  cp('Player wait');

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
  cp('Player ' + this.elementName + ' pickup');
  collectable.projectile = false;
  collectable.collisionBoundary.primary.collidesWith = [];
  collectable.carriedBy = this;
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
  cp('Player catchIt');
  for (var collectable in game.allCollectables) {
    this.collisionCheck(game.allCollectables[collectable], "primary", this.pickup);
  }
};

/*
When a collectable is thrown the collectable is removed from the players collectables array and held in a temporary "projectile" variable. The collidesWith array populated with the correct game entities. The projectile offset is returned to zero. The projectile direction, speed, and position is set with appropriate values. Then the projectile's carriedBy property is set to the empty string severing any relationship. The position of the projectile is then updated in the collectable update method.
*/
Player.prototype.throw = function() {
  cp('Player ' + this.elementName + ' throw ' + this.direction.x + " " + this.direction.y);
  if (this.collectables.length > 0) {
    var projectile = this.collectables.pop();
    projectile.projectile = true;
    projectile.collisionBoundary.primary.collidesWith = [
      Player,
      Enemy,
      Transporter
    ];
    projectile.direction = this.direction;
    projectile.speed = this.speed;
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
  //console.log("player collision checks");
  for (var enemy in game.allEnemies) {
    if (!this.steed) {
      this.collisionCheck(game.allEnemies[enemy], "primary", this.death);
      if (game.allEnemies[enemy].scale >= this.scale) {
        this.collisionCheck(game.allEnemies[enemy], "secondary", this.ride);
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

  for (var i = 1; i < game.allPlayers.length; i++) {
    this.collisionCheck(game.allPlayers[i], "primary", this.tag)
  }
}