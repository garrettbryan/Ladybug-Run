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
            'name': 'head',
            'r': 20 * this.scale,
            'x': 0,
            'y': 0
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

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 101 * this.scale, 171 * this.scale);
//    ctx.beginPath();
//    ctx.arc(this.collisionCircles[0].x , this.collisionCircles[0].y,  this.collisionCircles[0].r, 0, 2 * Math.PI, false);
//    ctx.fill();

};

var sendbugMessage = function(dt, bugMessage){
    for (i = 0; i < bugMessage.length; i++){
        console.log(bugMessage[i][4]);
        console.log(dt);
        if (bugMessage[i][4] < 0){
            var bug = bugMessage.shift();
            allEnemies.push(function(){
                return new Enemy( bug[0],
                    bug[1],
                    bug[2],
                    bug[3]
                );
            }());
        }else{
            bugMessage[i][4] -= 6*dt;
        }
    }
}

var createBugMessage = function(message){
    var bugMessageFormation = [];
    for (var characterIndex = 0; characterIndex < message.length; characterIndex++){
        var character = bugCharacterFormation(message[characterIndex]);
        console.log(character);
        for (var j = 0; j < 5; j++){ // Array index is ordered as such to send out columns at a time
            for (var i = 0; i < 5; i++){
                if (character[i][j] >= 1){
                    console.log(character[i][j]);
                    bugMessageFormation.push( [6.5, i+1, -1*character[i][j]*2, character[i][j], (characterIndex*5.5 + j)]);
                }
            }
        }
    }
    return bugMessageFormation;
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
            name: 'Bug Boy',
            sprite :'images/char-boy.png',
        },
        {
            name: 'Cat Girl',
            sprite: 'images/char-cat-girl.png',
        },
        {
            name: 'Goth Girl with Issues',
            sprite: 'images/char-horn-girl.png',
        },
        {
            name: 'Pinky',
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
            'name': 'head',
            'r': 33 * this.scale,
            'x': 0,
            'y': 0
        },
        {
            'name': 'body',
            'r': 15 * this.scale,
            'x': 0,
            'y': 0
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
        //console.log(d + ' ' + r);
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
    this.tileX = 4;
    this.tileY = 7;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 101 * this.scale, 171 * this.scale);
//    ctx.beginPath();
//    ctx.arc(this.x + (101/2 + 1) * this.scale, this.y + 125 * this.scale, 15 * this.scale, 0, 2 * Math.PI, false);
//    ctx.fill();
//    ctx.beginPath();
//    ctx.arc(this.collisionCircles[0].x , this.collisionCircles[0].y , this.collisionCircles[0].r, 0, 2 * Math.PI, false);
//    ctx.fill();
};

