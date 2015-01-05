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

    this.center.y = 125 * this.scale;

    this.collectables = [];
    this.collectablesWidth = 0;

    this.collisionBoundary = {
        'primary': {
            'collidesWith' : [
                Player,
                Enemy,
                Collectable,
                Transporter
            ],
            'r': 15 * this.scale,
            'x': this.tile.x * 101 + 101/2,
            'y': this.tile.y * 83,
            'xOffset': this.center.x,
            'yOffset': this.center.y
        }
    };
};

Player.prototype = Object.create(GamePiece.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function() {
    if (this.tile.y < 2){
        this.death();
    }

    this.position.x = this.tile.x * 101 + 101/2 - this.center.x;
    this.position.y = this.tile.y * 83  - this.center.y;

    this.collisionBoundary.primary.x = this.position.x + this.collisionBoundary.primary.xOffset;
    this.collisionBoundary.primary.y = this.position.y + this.collisionBoundary.primary.yOffset;

    if (this.steed){
        this.steed.tile = this.tile;
        this.steed.position.x = this.position.x + 15 * this.steed.scale;
        this.steed.position.y = - this.steed.center.y + this.tile.y * 83;
        this.steed.collisionBoundary.primary.x = this.steed.position.x + this.steed.collisionBoundary.primary.xOffset;
        this.steed.collisionBoundary.secondary.x = this.steed.position.x + this.steed.collisionBoundary.secondary.xOffset;
        this.steed.collisionBoundary.primary.y = this.steed.position.y + this.steed.collisionBoundary.primary.yOffset;
        this.steed.collisionBoundary.secondary.y = this.steed.position.y + this.steed.collisionBoundary.secondary.yOffset

        this.position.y = this.position.y + this.ridingOffset.y * this.steed.scale;

    }

    for ( var enemy in allEnemies){
        this.collisionCheck(allEnemies[enemy], "secondary", this.ride);
        this.collisionCheck(allEnemies[enemy], "primary", this.death);
    }

    for ( var collectable in allCollectables){
        this.collisionCheck(allCollectables[collectable], "primary", this.pickup);
    }

//    for (var transport in transporters){
//        this.collisionCheck(transporters, transport.transport);
//    }

    for ( var i = 1; i < allPlayers.length; i++){
        this.collisionCheck(allPlayers[i], "primary", this.tag)
    }

    var collectablesSpacing = 0;
    for (var i = 0; i < this.collectables.length; i++){
        this.collectables[i].position.x = this.position.x + this.center.x - this.collectablesWidth/2 + collectablesSpacing;
        this.collectables[i].position.y = this.position.y - this.collectables[i].center.y + 50 * this.scale;
        collectablesSpacing += this.collectables[i].spriteDimensions.x;
    }

//    this.sprite = this.characters[this.character].sprite;
//    this.name = this.characters[this.character].name;
};

Player.prototype.handleInput = function(key) {
    switch(key){
        case 'left':
            if (this.tile.x > 0){
                this.tile.x = this.tile.x - 1;
            }
            this.direction = {
                'x': '-1',
                'y': '0'
            }
            break;
        case 'right':
            if (this.tile.x < 9){
                this.tile.x = this.tile.x + 1;
            }
            this.direction = {
                'x': '1',
                'y': '0'
            }
            break;
        case 'up':
            if (this.tile.y > 0){
                this.tile.y = this.tile.y - 1;
            }
            this.direction = {
                'x': '0',
                'y': '-1'
            }
            break;
        case 'down':
            if (this.tile.y < 8){
                this.tile.y = this.tile.y + 1;
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
    //console.log(this.tile);
};

Player.prototype.tag = function(p){
    p.tile.x = this.tile.x + 1 * this.direction.x;
    p.tile.y = this.tile.y + 1 * this.direction.y;
    p.direction = this.direction;
    for (var i = 1; i < allPlayers.length; i++){
        if (allPlayers[i] === p){
            console.log(allPlayers.length);
            allPlayers.splice(i,1,allPlayers[0]);
            allPlayers[0] = p;
        }
    }

}

Player.prototype.pickup = function(collectable){
    collectable.attach(this);
    collectable.collisionBoundary.primary.collidesWith = [];
    collectable.position.x = this.position.x;
    collectable.position.y = this.position.y;
    this.collectables.push(collectable);
    this.collectablesWidth += collectable.spriteDimensions.x;
    collectable.direction = {
        x: 0,
        y: 0
    }
    var collectablesSpacing = 0;
    for (var i = 0; i < this.collectables.length; i++){
        this.collectables[i].position.x = this.position.x + this.center.x - this.collectablesWidth/2 + collectablesSpacing;
        this.collectables[i].position.y = this.position.y - this.collectables[i].center.y + 50 * this.scale;
        collectablesSpacing += this.collectables[i].spriteDimensions.x;
    }
    console.log(collectable.position.x);
}


Player.prototype.death = function(){
    allPlayers.shift();
    console.log("undude");
    if (allPlayers.length === 0){
        Engine.init();
    }
//    this.character = Math.floor(Math.random()*5);
//    this.tile.x = 4;
//    this.tile.y = 7;
};

Player.prototype.throw = function(){
    if (this.collectables.length > 0){
        var projectile = this.collectables.pop();
        projectile.collisionBoundary.primary.collidesWith = [
            Player,
            Enemy,
            Transporter
        ];
        projectile.direction = this.direction;
        this.collectablesWidth -= projectile.spriteDimensions.x;
        projectile.collisionBoundary.primary.r = projectile.collisionBoundary.primary.r1;
        projectile.position.x = this.position.x + this.center.x - projectile.center.x + (this.collisionBoundary.primary.r + projectile.collisionBoundary.primary.r + 5) * projectile.direction.x;
        projectile.position.y = this.position.y + this.center.y - projectile.center.y + (this.collisionBoundary.primary.r + projectile.collisionBoundary.primary.r + 5) * projectile.direction.y;
        projectile.attachedTo = "";
        console.log(projectile.position);

    }
}

Player.prototype.catchIt = function(collectable){
    for ( var collectable in allCollectables){
        this.collisionCheck(allCollectables[collectable], "primary", this.pickup);
    }
}

Player.prototype.ride = function(steed){
    steed.collisionBoundary.primary.collidesWith = [];
    steed.collisionBoundary.secondary.collidesWith = [];

    steed.position.x = this.position.x + 15;
    steed.collisionBoundary.primary.x = steed.position.x + steed.collisionBoundary.primary.xOffset;
    steed.collisionBoundary.secondary.x = steed.position.x + steed.collisionBoundary.secondary.xOffset;

 //   steed.position.y = this.position.y;
    steed.direction = {
        'x': 0,
        'y': 0
    };

    this.ridingOffset = {
        x : 0,
        y : -15 * steed.scale,
    },

    this.position.y = this.position.y + this.ridingOffset.y

    this.steed = steed;
    this.steedsWidth += steed.spriteDimensions.x;
}

Player.prototype.renderRider = function() {
    ctx.drawImage(Resources.get(this.steed.spriteFore), this.steed.position.x, this.steed.position.y, this.steed.spriteDimensions.x, this.steed.spriteDimensions.y);
}