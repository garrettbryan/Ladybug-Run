// Enemies our player must avoid
var Enemy = function(positionX, positionY, speedX) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.sX = speedX;
    this.x = positionX;
    this.y = positionY;
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
    this.x = this.x + this.sX * dt;
    if (this.x > 5 * 101){
        this.x = -1 * 101;
        this.y = Math.floor((Math.random()*3)+1) * 83 - 20;
        this.sX = Math.random()*80 + 20;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.scale(1,1);
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
 //   ctx.scale(0.25,0.25);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(positionX, positionY, speed){
    this.s = speed;
    this.x = positionX;
    this.y = positionY;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function() {

};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function() {

};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// 5 * colSize = 101, 6 * rowSize = 83

var allEnemies = [];

for (var i = 0; i < 3; i++){
    allEnemies.push(function(){
        return new Enemy( -1 * 101, i*83, 100);
    }());
    console.log(allEnemies[i]);
}


var player = new Player(4 * 101, 5 * 83-40, 5);

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
