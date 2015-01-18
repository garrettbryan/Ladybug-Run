var Collectable = function(collectable) {
  this.scale = 0.25;
  this.speed = 400;
  GamePiece.call(this);

  this.sprite = collectable.sprite;
  this.elementName = collectable.elementName;
  this.points = collectable.points;


  this.collisionBoundary.primary.collidesWith = [
    Player
  ];
};

Collectable.prototype = Object.create(GamePiece.prototype);
Collectable.prototype.constructor = Collectable;

Collectable.prototype.init = function(){
    this.placeRandomly(game.world.currentMap);
    this.calculatePosition();
    //this.position.y = this.position.y + game.world.maximumBlockElevation() * game.world.pixelsPerElevationUnit.y
}

Collectable.prototype.update = function(dt) {
  this.calculatePosition()
  if (this.carriedBy){
    this.tile = this.carriedBy.tile;
    this.position = this.calculatePosition();
    this.offset = {
      x: 0,
      y: 0
    };

  }else{
  }
  this.offset = {
    x: 0,
    y: 0
  };
  for (boundary in this.collisionBoundary){
    this.collisionBoundary[boundary].x = this.position.x + this.collisionBoundary[boundary].xOffset;
    this.collisionBoundary[boundary].y = this.position.y  + this.collisionBoundary[boundary].yOffset;
  }
};

Collectable.prototype.attach = function(player){
  console.log("collectable attach");
  this.collisionBoundary.primary.collidesWith = [];
  this.carriedBy = player;
  this.tile = player.tile;
  console.log(this.tile);
  this.calculatePosition();
  console.log(this.position);
}

Collectable.prototype.placeRandomly = function(currentMap){
  this.tile = {
    x: Math.floor(Math.random()*(currentMap.totalTiles.x)),
    y: Math.floor(Math.random()*(currentMap.totalTiles.y)),
  };
  //console.log(this.tile);
  if (currentMap.walkMap[Math.floor(this.tile.y) * game.world.currentMap.totalTiles.x + Math.floor(this.tile.x)] === 0){
    this.placeRandomly(currentMap);
  }else{
    console.log(this.tile);
  }
}

Collectable.prototype.update = function(dt) {
  this.calculatePosition()
  if (this.carriedBy){
    this.tile = this.carriedBy.tile;
    this.calculatePosition();
    this.offset = {
      x: 0,
      y: 50
    };

  }else{
    this.offset = {
      x: 0,
      y: 0
    };
  }
};