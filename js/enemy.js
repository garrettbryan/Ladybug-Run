var Enemy = function(scale) {
  this.speed = 3;
  this.scale = scale || 2;
  GamePiece.call(this);

  this.pathNodes = [];
  this.currentNodeIndex = 0;
  this.currentNode = {
    x: 0,
    y: 0
  };
  this.targetNode = {
    x: 0,
    y: 0
  };
  this.directions = [];
  this.direction = {
    'x': 1,
    'y': 0
  };

  this.tile = {
    x: 4,
    y: 4
  };

  this.center.y = 125 * this.scale;

  this.spriteDimensions = {
    x: 101 * this.scale,
    y: 171 * this.scale
  };

  this.name = 'Lady Bug';
  this.elementName = "bug";

  this.sprite = 'images/enemy-bug_sprite_sheet.png';
  this.spriteFore = 'images/enemy-bug-front_sprite_sheet.png';
  this.sx = 0;
  this.sy = 0;
  this.sWidth = 101;
  this.sHeight = 171;

  this.collisionBoundary = {
    primary: {
      'collidesWith': [
        Player,
        Enemy      ],
      'r': 20 * this.scale,
      'offset': {
        'x': 25 * this.scale,
        'y': 0
      }
    },
    secondary: {
      'collidesWith': [
        Player,
        Transporter,
      ],
      'r': 20 * this.scale,
      'offset': {
        'x': -25 * this.scale,
        'y': 0
      }
    },
    navigatory: {
      'collidesWith': [],
      r: 2 * this.scale,
      'offset': {
        'x': 0,
        'y': 0
      }
    }
  };

  this.navData = {
    'currentNodeIndex': 0,
    'currentNode': {},
    'targetNode': {},
    'targetPoint': {},
    'navNodes': [],
    'navPoints': [],
    'directions': [],
    'r': 1,
    'offset': {
      'x': 0,
      'y': 0
    }
  };
};

Enemy.prototype = Object.create(GamePiece.prototype);
Enemy.prototype.constructor = Enemy;

/*
initMessageBug creates a bug from the passed in bugValues.
*/
Enemy.prototype.initMessageBug = function(bugValues){
  this.draw = true;
  this.tile.x = bugValues[0];
  this.tile.y = bugValues[1];
  this.calculatePosition();
  this.direction = {
    x: -1,
    y: 0
  };
  this.speed = 10;
  this.scale = 1;
}

/*
init has not been fully implemented it uses a simple navigation system that uses navPooints asscociated with each map.
*/
Enemy.prototype.init = function() {
  this.assignPath(game.world.currentMap.enemyPaths);
};

/*
  simpleInit randomly places an enemy on the map to travel from the right to left side of the screen.
*/
Enemy.prototype.simpleInit = function(){
  this.tile = {
    x: Math.floor(Math.random() * game.world.currentMap.totalTiles.x),
    y: Math.floor(Math.random() * game.world.currentMap.totalTiles.y)
  };
  this.direction = {
    x: -1,
    y: 0
  };
  this.speed = (Math.random() * 3 + 2) * 1 / this.scale;
  if (this.tile.y === game.world.currentMap.playerStartTile.y){
    this.simpleInit();
  }
  this.calculatePosition();
  ////console.log(this.tile);
  this.draw = true;
  this.active = true;
  this.collisionBoundary.primary.collidesWith = [
    Player
  ];
  this.collisionBoundary.secondary.collidesWith = [
    Player
  ];
}

/*
assignPath is used by the incomplete navigation system. not currently used in game.
*/
Enemy.prototype.assignPath = function(enemyPaths) {
  var vector = {},
    vectorMagnitude,
    normal = {};
  this.navData.directions = [];
  this.navData.navNodes = enemyPaths[Math.floor(Math.random() * enemyPaths.length)];
  this.navData.currentNodeIndex = 0;
  this.navData.currentNode = this.navData.navNodes[0];
  this.navData.targetNode = this.navData.navNodes[1];
  for (var i = 1; i < this.navData.navNodes.length; i++) {
    vector = {
      x: this.navData.navNodes[i].x - this.navData.navNodes[i - 1].x,
      y: this.navData.navNodes[i].y - this.navData.navNodes[i - 1].y
    };
    vectorMagnitude = Math.sqrt(vector.x * vector.x + vector.y * vector.y)

    this.navData.directions.push({
      x: vector.x / vectorMagnitude,
      y: vector.y / vectorMagnitude
    });
  };
  this.direction = this.navData.directions[0];
  this.tile = this.navData.currentNode;
  this.calculatePosition();
  this.navData.navPoints = this.calculateNavPoints(this.navData.navNodes);
  this.navData.targetPoint = this.navData.navPoints[1];
};

/*
cutscene update cis used on enemies in the cutscene marquee.
*/
Enemy.prototype.cutsceneUpdate = function(dt) {
  if (this.rider) {
    this.tile = this.rider.tile;
    this.calculatePosition();
  } else {
    this.move(dt);
  }
  this.reflectCollisionBoundaries();
  this.chooseSpriteDirection();
};

