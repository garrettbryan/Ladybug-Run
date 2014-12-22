// Enemies our player must avoid
var Enemy = function(positionX, positionY, speed, scale) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.speed = speed;
    this.scale = scale;
    this.tileX = positionX;
    this.tileY = positionY;
    this.x = positionX - 101/2 * this.scale;
    this.y = positionY - 135 * this.scale;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt / this.scale;
    if (this.x > (-101/2 + 101 * 6 ) * (this.scale < 1 ? 1 : this.scale)){
        this.scale = Math.random()*1.5+0.5;
        this.speed = 50 + Math.random()*50;
        this.x = -101 * (this.scale < 1 ? 1 : this.scale);
        this.y = Math.floor(1+Math.random()*3)*80 + 120 - (135 * this.scale);
    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.scale(1,1);
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 101 * this.scale, 171 * this.scale);
    ctx.beginPath();
    ctx.arc(this.x + (101/2 + 20) * this.scale, this.y + 108 * this.scale, 25 * this.scale, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(this.x + (101/2 + 44) * this.scale, this.y + 113 * this.scale, 5 * this.scale, 0, 2 * Math.PI, false);
    ctx.fill();
 //   ctx.scale(0.25,0.25);
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(positionX, positionY, speed, scale){
    this.speed = speed;
    this.scale = scale;
    this.tileX = positionX;
    this.tileY = positionY;
    this.sprite = 'images/char-boy.png';
    this.collisionCircle = 0;
};

Player.prototype.footPosition = function(postionX, positionY){

}

Player.prototype.update = function() {
//var player = new Player( -101/2 + 101 * 4, 120 + 80 * 0, 5, 1);
    this.x = -101/2  * this.scale + this.tileX * 101 + 101/2;
    this.y = - 120 * this.scale + this.tileY * 83 + 83;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 101 * this.scale, 171 * this.scale);
    ctx.beginPath();
    ctx.arc(this.x + (101/2 + 1) * this.scale, this.y + 125 * this.scale, 15 * this.scale, 0, 2 * Math.PI, false);
    ctx.fill();
//    ctx.beginPath();
//    ctx.arc(this.x + (101/2 + 1) * this.scale, this.y + 95 * this.scale, 33 * this.scale, 0, 2 * Math.PI, false);
//    ctx.fill();
};

Player.prototype.handleInput = function(key) {
    switch(key){
        case "left":
            if (this.tileX > 0){
                this.tileX = this.tileX - 1;
            }
            break;
        case "right":
            if (this.tileX < 4){
                this.tileX = this.tileX + 1;
            }
            break;
        case "up":
            if (this.tileY > 0){
                this.tileY = this.tileY - 1;
            }
            break;
        case "down":
            if (this.tileY < 5){
                this.tileY = this.tileY + 1;
            }
            break;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// 5 * colSize = 101, 6 * rowSize = 83

var allEnemies = [];

for (var i = 1; i < 4; i++){
    allEnemies.push(function(){
        return new Enemy( 101 , 120 + 80 * i , 100, 2);
    }());
    console.log(allEnemies[i]);
}

var player = new Player( 0, 0, 5, 1);

console.log(player);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
