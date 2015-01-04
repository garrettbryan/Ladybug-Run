var Transporter = function(posX, posY) {
  GamePiece.call(this, posX, posY, 1, 1);

  this.center.y = 125 * this.scale;

  this.sprite = 'images/Selector.png';
  this.name = 'Transporter';

  this.collisionBoundary.primary.collidesWith.people = true;
  this.collisionBoundary.primary.collidesWith.collectables = true;
  this.collisionBoundary.primary.collidesWith.enemies = true;
  this.collisionBoundary.primary.r = 30 * this.scale;
  this.collisionBoundary.primary.xOffset = this.center.x;
  this.collisionBoundary.primary.yOffset = this.center.y;

};

Transporter.prototype = Object.create(GamePiece.prototype);
Transporter.prototype.constructor = Transporter;

Transporter.prototype.update = function(){
    this.x = - this.boardTileDimensions.x + this.tile.x * this.boardTileDimensions.x + 101/2;
    this.y = - this.boardTileDimensions.y + this.tile.y * this.boardTileDimensions.y;

    this.collisionBoundary.primary.x = this.position.x + this.collisionBoundary.primary.xOffset;
    this.collisionBoundary.primary.y = this.position.y + this.collisionBoundary.primary.yOffset;

//    for (var player in allPlayers){
//      this.collisionCheck(allPlayers[player],this.transport);
//    }
}

Transporter.prototype.transport = function(p){
  for (var i = 0; i < transporters.length; i++){
      if (transporters[i] === this){
          console.log(transporters.length);
          transporters.splice(i,1);
          transporters.push(this);
          transporters[0].collisionBoundary.primary.collidesWith.people = false;
          transporters[0].collisionBoundary.primary.collidesWith.collectables = false;
          transporters[0].collisionBoundary.primary.collidesWith.enemies = false;

          transporters[1].collisionBoundary.primary.collidesWith.people = false;
          transporters[1].collisionBoundary.primary.collidesWith.collectables = false;
          transporters[1].collisionBoundary.primary.collidesWith.enemies = false;

      }
  }
  p.tile.x = transporters[0].tile.x;
  p.tile.y = transporters[0].tile.y;
  transporters = [];
  for (var i = 0; i < 2; i++){
      transporters.push(function(){
          return new Transporter( Math.floor(Math.random()*4+5*i), Math.floor(Math.random()*5+1));
      }());
  }
}