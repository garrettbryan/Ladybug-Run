// Enemies our player must avoid
var Enemy = function(positionX, positionY, speed, scale) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.speed = speed;
    this.scale = scale;
    this.tileX = positionX;
    this.tileY = positionY;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.collisionCircles = [
        {
            "name": "head",
            "r": 20 * this.scale,
            "x": 0,
            "y": 0
        }
    ];
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.tileX = this.tileX + this.speed * dt / this.scale;
    this.x = -101/2  * this.scale + this.tileX * (101 + 101/2);
    this.y = - 120 * this.scale + this.tileY * 83 + 83;

    this.collisionCircles[0].x = this.x + (101/2 + 25) * this.scale;
    this.collisionCircles[0].y = this.y + 108 * this.scale;

    if (this.x > -101/2  * this.scale + 5 * 101 + 101/2 *this.scale){
        this.scale = Math.random()*1.75+0.25;
        this.speed = 0.5 + Math.random() * 0.5;
        this.tileX = -1;
        //this.tileY = Math.floor(1+Math.random()*3);
    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 101 * this.scale, 171 * this.scale);
//    ctx.beginPath();
//    ctx.arc(this.collisionCircles[0].x, this.collisionCircles[0].y, 20 * this.scale, 0, 2 * Math.PI, false);
//    ctx.fill();
//    ctx.beginPath();
//    ctx.arc(this.x + (101/2 + 44) * this.scale, this.y + 113 * this.scale, 5 * this.scale, 0, 2 * Math.PI, false);
//    ctx.fill();
};


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(positionX, positionY, speed, scale, character){
    this.speed = speed;
    this.scale = scale;
    this.tileX = positionX;
    this.tileY = positionY;
    this.characters = [
        {
            name: "Bug Boy",
            sprite :'images/char-boy.png',
        },
        {
            name: "Cat Girl",
            sprite: 'images/char-cat-girl.png',
        },
        {
            name: "Goth Girl with Issues",
            sprite: 'images/char-horn-girl.png',
        },
        {
            name: "Pinky",
            sprite: 'images/char-pink-girl.png',
        },
        {
            name: 'Princess Lily',
            sprite: 'images/char-princess-girl.png',
        }
    ];
    this.character = character;
    this.sprite = this.characters[character].sprite;
    this.name = this.characters[character].name;
    this.collisionCircles = [
        {
            "name": "head",
            "r": 33 * this.scale,
            "x": 0,
            "y": 0
        },
        {
            "name": "body",
            "r": 15 * this.scale,
            "x": 0,
            "y": 0
        }
    ];
};

Player.prototype.collisionCheck = function(enemy){
    //console.log( enemy.collisionCircles[0].x );
    for ( var ecc in enemy.collisionCircles){
        var d = (enemy.collisionCircles[ecc].x - this.collisionCircles[0].x) *
            (enemy.collisionCircles[ecc].x - this.collisionCircles[0].x) +
            (enemy.collisionCircles[ecc].y - this.collisionCircles[0].y) *
            (enemy.collisionCircles[ecc].y - this.collisionCircles[0].y);
        var r = (enemy.collisionCircles[ecc].r + this.collisionCircles[0].r) *
             (enemy.collisionCircles[ecc].r + this.collisionCircles[0].r);
        if (d < r) {
            player.death();
        }
        //console.log(d + " " + r);
    }
}

Player.prototype.update = function() {
//var player = new Player( -101/2 + 101 * 4, 120 + 80 * 0, 5, 1);
    this.x = -101/2  * this.scale + this.tileX * 101 + 101/2;
    this.y = - 120 * this.scale + this.tileY * 83 + 83;
    if (this.tileY < 1){
        player.death();
    }
    this.collisionCircles[0].x = this.x + (101/2 + 1) * this.scale;
    this.collisionCircles[0].y = this.y + 95 * this.scale;

    for ( var enemy in allEnemies){
        player.collisionCheck(allEnemies[enemy]);
    }



    this.sprite = this.characters[this.character].sprite;
    this.name = this.characters[this.character].name;
};

Player.prototype.death = function(){
    this.character = Math.floor(Math.random()*5);
    this.tileX = 2;
    this.tileY = 5;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 101 * this.scale, 171 * this.scale);
//    ctx.beginPath();
//    ctx.arc(this.x + (101/2 + 1) * this.scale, this.y + 125 * this.scale, 15 * this.scale, 0, 2 * Math.PI, false);
//    ctx.fill();
//    ctx.beginPath();
//    ctx.arc(this.collisionCircles[0].x , this.collisionCircles[0].y , 33 * this.scale, 0, 2 * Math.PI, false);
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
        return new Enemy( -1, i, 1, 1);
    }());
    console.log(allEnemies[0]);
}

var player = new Player( 2, 5, 5, 1, 2);

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
