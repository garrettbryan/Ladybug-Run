var GamePiece = function() {
  cg('GamePiece new');

    this.draw = false;

/*
I modified some of the sprites to have a left and right facing image. This data represents the source dimensions of the sprites.
*/
    this.spriteDimensions = {
        x: 101 * this.scale,
        y: 171 * this.scale
    };
    this.sx = 0;
    this.sy = 0;
    this.sWidth = 101;
    this.sHeight = 171;


/*
Every GamePiece has a tile, that is used to determine screen position.
The tiles are used for movement of game pieces, and rendering order. (Tiles
and gamepieces towards the top of the canvas are rendered first to enhance
the depth of the game.) The position is used for colisions, and targeting
by the boss. The center is acually the point where the sprite should be
alligned with the tile, e.g. looks like the player is standing in a
certain position.
The offset value moves the position of the sprit in relation to the center. So when a player picks up a collectable the center of the collectable will be the center of the player but the offset will position the collectable above the player's character's head.
*/
    this.tile = {
      x: 0,
      y: 0
    };
    this.position = {
      x: 0,
      y: 0
    };
    this.offset = {
      x: 0,
      y: 0
    };
    this.center = { //This value will change based on the sprite
      x: this.spriteDimensions.x / 2,
      y: 120 * this.scale
    };
    this.direction = { //This value is set by the direction buttons
      x: 0,
      y: 0
    };
    this.rotation = 0; //about the z axis


/*
The collision system measures the distance between the centers of various
entities and if that distance is less than the sum of the
collisionBoundary radii, then a collision happens and the a funcion is
called detailing the interaction.
*/
    this.collisionBoundary = {
        'primary': {
            'collidesWith' : [],
            r: 30 * this.scale,
            x: 0,
            y: 0,
            xOffset: this.center.x,
            yOffset: this.center.y
        }
    };
}

GamePiece.prototype.update = function(dt) {
  cg('GamePiece update');
    if (this.attachedTo){
        this.x = this.attachedTo.x + 20 ;
        this.y = this.attachedTo.y + 30;
    }
    for (boundary in this.collisionBoundary){
      this.collisionBoundary[boundary].x = this.position.x + this.collisionBoundary[boundary].xOffset;
      this.collisionBoundary[boundary].y = this.position.y  + this.collisionBoundary[boundary].yOffset;
    }
/*

    this.sprite = this.types[this.type].sprite;
    this.name = this.types[this.type].name;
*/
}

GamePiece.prototype.collisionCheck = function(gamePiece, boundary, result){
  cg('GamePiece collisionCheck');
    var distanceBetweenGamePieces =
        (gamePiece.collisionBoundary[boundary].x - this.collisionBoundary.primary.x) *
        (gamePiece.collisionBoundary[boundary].x - this.collisionBoundary.primary.x) +
        (gamePiece.collisionBoundary[boundary].y - this.collisionBoundary.primary.y) *
        (gamePiece.collisionBoundary[boundary].y - this.collisionBoundary.primary.y);
    var radiiSum = (gamePiece.collisionBoundary[boundary].r + this.collisionBoundary.primary.r) *
         (gamePiece.collisionBoundary[boundary].r + this.collisionBoundary.primary.r);
    if (distanceBetweenGamePieces < radiiSum) {
        result.call(this, gamePiece);
    }
}



GamePiece.prototype.retarget = function(targetPt){
  ce('retarget');
  ce(this.position);
  ce(targetPt);
  var vector = {},
    vectorMagnitude = 0,
    normal = {};

  vector = {
      x: targetPt.x - (this.position.x + this.center.x),
      y: targetPt.y - (this.position.y + this.center.y)
  };
  vectorMagnitude = Math.sqrt(vector.x * vector.x + vector.y * vector.y);

  this.direction = {
      x: vector.x / vectorMagnitude,
      y: vector.y/  vectorMagnitude
  };

  ce(this.direction);

};

