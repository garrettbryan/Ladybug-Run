var Enemy = function(posX, posY, speed, scale) {
    GamePiece.call(this, posX, posY, speed, scale);

    this.center.y = 110 * this.scale;

    this.direction = {
        'x': 1,
        'y': 0
    };

    this.name = 'Lady Bug';
    this.sprite = 'images/enemy-bug.png';
    this.spriteFore = 'images/enemy-bug-front.png';

    this.collisionBoundary.primary.collidesWith.people = true;
    this.collisionBoundary.primary.collidesWith.teleporter = true;
    this.collisionBoundary.primary.r = 20 * this.scale;
    this.collisionBoundary.primary.xOffset = 25 * this.scale + this.center.x;
    this.collisionBoundary.primary.yOffset = this.center.y;
    this.collisionBoundary.secondary = {
        'collidesWith' : {
            'people': true,
            'enemies': false,
            'collectables': false,
            'teleporter': false
        },
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

//    for ( var collectable in allCollectables){
//        this.collisionCheck(allCollectables[collectable], this.death);
//    }

    if (this.position.x > 10 * 101){
        this.tile.x = -1;
        this.tile.y = Math.floor(2+Math.random()*5);
    }else if (this.position.x < -this.center.x) {
    }

};

Enemy.prototype.renderRider = function() {
    ctx.drawImage(Resources.get(this.spriteFore), this.position.x, this.position.y, this.spriteDimensions.x, this.spriteDimensions.y);
}

Enemy.prototype.death = function(){
    allEnemies.shift();
    console.log("Bug Bye");
    if (allEnemies.length === 0){
        Engine.init();
    }
//    this.character = Math.floor(Math.random()*5);
//    this.tileX = 4;
//    this.tileY = 7;
};