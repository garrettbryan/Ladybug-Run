// Enemies our player must avoid
var Enemy = function(posX, posY, speed, scale) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    GamePiece.call(this, posX, posY, speed, scale);
    this.height = 110 * this.scale;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.collisionCircles = [
        {
            'name': 'primary',
            'affects': [
              Player,
              ],
            'r': 20 * this.scale,
            'x': 0,
            'y': 0,
            'xOffset': (25 + 101/2 + 1) * this.scale,
            'yOffset': ( this.height)
        }
    ];
};

Enemy.prototype = Object.create(GamePiece.prototype);
Enemy.prototype.constructor = Enemy;

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.tileX = this.tileX + this.speed * dt / this.scale;
    this.x = -101/2  * this.scale + this.tileX * (101 + 101/2);
    this.y = - this.height + this.tileY * 83 + 83;

    this.collisionCircles[0].x = this.x + this.collisionCircles[0].xOffset;
    this.collisionCircles[0].y = this.y  + this.collisionCircles[0].yOffset;

    for ( var collectable in allCollectables){
        this.collisionCheck(allCollectables[collectable], this.death);
    }

    if (this.x > -101/2  * this.scale + 10 * 101 + 101/2 * this.scale){
        this.tileX = -1;
        this.tileY = Math.floor(1+Math.random()*5);
    }else if (this.x < -101/2 * this.scale) {
    }

};

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