GamePiece.prototype.render = function(row) {
  cg('GamePiece ' + this.name + ' render' + row);
  console.log(this.offset);

  if (Math.ceil(this.tile.y) === row){
    ctx.drawImage(Resources.get(this.sprite),
    this.sx, this.sy, this.sWidth, this.sHeight,
    this.position.x + this.offset.x, this.position.y - this.offset.y,
    this.spriteDimensions.x, this.spriteDimensions.y);
    for (boundary in this.collisionBoundary){
      ctx.beginPath();
      ctx.arc(this.collisionBoundary[boundary].x, this.collisionBoundary[boundary].y, this.collisionBoundary[boundary].r, 0, 2 * Math.PI, false);
      ctx.stroke();
    }
    if (this.steed){
      //this.steed.renderRider();
    }
  }
};

GamePiece.prototype.move = function(dt){
  cg('GamePiece move ' + this.name);
  this.tile = {
    x: this.tile.x + this.speed * dt * this.direction.x,
    y: this.tile.y + this.speed * dt * this.direction.y
  }
  this.calculatePosition();
}

GamePiece.prototype.calculatePosition = function(){
  cg('GamePiece calculatePosition ' + this.name);
  this.position = {
    x : this.tile.x * game.world.pixelsPerTileUnit.x +
        game.world.pixelsPerTileUnit.x / 2 -
        this.center.x,
    y : (this.tile.y + 1) * game.world.pixelsPerTileUnit.y -
        game.world.pixelsPerElevationUnit.y * game.world.currentMap.topoMap[Math.floor(this.tile.y) * game.world.currentMap.totalTiles.x + Math.floor(this.tile.x)] +
        game.world.elevationOffset  -
        this.center.y
  };

}

GamePiece.prototype.calculateWorldPosition
 = function(tile){
  cg('GamePiece calculateWorldPosition');
//  console.log(tile.y + ' ' + tile.x + ' ' + game.world.currentMap.totalTiles.x);
//  console.log(Math.floor(tile.y) * game.world.currentMap.totalTiles.x + Math.floor(//tile.x));
//  console.log(game.world.currentMap.topoMap[Math.floor(tile.y) * game.world.currentMap.totalTiles.x + Math.floor(tile.x)]);
  var result = {
    x : tile.x * game.world.pixelsPerTileUnit.x +
        game.world.pixelsPerTileUnit.x / 2,
    y : game.world.pixelsPerTileUnit.y + game.world.maximumBlockElevation() * game.world.pixelsPerElevationUnit.y -
        game.world.pixelsPerElevationUnit.y * game.world.currentMap.topoMap[Math.floor(tile.y) * game.world.currentMap.totalTiles.x + Math.floor(tile.x)] +
        tile.y * game.world.pixelsPerTileUnit.y
  };


return result;
}

GamePiece.prototype.calculateTile = function(){
  cg('GamePiece calculate tile');
  this.tile = {
    x : (this.position.x + this.center.x - game.world.pixelsPerTileUnit.x/2) / game.world.pixelsPerTileUnit.x,
    y : (this.position.y + this.center.y - game.world.elevationOffset +
      game.world.pixelsPerElevationUnit.y * game.world.currentMap.topoMap[this.tile.y * game.world.currentMap.totalTiles.x + this.tile.x]) /
      game.world.pixelsPerTileUnit.y - 1
  };


}

GamePiece.prototype.calculateCollisionCircles = function(){
  cg('GamePiece calculateCollisionCircles');
  this.collisionBoundary.primary.x = this.position.x +
    this.collisionBoundary.primary.xOffset;

  this.collisionBoundary.primary.y = this.position.y +
    this.collisionBoundary.primary.yOffset;
}

GamePiece.prototype.transport = function(p){
  cg('GamePiece transport');
  for (var i = 0; i < transporters.length; i++){
      if (transporters[i] === this){
          p.tile.x = transporters[0].tile.x;
          p.tile.y = transporters[0].tile.y;

          transporters.splice(i,1);
          transporters.push(this);
          p.tile = transporters[0].tile;
          transporters[0].collisionBoundary.primary.collidesWith = [];
          transporters[1].collisionBoundary.primary.collidesWith = [];
      }
  }
  transporters = [];
  for (var i = 0; i < 2; i++){
      transporters.push(function(){
          return new Transporter(Math.floor(Math.random()*4+5*i), Math.floor(Math.random()*5+2));
      }());
  }
}