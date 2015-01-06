var Enemy = function(posX, posY, speed, scale) {
    GamePiece.call(this, posX, posY, speed, scale);

    this.center.y = 110 * this.scale;

    this.direction = {
        'x': 1,
        'y': 0
    };

    this.name = 'Lady Bug';
    this.sprite = 'images/enemy-bug_sprite_sheet.png';
//    this.sprite = 'images/enemy-bug.png';
    this.spriteFore = 'images/enemy-bug_sprite_sheet.png';

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
    }else if (this.position.x < - this.spriteDimensions - 5) {
        this.death();
    }

};

Enemy.prototype.death = function(){
    for(var i = 0; i < allEnemies.length; i++){
        if (this === allEnemies[i]){
            allEnemies.splice(i,1);
        }
    }
    console.log("Bug Bye");
//    this.character = Math.floor(Math.random()*5);
//    this.tileX = 4;
//    this.tileY = 7;
};

Enemy.prototype.render = function() {
    //ctx.scale(-1,1);
    ctx.drawImage(Resources.get(this.sprite),
        0, 171,
        101, 171*2,
        this.position.x, this.position.y,
        this.spriteDimensions.x, this.spriteDimensions.y*2);
//  for (boundary in this.collisionBoundary){
//    ctx.beginPath();
//    ctx.arc(this.collisionBoundary[boundary].x, this.collisionBoundary[//boundary].y, this.collisionBoundary[boundary].r, 0, 2 * Math.PI, //false);
//    ctx.stroke();
//  }
};