Player.prototype.handleInput = function(key) {
    switch(key){
        case 'left':
            if (this.tileX > 0){
                this.tileX = this.tileX - 1;
            }
            break;
        case 'right':
            if (this.tileX < 9){
                this.tileX = this.tileX + 1;
            }
            break;
        case 'up':
            if (this.tileY > 0){
                this.tileY = this.tileY - 1;
            }
            break;
        case 'down':
            if (this.tileY < 7){
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

//for (var i = 1; i < 7; i++){
//    allEnemies.push(function(){
//        return new Enemy( -1, Math.ceil(i/2), 3, 1);
//    }());
//    console.log(allEnemies[0]);
//}

var player = new Player( 4, 7, 5, 1, 2);

console.log(player);

var bugCharacterFormation = function(character){
    var bugArray = [];
    switch (character){
        case " ":
            bugArray = [
                [0,0,0,0,0],
                [0,0,0,0,0],
                [0,0,0,0,0],
                [0,0,0,0,0],
                [0,0,0,0,0]
                ];
            break;
        case "A":
            bugArray = [
                [0,0,1,0,0],
                [0,1,0,1,0],
                [0,1,0,1,0],
                [1,1,1,1,1],
                [1,0,0,0,1]
            ];
            break;
        case "a":
            bugArray = [
                [0,0,0,0,0],
                [0,0,0,0,0],
                [0,1,1,0,0],
                [1,0,0,1,0],
                [0,1,1,0,1]
                ];
            break;
        case "B":
            bugArray = [
                [1,1,1,0,0],
                [1,0,0,1,0],
                [1,1,1,0,0],
                [1,0,0,1,0],
                [1,1,1,0,0]
                ];
            break;
        case "b":
            bugArray = [
                [1,0,0,0,0],
                [1,0,0,0,0],
                [1,0,1,1,0],
                [1,1,0,0,1],
                [1,0,1,1,0]
                ];
            break;
        case "C":
            bugArray = [
                [0,1,1,1,0],
                [1,0,0,0,0],
                [1,0,0,0,0],
                [1,0,0,0,0],
                [0,1,1,1,0]
                ];
            break;
        case "c":
            bugArray = [
                [0,0,0,0,0],
                [0,0,0,0,0],
                [0,1,1,1,0],
                [0,1,0,0,0],
                [0,1,1,1,0]
                ];
            break;
        case "D":
            bugArray = [
                [1,1,1,0,0],
                [1,0,0,1,0],
                [1,0,0,1,0],
                [1,0,0,1,0],
                [1,1,1,0,0]
                ];
            break;
        case "d":
            bugArray = [
                [0,0,0,0,1],
                [0,0,0,0,1],
                [0,1,1,0,1],
                [1,0,0,1,1],
                [0,1,1,0,1]
                ];
            break;
        case "E":
            bugArray = [
                [1,1,1,1,0],
                [1,0,0,0,0],
                [1,1,1,0,0],
                [1,0,0,0,0],
                [1,1,1,1,0]
                ];
            break;
        case "e":
            bugArray = [
                [0,0,0,0,0],
                [0,1,1,1,0],
                [1,0,0,1,0],
                [1,1,1,0,0],
                [0,1,1,1,1]
                ];
            break;
        case "F":
            bugArray = [
                [1,1,1,1,],
                [1,0,0,0,0],
                [1,1,1,0,0],
                [1,0,0,0,0],
                [1,0,0,0,0]
                ];
            break;
        case "f":
            bugArray = [
                [0,1,1,1,0],
                [0,1,0,0,0],
                [1,1,1,0,0],
                [0,1,0,0,0],
                [0,1,0,0,0]
                ];
            break;
        case "G":
            bugArray = [
                [0,1,1,1,1],
                [1,0,0,0,0],
                [1,0,1,1,0],
                [1,0,0,0,1],
                [0,1,1,1,1]
                ];
            break;
        case "g":
            bugArray = [
                [0,0,1,1,0],
                [0,1,0,0,1],
                [0,0,1,1,1],
                [0,0,0,0,1],
                [0,1,1,1,0]
                ];
            break;
        case "H":
            bugArray = [
                [1,0,0,0,1],
                [1,0,0,0,1],
                [1,1,1,1,1],
                [1,0,0,0,1],
                [1,0,0,0,1]
                ];
            break;
        case "h":
            bugArray = [
                [1,0,0,0,0],
                [1,0,0,0,0],
                [1,0,1,1,0],
                [1,1,0,0,1],
                [1,0,0,0,1]
                ];
            break;
        case "I":
            bugArray = [
                [1,1,1,1,1],
                [0,0,1,0,0],
                [0,0,1,0,0],
                [0,0,1,0,0],
                [1,1,1,1,1]
                ];
            break;
        case "i":
            bugArray = [
                [0,0,1,0,0],
                [0,0,0,0,0],
                [0,0,1,0,0],
                [0,0,1,0,0],
                [0,0,0,1,0]
                ];
            break;
        case "J":
            bugArray = [
                [0,0,0,1,1],
                [0,0,0,0,1],
                [0,0,0,0,1],
                [0,1,0,0,1],
                [0,0,1,1,0]
                ];
            break;
        case "j":
            bugArray = [
                [0,0,0,1,0],
                [0,0,0,0,0],
                [0,0,0,1,0],
                [0,0,0,1,0],
                [0,0,1,0,0]
                ];
            break;
        case "K":
            bugArray = [
                [1,0,0,1,0],
                [1,0,1,0,0],
                [1,1,0,0,0],
                [1,0,1,0,0],
                [1,0,0,1,0]
                ];
            break;
        case "k":
            bugArray = [
                [0,1,0,0,0],
                [0,1,0,0,0],
                [0,1,0,1,0],
                [0,1,1,0,0],
                [0,1,0,1,0]
                ];
            break;
        case "L":
            bugArray = [
                [1,0,0,0,0],
                [1,0,0,0,0],
                [1,0,0,0,0],
                [1,0,0,0,0],
                [1,1,1,1,0]
                ];
            break;
        case "l":
            bugArray = [
                [0,1,1,0,0],
                [0,0,1,0,0],
                [0,0,1,0,0],
                [0,0,1,0,0],
                [0,0,0,1,0]
                ];
            break;
        case "M":
            bugArray = [
                [1,0,0,0,1],
                [1,1,0,1,1],
                [1,0,1,0,1],
                [1,0,0,0,1],
                [1,0,0,0,1]
                ];
            break;
        case "m":
            bugArray = [
                [0,0,0,0,0],
                [0,0,0,0,0],
                [1,1,0,1,0],
                [1,0,1,0,1],
                [1,0,1,0,1]
                ];
            break;
        case "N":
            bugArray = [
                [1,0,0,0,1],
                [1,1,0,0,1],
                [1,0,1,0,1],
                [1,0,0,1,1],
                [1,0,0,0,1]
                ];
            break;
        case "n":
            bugArray = [
                [0,0,0,0,0],
                [0,0,0,0,0],
                [0,1,1,0,0],
                [0,1,0,1,0],
                [0,1,0,1,0]
                ];
            break;
        case "O":
            bugArray = [
                [0,1,1,1,0],
                [1,0,0,0,1],
                [1,0,0,0,1],
                [1,0,0,0,1],
                [0,1,1,1,0]
                ];
            break;
        case "o":
            bugArray = [
                [0,0,0,0,0],
                [0,0,1,1,0],
                [0,1,0,0,1],
                [0,1,0,0,1],
                [0,0,1,1,0]
                ];
            break;
        case "P":
            bugArray = [
                [1,1,1,0,0],
                [1,0,0,1,0],
                [1,1,1,0,0],
                [1,0,0,0,0],
                [1,0,0,0,0]
                ];
            break;
        case "p":
            bugArray = [
                [0,0,0,0,0],
                [1,1,0,0,0],
                [1,0,1,0,0],
                [1,1,0,0,0],
                [1,0,0,0,0]
                ];
            break;
        case "Q":
            bugArray = [
                [0,1,1,0,0],
                [1,0,0,1,0],
                [1,0,1,1,0],
                [1,0,0,1,0],
                [0,1,1,0,1]
                ];
            break;
        case "q":
            bugArray = [
                [0,0,0,0,0],
                [0,0,1,1,0],
                [0,1,0,1,0],
                [0,0,1,1,0],
                [0,0,0,0,1]
                ];
            break;
        case "R":
            bugArray = [
                [1,1,1,0,0],
                [1,0,0,1,0],
                [1,1,1,0,0],
                [1,0,1,0,0],
                [1,0,0,1,0]
                ];
            break;
        case "r":
            bugArray = [
                [0,0,0,0,0],
                [0,0,0,0,0],
                [0,1,1,1,0],
                [0,1,0,0,0],
                [0,1,0,0,0]
                ];
            break;
        case "S":
            bugArray = [
                [0,1,1,1,0],
                [1,0,0,0,0],
                [0,1,1,1,0],
                [0,0,0,0,1],
                [0,1,1,1,0]
                ];
            break;
        case "s":
            bugArray = [
                [0,0,0,0,0],
                [0,0,1,1,0],
                [0,1,0,0,0],
                [0,0,1,1,0],
                [0,1,1,1,0]
                ];
            break;
        case "T":
            bugArray = [
                [1,1,1,1,1],
                [0,0,1,0,0],
                [0,0,1,0,0],
                [0,0,1,0,0],
                [0,0,1,0,0]
                ];
            break;
        case "t":
            bugArray = [
                [0,0,1,0,0],
                [0,1,1,1,0],
                [0,0,1,0,0],
                [0,0,1,0,0],
                [0,0,0,1,0]
                ];
            break;
        case "U":
            bugArray = [
                [1,0,0,0,1],
                [1,0,0,0,1],
                [1,0,0,0,1],
                [1,0,0,0,1],
                [0,1,1,1,0]
                ];
            break;
        case "u":
            bugArray = [
                [0,0,0,0,0],
                [0,0,0,0,0],
                [0,1,0,0,1],
                [0,1,0,0,1],
                [0,0,1,1,1]
                ];
            break;
        case "V":
            bugArray = [
                [1,0,0,0,1],
                [1,0,0,0,1],
                [0,1,0,1,0],
                [0,1,0,1,0],
                [0,0,1,0,0]
                ];
            break;
        case "v":
            bugArray = [
                [0,0,0,0,0],
                [0,0,0,0,0],
                [0,1,0,1,0],
                [0,1,0,1,0],
                [0,0,1,0,0]
                ];
            break;
        case "W":
            bugArray = [
                [1,0,0,0,1],
                [1,0,0,0,1],
                [1,0,1,0,1],
                [1,0,1,0,1],
                [0,1,0,1,0]
                ];
            break;
        case "w":
            bugArray = [
                [0,0,0,0,0],
                [0,0,0,0,0],
                [1,0,0,0,1],
                [1,0,1,0,1],
                [0,1,0,1,0]
                ];
            break;
        case "X":
            bugArray = [
                [1,0,0,0,1],
                [0,1,0,1,0],
                [0,0,1,0,0],
                [0,1,0,1,0],
                [1,0,0,0,1]
                ];
            break;
        case "x":
            bugArray = [
                [0,0,0,0,0],
                [0,0,0,0,0],
                [0,1,0,1,0],
                [0,0,1,0,0],
                [0,1,0,1,0]
                ];
            break;
        case "Y":
            bugArray = [
                [1,0,0,0,1],
                [0,1,0,1,0],
                [0,0,1,0,0],
                [0,0,1,0,0],
                [0,0,1,0,0]
                ];
            break;
        case "y":
            bugArray = [
                [0,0,0,0,0],
                [0,1,0,1,0],
                [0,0,1,0,0],
                [0,0,1,0,0],
                [0,1,0,0,0]
                ];
            break;
        case "Z":
            bugArray = [
                [1,1,1,1,1],
                [0,0,0,1,0],
                [0,0,1,0,0],
                [0,1,0,0,0],
                [1,1,1,1,1]
                ];
            break;
        case "z":
            bugArray = [
                [0,0,0,0,0],
                [0,1,1,1,1],
                [0,0,0,1,0],
                [0,0,1,0,0],
                [0,1,1,1,1]
                ];
            break;

        default:
    }
    return bugArray;
}



var mess = createBugMessage("I love Meredith");

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
