var Collectable = function(type) {
  this.scale = 0.25;
  this.speed = 0;
  GamePiece.call(this);
  var types = [
    {
      name: 'Blue Gem',
      sprite: 'images/Gem Blue.png',
    },
    {
      name: 'Green Gem',
      sprite: 'images/Gem Green.png',
    },
    {
      name: 'Orange Gem',
      sprite: 'images/Gem Orange.png',
    },
    {
      name: 'Heart',
      sprite: 'images/Heart.png',
    },
    {
      name: 'Key',
      sprite: 'images/Key.png',
    },
    {
      name: 'Star',
      sprite: 'images/Star.png',
    },
    {
      name: 'Rock',
      sprite: 'images/Rock.png',
    },
  ];
  this.type = type;
  this.sprite = types[this.type].sprite;
  this.name = types[this.type].name;

  this.collisionBoundary.primary.collidesWith = [
    Player
//    Transporter
  ];

};

Collectable.prototype = Object.create(GamePiece.prototype);
Collectable.prototype.constructor = Collectable;


Collectable.prototype.init = function(){
    this.calculatePosition()
    this.position.y = this.position.y + game.world.maximumBlockElevation() * game.world.pixelsPerElevationUnit.y
}

Collectable.prototype.attach = function(player){
  this.collisionBoundary.primary.collidesWith = [];
  this.carriedBy = player;
  this.direction = {
    x: 0,
    y: 0
  }
}

Collectable.prototype.placeRandomly = function(currentMap){
  this.tile = {
    x: Math.floor(Math.random()*(currentMap.totalTiles.x)),
    y: Math.floor(Math.random()*(currentMap.totalTiles.y)),
  };
  if (currentMap.walkMap[Math.floor(this.tile.y) * game.world.currentMap.totalTiles.x + Math.floor(this.tile.x)] === 0){
    this.placeRandomly(currentMap);
  }
  this.calculatePosition();
  console.log(this.tile);
}

Collectable.prototype.update = function(dt) {
//  this.calculatePosition()
  if (this.carriedBy){
    this.tile = this.carriedBy.tile;
    this.position = this.carriedBy.position;
    this.offset = {
      x: 0,
      y: 0
    }

  }else{
    this.position.x = this.speed * this.direction.x * dt + this.position.x;
    this.position.y = this.speed * this.direction.y * dt + this.position.y;
  }
  this.collisionBoundary.primary.x = this.position.x + this.collisionBoundary.primary.xOffset;
  this.collisionBoundary.primary.y = this.position.y  + this.collisionBoundary.primary.yOffset;


//    console.log(this.y);
//    this.sprite = this.types[this.type].sprite;
//    this.name = this.types[this.type].name;
}