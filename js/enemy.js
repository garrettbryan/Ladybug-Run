// Enemies our player must avoid
var Enemy = function(posX, posY, speed, scale) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    GamePiece.call(this, posX, posY, speed, scale);

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
            'xOffset': 30,
            'yOffset': -15
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
    this.y = - 120 * this.scale + this.tileY * 83 + 83;

    this.collisionCircles[0].x = this.x + (101/2 + 30) * this.scale;
    this.collisionCircles[0].y = this.y + 108 * this.scale;

    if (this.x > -101/2  * this.scale + 10 * 101 + 101/2 *this.scale){
        this.scale = 1; //Math.random()*2.75+0.25;
        this.speed = 1; //2 + Math.random() * 1;
        this.tileX = -1;
        this.collisionCircles[0].r = 20 * this.scale;
        //this.tileY = Math.floor(1+Math.random()*3);
    }else if (this.x < -101/2 * this.scale) {
    }

};
