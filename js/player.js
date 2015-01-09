// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

/*
var Player = function(){
    console.log("new player");
}
*/

var Player = function(speed, scale, character){
    console.log("  new Player");
    GamePiece.call(this, speed, scale);

    this.character = character;
    this.sprite = this.character.sprite;
    this.name = this.character.name;

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

Player.prototype.init = function(tile){
    console.log("player initialize");
    this.tile = tile;
}

Player.prototype.walkToTile = function() {
    var result = 0;
    if (this.tile.x >= 0 && this.tile.x < game.world.currentMap.totalTiles.x &&
        this.tile.y >= 0 && this.tile.y < game.world.currentMap.totalTiles.y) {
      result = game.world.currentMap.walkMap[this.tile.y * game.world.currentMap.totalTiles.x + this.tile.x];
    }
    return result;
}

Player.prototype.update = function() {

    this.position = {
        x : this.tile.x * game.world.pixelsPerTileUnit.x +
            game.world.pixelsPerTileUnit.x / 2 -
            this.center.x,
        y : this.tile.y * game.world.pixelsPerTileUnit.y -
            game.world.pixelsPerElevationUnit.y *
            game.world.currentMap.topoMap[this.tile.y * game.world.currentMap.totalTiles.x + this.tile.x] +
            game.world.elevationOffset -
            game.world.pixelsPerTileUnit.y / 2
    };

    this.collisionBoundary.primary.x = this.position.x +
        this.collisionBoundary.primary.xOffset;

    this.collisionBoundary.primary.y = this.position.y +
        this.collisionBoundary.primary.yOffset;

    if (this.steed){
        this.steed.direction.x = this.direction.x;
        //console.log(this.direction.x);
        this.steed.position.x = - this.steed.center.x + this.tile.x * 101 + 101/2;
        this.steed.position.y = - this.steed.center.y + this.tile.y * 83;
        this.steed.collisionBoundary.primary.x = this.steed.position.x + this.steed.collisionBoundary.primary.xOffset;
        this.steed.collisionBoundary.primary.y = this.steed.position.y + this.steed.collisionBoundary.primary.yOffset;
        this.steed.collisionBoundary.secondary.x = this.steed.position.x + this.steed.collisionBoundary.secondary.xOffset;
        this.steed.collisionBoundary.secondary.y = this.steed.position.y + this.steed.collisionBoundary.secondary.yOffset

        this.position.x = this.position.x + 10 * this.steed.scale;
        this.position.y = this.position.y - 0.15 * this.steed.spriteDimensions.y;

    }

    for ( var enemy in game.allEnemies){
        if (!this.steed){
            this.collisionCheck(game.allEnemies[enemy], "primary", this.death);
            this.collisionCheck(game.allEnemies[enemy], "secondary", this.ride);
        }
    }

    for ( var collectable in game.allCollectables){
        this.collisionCheck(game.allCollectables[collectable], "primary", this.pickup);
    }

//    for (var transport in transporters){
//        this.collisionCheck(transporters, transport.transport);
//    }

    for ( var i = 1; i < game.allPlayers.length; i++){
        this.collisionCheck(game.allPlayers[i], "primary", this.tag)
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
    var tile0 = {
        x: this.tile.x,
        y: this.tile.y
    },
    direction0 = this.direction;

    switch(key){
        case 'left':
            this.tile.x = this.tile.x - 1;
            this.direction = { x: -1, y: 0};
            break;
        case 'right':
            this.tile.x = this.tile.x + 1;
            this.direction = { x: 1, y: 0};
            break;
        case 'up':
            this.tile.y = this.tile.y - 1;
            this.direction = {x: 0, y: -1}
            break;
        case 'down':
            this.tile.y = this.tile.y + 1;
            this.direction = {x: 0, y: 1}
            break;
        case 'space':
            console.log('throw');
            this.throw();
            break;
        case 'dismount':
            console.log('dismount');
            this.dismount();
            break;
    }
    console.log(this.walkToTile());
    if (this.walkToTile() === 0){
        this.tile = tile0;
    }
    //console.log(this.tile);
};

Player.prototype.tag = function(p){
    p.tile = {
        x : this.tile.x + 1 * this.direction.x,
        y : this.tile.y + 1 * this.direction.y
    }

    if (p.tile.x < 0 || p.tile.x > world.tileSize.x){
        p.tile.x = this.tile.x;
        p.tile.y = this.tile.y + 1;
    }
    if (p.tile.y < 0 || p.tile.y > world.tileSize.y){
        p.tile.y = this.tile.y;
        p.tile.x = this.tile.x + 1;
    }

    p.direction = this.direction;

    for (var i = 1; i < game.allPlayers.length; i++){
        if (game.allPlayers[i] === p){
            console.log(game.allPlayers.length);
            game.allPlayers.splice(i,1,game.allPlayers[0]);
            game.allPlayers[0] = p;
        }
    }


};

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
};

Player.prototype.death = function(){
    if (this.steed){
        for(var i = 0; i < game.allEnemies.length; i++){
            if (this.steed === game.allEnemies[i]){
                game.allEnemies.splice(i,1);
            }
        }
    }
    if (this.collectables){
        for (var j = 0; j < this.collectables.length; j++){
            for (var i = 0; i < game.allCollectables.length; i++){
                if (this.collectables[j] === game.allCollectables[i]){
                    game.allCollectables.splice(i,1);
                }
            }
        }
        this.collectables = [];

    }
    game.allPlayers.shift();
    console.log("You're being very undude . . .");
    if (game.allPlayers.length === 0){
    }
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
        projectile.position.x = this.collisionBoundary.primary.x - projectile.center.x + (this.collisionBoundary.primary.r + projectile.collisionBoundary.primary.r + 5) * projectile.direction.x;
        projectile.position.y = this.collisionBoundary.primary.y - projectile.center.y + (this.collisionBoundary.primary.r + projectile.collisionBoundary.primary.r + 5) * projectile.direction.y;
        projectile.attachedTo = "";
        console.log(projectile.position);

    }
};

