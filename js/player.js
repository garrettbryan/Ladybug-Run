// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(posX, posY, speed, scale, character){
    GamePiece.call(this, posX, posY, speed, scale);
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

Player.prototype = Object.create(GamePiece.prototype);
Player.prototype.constructor = Player;

//Player.prototype.collisionCheck = function(enemy){
//    //console.log( enemy.collisionCircles[0].x );
//    for ( var ecc in enemy.collisionCircles){
//        var d = (enemy.collisionCircles[ecc].x - this.collisionCircles[0].x) *
//            (enemy.collisionCircles[ecc].x - this.collisionCircles[0].x) +
//            (enemy.collisionCircles[ecc].y - this.collisionCircles[0].y) *
//            (enemy.collisionCircles[ecc].y - this.collisionCircles[0].y);
//        var r = (enemy.collisionCircles[ecc].r + this.collisionCircles[0].r) *
//             (enemy.collisionCircles[ecc].r + this.collisionCircles[0].r);
//        if (d < r) {
//            player.death();
//        }
//        //console.log(d + ' ' + r);
//    }
//}

Player.prototype.update = function() {
//var player = new Player( -101/2 + 101 * 4, 120 + 80 * 0, 5, 1);
    this.x = -101/2  * this.scale + this.tileX * 101 + 101/2;
    this.y = - 120 * this.scale + this.tileY * 83 + 83;
    if (this.tileY < 1){
        player.death();
    }
    this.collisionCircles[0].x = this.x + (101/2 + 1) * this.scale;
    this.collisionCircles[0].y = this.y + 95 * this.scale;

    //console.log(this.collisionCheck(allEnemies[0]));

    for ( var enemy in allEnemies){
        this.collisionCheck(allEnemies[enemy]);
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