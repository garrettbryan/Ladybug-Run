var Transporter = function(posX, posY) {
  GamePiece.call(this, posX, posY, 1, 1);

  this.center.y = 125 * this.scale;

  this.sprite = 'images/Selector.png';
  this.name = 'Transporter';

  this.collisionBoundary.primary.collidesWith.people = true;
  this.collisionBoundary.primary.collidesWith.collectables = true;
  this.collisionBoundary.primary.collidesWith.enemies = true;
  this.collisionBoundary.primary.collidesWith = [
    Player,
    Enemy,
    Collectable
  ];
  this.collisionBoundary.primary.r = 30 * this.scale;
  this.collisionBoundary.primary.xOffset = this.center.x;
  this.collisionBoundary.primary.yOffset = this.center.y;

};

Transporter.prototype = Object.create(GamePiece.prototype);
Transporter.prototype.constructor = Transporter;

Transporter.prototype.update = function() {
  this.x = -this.boardTileDimensions.x + this.tile.x * this.boardTileDimensions.x + 101 / 2;
  this.y = -this.boardTileDimensions.y + this.tile.y * this.boardTileDimensions.y;

  this.collisionBoundary.primary.x = this.position.x + this.collisionBoundary.primary.xOffset;
  this.collisionBoundary.primary.y = this.position.y + this.collisionBoundary.primary.yOffset;

  for (var player in allPlayers) {
    this.collisionCheck(allPlayers[player], "primary", this.transport);
  }
  for (var enemy in allEnemies) {
    this.collisionCheck(allEnemies[enemy], "primary", this.transport);
  }
  //    for (var collectable in allCollectables){
  //      this.collisionCheck(allCollectables[collectable], "primary", //this.transport);
  //    }
}