/*
update is used during gameplay to check for collisions with projectiles.
*/
Enemy.prototype.update = function(dt) {
  if (this.active){
    if (this.rider) {
      this.tile = this.rider.tile;
      this.calculatePosition();
    } else {
      this.move(dt);
    }
    this.reflectCollisionBoundaries();
    this.chooseSpriteDirection();
    if (this.tile.x < -1 || this.tile.x > game.world.currentMap.totalTiles.x + 1){
      this.tile.x = game.world.currentMap.totalTiles.x + 1;
      this.direction = {
        x: -1,
        y: 0
      };
      do {
        this.tile.y = Math.floor(Math.random() * game.world.currentMap.totalTiles.y);
      } while (this.tile.y === game.world.currentMap.playerStartTile.y);
      this.speed = (Math.random() * 3 + 2) * 1 / this.scale;
    }
  }
  for (var collectable in game.allCollectables) {
    if (!this.rider && game.allCollectables[collectable].projectile && this.collisionCheck(game.allCollectables[collectable], "primary", this.death)) {
      game.allCollectables[collectable].noCollisions();
      game.allCollectables[collectable].init();
    }
  }
};

/*
calculateNavPoints is used by the incomplete navigation system. It converts navNodes in tiles to a screen position.
*/
Enemy.prototype.calculateNavPoints = function(navNodes) {
  var i = 0,
    navPoints = [];
  while (i < navNodes.length) {
    navPoints[i] = this.calculateWorldPosition(navNodes[i]);
    i++;
  }
  return navPoints;
}

/*
navigate determines the procimity to the next nav node and if distance is smaller than a certain threshold runs the result function passsed to it.
*/
GamePiece.prototype.navigate = function(navData, result) {

  var distanceToNextNavPoint =
    (navData.targetPoint.x - this.collisionBoundary.navigatory.x) *
    (navData.targetPoint.x - this.collisionBoundary.navigatory.x) +
    (navData.targetPoint.y - this.collisionBoundary.navigatory.y) *
    (navData.targetPoint.y - this.collisionBoundary.navigatory.y);
  var radiiSum = (navData.r + this.collisionBoundary.navigatory.r) *
    (navData.r + this.collisionBoundary.navigatory.r);
  if (distanceToNextNavPoint < radiiSum) {
    result.call(this);
  }
}

/*
used in the incomplete navigation system. It updates the current target nav point
*/
Enemy.prototype.reachedTarget = function() {
  if (this.navData.currentNodeIndex < this.navData.directions.length) {
    this.navData.currentNodeIndex++;
    this.navData.currentNode = this.navData.targetNode;
    this.navData.targetNode = this.navData.navNodes[this.navData.currentNodeIndex];
    this.navData.targetPoint = this.navData.navPoints[this.navData.currentNodeIndex];
    this.direction = this.navData.directions[this.navData.currentNodeIndex - 1];
  } else {
    this.navData.currentNodeIndex = 0;
    this.navData.currentNode = this.navData.navNodes[0];
    this.navData.targetNode = this.navData.navNodes[1];
    this.navData.targetPoint = this.navData.navPoints[1];
    this.direction = this.navData.directions[0];
    this.tile = this.navData.navNodes[0];
  }
}

/*
death inactivates the enemy with nocollisions.
*/
Enemy.prototype.death = function() {
  this.noCollisions();
};

/*
draws a black circle around the nav point for debugging.
*/
Enemy.prototype.renderNavPoints = function() {
  for (navPoint in this.navData.navNodes) {
    ctx.beginPath();
    ctx.arc(this.navData.navPoints[navPoint].x, this.navData.navPoints[navPoint].y, this.navData.r, 0, 2 * Math.PI, false);
    ctx.stroke();
  }
}

/*
When an enemy changes x direction, the sprite changes to show the current x direction, the collision boundaries reflect about the y axis.
*/
Enemy.prototype.reflectCollisionBoundaries = function() {
  if (this.direction.x >= 0) {
    this.collisionBoundary.primary.offset.x = Math.abs(this.collisionBoundary.primary.offset.x);
    this.collisionBoundary.secondary.offset.x = -Math.abs(this.collisionBoundary.secondary.offset.x);
  } else {
    this.collisionBoundary.primary.offset.x = -Math.abs(this.collisionBoundary.primary.offset.x);
    this.collisionBoundary.secondary.offset.x = Math.abs(this.collisionBoundary.secondary.offset.x);
  }
}

/*
Determines the sprite ditection of the enemy.
*/
Enemy.prototype.chooseSpriteDirection = function() {
  if (this.direction.x >= 0) {
    this.sx = 0;
    this.sy = 0;
    this.sWidth = 101;
    this.sHeight = 171;
  } else {
    this.sx = 0;
    this.sy = 171;
    this.sWidth = 101;
    this.sHeight = 171;
  }
}