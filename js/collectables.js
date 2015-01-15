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

GamePiece.prototype.render = function() {
  cg('GamePiece ' + this.name + ' render');
  ctx.drawImage(Resources.get(this.sprite),
  this.sx, this.sy, this.sWidth, this.sHeight,
  this.position.x, this.position.y,
  this.spriteDimensions.x, this.spriteDimensions.y);
  for (boundary in this.collisionBoundary){
    ctx.beginPath();
    ctx.arc(this.collisionBoundary[boundary].x, this.collisionBoundary[boundary].y, this.collisionBoundary[boundary].r, 0, 2 * Math.PI, false);
      ctx.stroke();
  }
  if (this.steed){
    //this.steed.renderRider();
  }
};

Collectable.prototype.attach = function(player){
  this.collisionBoundary.primary.r1 = this.collisionBoundary.primary.r;
  this.collisionBoundary.primary.r = 0;
  this.attachedTo = player;
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
  this.position.x = this.speed * this.direction.x * dt + this.position.x;
  this.position.y = this.speed * this.direction.y * dt + this.position.y;

  this.collisionBoundary.primary.x = this.position.x + this.collisionBoundary.primary.xOffset;
  this.collisionBoundary.primary.y = this.position.y  + this.collisionBoundary.primary.yOffset;


//    console.log(this.y);
//    this.sprite = this.types[this.type].sprite;
//    this.name = this.types[this.type].name;
}