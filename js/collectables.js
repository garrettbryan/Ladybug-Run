var Collectable = function(type) {
  this.scale = 0.25;
  this.speed = 0;
  GamePiece.call(this);

  this.sprite = type.sprite;
  this.name = type.name;
  this.points = type.points;


  this.collisionBoundary.primary.collidesWith = [
    Player
//    Transporter
  ];

};

Collectable.prototype = Object.create(GamePiece.prototype);
Collectable.prototype.constructor = Collectable;


Collectable.prototype.init = function(){
    this.placeRandomly(game.world.currentMap);
    this.calculatePosition()
    this.position.y = this.position.y + game.world.maximumBlockElevation() * game.world.pixelsPerElevationUnit.y
}

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
    this.calculatePosition();
  }
}

Collectable.prototype.update = function(dt) {
//  this.calculatePosition()
  if (this.carriedBy){
    this.tile = this.carriedBy.tile;
    this.position = this.calculatePosition();
    this.offset = {
      x: 0,
      y: 0
    };

  }else{
    this.offset = {
      x: 0,
      y: 0
    };
  }
  this.offset = {
    x: 0,
    y: 0
  };




//    console.log(this.y);
//    this.sprite = this.types[this.type].sprite;
//    this.name = this.types[this.type].name;
}