// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(posX, posY, speed, scale, character){
    GamePiece.call(this, posX, posY, speed, scale);
    this.collectables = [];
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
//        {
//            'name': 'head',
//            'r': 33 * this.scale,
//            'x': 0,
//            'y': 0
//        },
        {
            'name': 'body',
            'r': 15 * this.scale,
            'x': 0,
            'y': 0,
            'xOffset': 0,
            'yOffset': 0
        }
    ];
};

Player.prototype = Object.create(GamePiece.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function() {
//var player = new Player( -101/2 + 101 * 4, 120 + 80 * 0, 5, 1);
    this.x = -101/2  * this.scale + this.tileX * 101 + 101/2;
    this.y = - 120 * this.scale + this.tileY * 83 + 83;
    if (this.tileY < 1){
        player.death();
    }
    this.collisionCircles[0].x = this.x + (101/2 + 1) * this.scale;
    this.collisionCircles[0].y = this.y + 95 * this.scale;
    //    window.alert(this.collectables[0]);

    //console.log(this.collisionCheck(allEnemies[0]));
    //console.log(this.direction);
    for ( var enemy in allEnemies){
        this.collisionCheck(allEnemies[enemy], this.death);
    }

    for ( var collectable in allCollectables){
        this.collisionCheck(allCollectables[collectable], this.pickup);
    }

    for (var i = 0; i < this.collectables.length; i++){
        this.collectables[i].x = 101*i*this.collectables[i].scale -30 + this.x + 101/2 - 101/2  * this.collectables[i].scale;
        this.collectables[i].y = -30 + this.y + 83 - 120 * this.collectables[i].scale;
    }

    this.sprite = this.characters[this.character].sprite;
    this.name = this.characters[this.character].name;
};

Player.prototype.handleInput = function(key) {
    switch(key){
        case 'left':
            if (this.tileX > 0){
                this.tileX = this.tileX - 1;
            }
            this.direction = {
                'x': '-1',
                'y': '0'
            }
            break;
        case 'right':
            if (this.tileX < 9){
                this.tileX = this.tileX + 1;
            }
            this.direction = {
                'x': '1',
                'y': '0'
            }
            break;
        case 'up':
            if (this.tileY > 0){
                this.tileY = this.tileY - 1;
            }
            this.direction = {
                'x': '0',
                'y': '-1'
            }
            break;
        case 'down':
            if (this.tileY < 7){
                this.tileY = this.tileY + 1;
            }
            this.direction = {
                'x': '0',
                'y': '1'
            }
            break;
        case 'space':
            console.log('throw');
            this.throw();
            break;
    }
};

Player.prototype.pickup = function(collectable){
    collectable.attach(this);
//    collectable.x = this.x + 20 * this.scale;
//    collectable.y = this.y + 50 * this.scale;
    this.collectables.push(collectable);
    console.log(this.collectables);
}

Player.prototype.death = function(){
    console.log("undude");
//    this.character = Math.floor(Math.random()*5);
//    this.tileX = 4;
//    this.tileY = 7;
};

Player.prototype.throw = function(){
    if (this.collectables.length > 0){
        var projectile = this.collectables.pop();
        console.log(projectile);
        projectile.x = this.x + 101/2 * this.scale - 101/2 * projectile.scale;
        projectile.y = this.y + 120 * this.scale - 100 * projectile.scale;
        projectile.attachedTo = "";
        projectile.collisionCircles[0].r = projectile.collisionCircles[0].r1;
        projectile.direction = this.direction;
    }
}