Player.prototype.catchIt = function(collectable){
    for ( var collectable in game.allCollectables){
        this.collisionCheck(game.allCollectables[collectable], "primary", this.pickup);
    }
};

Player.prototype.ride = function(steed){
    this.steed = steed;
    steed.becomeSteed(this);

    if (!this.steed){
        for(var i = 0; i < game.allEnemies.length; i++){
            if (this.steed === game.allEnemies[i]){
                game.allEnemies.splice(i,1);
            }
        }
    }

    steed.collisionBoundary.primary.collidesWith = [];
    steed.collisionBoundary.secondary.collidesWith = [];

    steed.direction = {
        'x': 0,
        'y': 0
    };

    this.ridingOffset = {
        x : 0,
        y : -7 * steed.scale,
    },

    this.collisionBoundary.primary.collidesWith = [
        Player,
        Collectable,
        Transporter
    ];

}

Player.prototype.dismount = function(){
    //this.steed.direction.x = 1;
    game.allEnemies.push(this.steed);
    console.log(this.steed);

    this.steed.collisionBoundary.primary.collidesWith = [
        Player,
        Transporter,
        Collectable
    ];
    this.steed.collisionBoundary.secondary.collidesWith = [
        Player
    ];

    this.steed.tile.y = this.tile.y;
    this.steed.tile.x = this.tile.x;
    this.steed = false;

    if (this.tile.y < 8){
        this.tile.y = this.tile.y + 1;
    } else {
        this.tile.y = this.tile.y - 1;
    }


}

Player.prototype.wait = function() {

    this.position.x = this.tile.x * 101 + 101/2 - this.center.x;
    this.position.y = this.tile.y * 83  - this.center.y;

    this.collisionBoundary.primary.x = this.position.x + this.collisionBoundary.primary.xOffset;
    this.collisionBoundary.primary.y = this.position.y + this.collisionBoundary.primary.yOffset;

    if (this.steed){
        this.steed.position.x = - this.steed.center.x + this.tile.x * 101 + 101/2;
        this.steed.position.y = - this.steed.center.y + this.tile.y * 83;
        this.steed.collisionBoundary.primary.x = this.steed.position.x + this.steed.collisionBoundary.primary.xOffset;
        this.steed.collisionBoundary.primary.y = this.steed.position.y + this.steed.collisionBoundary.primary.yOffset;
        this.steed.collisionBoundary.secondary.x = this.steed.position.x + this.steed.collisionBoundary.secondary.xOffset;
        this.steed.collisionBoundary.secondary.y = this.steed.position.y + this.steed.collisionBoundary.secondary.yOffset

        this.position.x = this.position.x + 10 * this.steed.scale;
        this.position.y = this.position.y - 0.15 * this.steed.spriteDimensions.y;

    }
};
