var Collectable = function(posX, posY, speed, scale, type) {
  GamePiece.call(this, speed, scale);
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

Collectable.prototype.attach = function(player){
  this.collisionBoundary.primary.r1 = this.collisionBoundary.primary.r;
  this.collisionBoundary.primary.r = 0;
  this.attachedTo = player;
}

Collectable.prototype.init = function() {
    this.position = {
        x : this.tile.x * game.world.pixelsPerTileUnit.x +
            game.world.pixelsPerTileUnit.x / 2 -
            this.center.x,
        y : this.tile.y * game.world.pixelsPerTileUnit.y -
            game.world.pixelsPerElevationUnit.y *
            game.world.currentMap.topoMap[this.tile.y * game.world.currentMap.totalTiles.x + this.tile.x] +
            game.world.elevationOffset -
            game.world.pixelsPerTileUnit.y / 2
    };
}

Collectable.prototype.update = function(dt) {
    this.position.x = this.speed * this.direction.x * dt + this.position.x;
    this.position.y = this.speed * this.direction.y * dt + this.position.y;

    this.collisionBoundary.primary.x = this.position.x + this.collisionBoundary.primary.xOffset;
    this.collisionBoundary.primary.y = this.position.y  + this.collisionBoundary.primary.yOffset;


//    console.log(this.y);
//    this.sprite = this.types[this.type].sprite;
//    this.name = this.types[this.type].name;
}