var GamePiece = function(posX, posY, speed, scale) {
    this.speed = speed;
    this.scale = scale;

    this.tile = {
        x: posX,
        y: posY
    };

    this.boardTileDimensions = {
        x: 101,
        y: 83
    }

    this.spriteDimensions = {
        x: 101 * this.scale,
        y: 171 * this.scale
    };

    this.center = {
        x: 101 / 2 * this.scale,
        y: 120 * this.scale
    };

    this.position = {
        x: this.tile.x * 101 + 101/2 - this.center.x,
        y: this.tile.y * 83 - this.center.y
    };

    this.direction = {
      'x': 0,
      'y': 0
    };


    this.collisionBoundary = {
        'primary': {
            'collidesWith' : [],
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

GamePiece.prototype.collisionCheck = function(gamePiece, boundary, result){
  if (gamePiece.collisionBoundary[boundary].collidesWith.indexOf(this.constructor) >= 0){
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
}

GamePiece.prototype.update = function(dt) {
    if (this.attachedTo){
        this.x = this.attachedTo.x + 20 ;
        this.y = this.attachedTo.y + 30;
    }
    for (boundary in this.collisionBoundary){
      this.collisionBoundary[boundary].x = this.position.x + this.collisionBoundary[boundary].xOffset;
      this.collisionBoundary[boundary].y = this.position.y  + this.collisionBoundary[boundary].yOffset;
    }
//    console.log(this.y);
//    this.sprite = this.types[this.type].sprite;
//    this.name = this.types[this.type].name;
}

GamePiece.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.position.x, this.position.y, this.spriteDimensions.x, this.spriteDimensions.y);
  if (this.steed){
    this.renderRider();
  }
  for (boundary in this.collisionBoundary){
//    ctx.beginPath();
//    ctx.arc(this.collisionBoundary[boundary].x, this.collisionBoundary[//boundary].y, this.collisionBoundary[boundary].r, 0, 2 * Math.PI, //false);
//    ctx.stroke();
  }
};

