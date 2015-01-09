var Enemy = function(posX, posY, speed, scale, direction) {
    GamePiece.call(this, posX, posY, speed, scale);

    this.center.y = 110 * this.scale;

    this.direction = {
        'x': direction,
        'y': 0
    };

    this.spriteDimensions = {
        x: 101 * this.scale,
        y: 171 * this.scale
    };



    if (this.direction.x >= 0){
        this.sx = 0;
        this.sy = 0;
        this.sWidth = 101 * this.scale;
        this.sHeight = 171 * this.scale;
    } else {
        this.sx = 0;
        this.sy = 171 * this.scale;
        this.sWidth = 101 * this.scale;
        this.sHeight = 171 * 2 * this.scale;
    }

    this.speed = this.speed * direction;

    this.name = 'Lady Bug';
    this.sprite = 'images/enemy-bug_sprite_sheet.png';
//    this.sprite = 'images/enemy-bug.png';
    this.spriteFore = 'images/enemy-bug-front_sprite_sheet.png';

    this.collisionBoundary.primary.collidesWith = [
        Player,
        Transporter
    ]
    this.collisionBoundary.primary.r = 20 * this.scale;
    this.collisionBoundary.primary.xOffset = 25 * this.scale + this.center.x;
    this.collisionBoundary.primary.yOffset = this.center.y;
    this.collisionBoundary.secondary  = {
        'collidesWith' : [
            Player,
            Enemy,
            Collectable
        ],
        'r': 20 * this.scale,
        'x': 0,
        'y': 0,
        'xOffset': -25 * this.scale + this.center.x,
        'yOffset': this.center.y
    };

};

Enemy.prototype = Object.create(GamePiece.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.update = function(dt) {

    this.tile.x = this.tile.x + this.speed * this.direction.x * dt / this.scale;

    this.position.x = - this.center.x + this.tile.x * 101 + 101/2;
    this.position.y = - this.center.y + this.tile.y * 83;

    for (boundary in this.collisionBoundary){
      this.collisionBoundary[boundary].x = this.position.x + this.collisionBoundary[boundary].xOffset;
      this.collisionBoundary[boundary].y = this.position.y  + this.collisionBoundary[boundary].yOffset;
    }

    for ( var collectable in allCollectables){
        this.collisionCheck(allCollectables[collectable], "primary", this.death);
    }

    if (this.position.x > 10 * 101){
        this.tile.x = -1;
        this.tile.y = Math.floor(2+Math.random()*5);
    }else if (this.position.x < - this.spriteDimensions.x * 2) {
        this.death();
    }


    if (this.direction.x >= 0){
        this.sx = 0;
        this.sy = 0;
        this.sWidth = 101;
        this.sHeight = 171;
    } else {
        this.sx = 0;
        this.sy = 171;
        this.sWidth = 101;
        this.sHeight = 171;
    }

};

Enemy.prototype.createPath = function (currentMap){

}

Enemy.prototype.death = function(){
    for(var i = 0; i < allEnemies.length; i++){
        if (this === allEnemies[i]){
            allEnemies.splice(i,1);
        }
    }
    console.log("Bug Bye");
    if (allEnemies.length === 0){
        for (var i = 1; i < 6; i++){
            allEnemies.push(function(){
                return new Enemy( -1, i+1, 3, 0.5*i, 1);
            }());
            console.log(allEnemies[0]);
        }
        for (var i = 0; i < 2; i++){
            transporters.push(function(){
                return new Transporter( Math.floor(Math.random()*4+5*i), Math.floor(Math.random()*5+2));
            }());
        }
    }
//    this.character = Math.floor(Math.random()*5);
//    this.tileX = 4;
//    this.tileY = 7;
};

Enemy.prototype.becomeSteed = function(player){
  this.collisionBoundary.primary.r1 = this.collisionBoundary.primary.r;
  this.collisionBoundary.primary.r = 0;
  this.speed = 0;
  this.steedOf = player;
}

Enemy.prototype.render = function() {
    //ctx.scale(-1,1);
    ctx.drawImage(Resources.get(this.sprite),
        this.sx, this.sy, this.sWidth, this.sHeight,
        this.position.x, this.position.y,
        this.spriteDimensions.x, this.spriteDimensions.y);
//  for (boundary in this.collisionBoundary){
//    ctx.beginPath();
//    ctx.arc(this.collisionBoundary[boundary].x, this.collisionBoundary[boundary].y, this.collisionBoundary[boundary].r, 0, 2 * Math.PI, false);
//    ctx.stroke();
//  }
};

Enemy.prototype.renderRider = function() {
    ctx.drawImage(Resources.get(this.spriteFore),
    this.sx, this.sy, this.sWidth, this.sHeight,
    this.position.x, this.position.y,
    this.spriteDimensions.x, this.spriteDimensions.y);
}