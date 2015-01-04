var GamePiece = function(posX, posY, speed, scale) {

    this.tile = {
        x: posX,
        y: posY
    };

    this.boardTileDimensions = {
        x: 101,
        y: 83
    }

    this.spriteDimensions = {
        x: 101 * scale,
        y: 171 * scale
    };

    this.center = {
        x: 101 / 2 * scale,
        y: 120 * scale
    };

    this.position = {
        x: this.tile.x * 101 + 101/2 - this.center.x,
        y: this.tile.y * 83 - this.center.y
    };

    this.direction = {
      'x': 0,
      'y': 0
    };

    this.speed = speed;
    this.scale = scale;

    this.collisionBoundary = {
        'primary': {
            'collidesWith' : {
                'people': false,
                'enemies': false,
                'collectables': false,
                'teleporter': false
            },
            'r': 30 * this.scale,
            'x': 0,
            'y': 0,
            'xOffset': this.center.x,
            'yOffset': this.center.y
        }
    };
}

GamePiece.prototype.transport = function(p){
  for (var i = 0; i < transporters.length; i++){
      if (transporters[i] === this){
          p.tile.x = transporters[0].tile.x;
          p.tile.y = transporters[0].tile.y;
          console.log(transporters.length);
          transporters.splice(i,1);
          transporters.push(this);
          p.tile = transporters[0].tile;
          transporters[0].collisionBoundary.primary.collidesWith.people = false;
          transporters[0].collisionBoundary.primary.collidesWith.collectables = false;
          transporters[0].collisionBoundary.primary.collidesWith.enemies = false;

          transporters[1].collisionBoundary.primary.collidesWith.people = false;
          transporters[1].collisionBoundary.primary.collidesWith.collectables = false;
          transporters[1].collisionBoundary.primary.collidesWith.enemies = false;

      }
  }
  transporters = [];
  for (var i = 0; i < 2; i++){
      transporters.push(function(){
          return new Transporter(Math.floor(Math.random()*4+5*i), Math.floor(Math.random()*5+2));
      }());
  }
}

GamePiece.prototype.collisionCheck = function(gamePiece, result){
    var distanceBetweenGamePieces =
        (gamePiece.collisionBoundary.primary.x - this.collisionBoundary.primary.x) *
        (gamePiece.collisionBoundary.primary.x - this.collisionBoundary.primary.x) +
        (gamePiece.collisionBoundary.primary.y - this.collisionBoundary.primary.y) *
        (gamePiece.collisionBoundary.primary.y - this.collisionBoundary.primary.y);
    var radiiSum = (gamePiece.collisionBoundary.primary.r + this.collisionBoundary.primary.r) *
         (gamePiece.collisionBoundary.primary.r + this.collisionBoundary.primary.r);
    if (distanceBetweenGamePieces < radiiSum) {
        result.call(this, gamePiece);
    }
}

GamePiece.prototype.update = function(dt) {
    if (this.attachedTo){
        this.x = this.attachedTo.x + 20 ;
        this.y = this.attachedTo.y + 30;
    }
    this.collisionBoundary.primary.x = this.position.x + this.collisionBoundary.primary.xOffset;
    this.collisionBoundary.primary.y = this.position.y  + this.collisionBoundary.primary.yOffset;
//    console.log(this.y);
//    this.sprite = this.types[this.type].sprite;
//    this.name = this.types[this.type].name;
}

GamePiece.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.position.x, this.position.y, this.spriteDimensions.x, this.spriteDimensions.y);
    ctx.beginPath();
    ctx.arc(this.collisionBoundary.primary.x, this.collisionBoundary.primary.y, this.collisionBoundary.primary.r, 0, 2 * Math.PI, false);
    ctx.stroke();
};

