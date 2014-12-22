// Enemies our player must avoid
var Enemy = function(positionX, positionY, speed, scale) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.speed = speed;
    this.scale = scale;
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

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.scale(1,1);
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 101 * this.scale, 171 * this.scale);
    ctx.beginPath();
    ctx.arc(this.x + (101/2 + 20) * this.scale, this.y + 108 * this.scale, 30 * this.scale, 0, 2 * Math.PI, false);
    //ctx.fillStyle = rgba(0,0,0, 126);
    ctx.fill();
 //   ctx.scale(0.25,0.25);
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(positionX, positionY, speed, scale){
    this.speed = speed;
    this.scale = scale;
    this.x = positionX - 101/2 * this.scale;
    this.y = positionY - 135 * this.scale;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.footPosition = function(postionX, positionY){

}

Player.prototype.update = function() {

};


Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 101 * this.scale, 171 * this.scale);
    ctx.beginPath();
    ctx.arc(this.x + (101/2 + 1) * this.scale, this.y + 125 * this.scale, 15 * this.scale, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(this.x + (101/2 + 1) * this.scale, this.y + 95 * this.scale, 33 * this.scale, 0, 2 * Math.PI, false);
    ctx.fill();
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
        return new Enemy( 330, 200 + 80 * 1, 0, 1);
    }());
    console.log(allEnemies[i]);
}


var player = new Player( -101/2 + 101 * 4, 200 + 80 * 2, 5, 1);
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
