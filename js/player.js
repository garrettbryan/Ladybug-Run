// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

/*
var Player = function(){

}
*/

var Player = function(character){
    cl("Player new");
    this.scale = 1;
    this.speed = 400;

    GamePiece.call(this);

    this.character = character;
    this.sprite = this.character.sprite;
    this.name = this.character.name;

    this.center.y = 125 * this.scale;

    this.tile.target = {
        x: 0,
        y: 0
    };

    this.collectables = [];
    this.collectablesWidth = 0;
    this.collectablesSpacing = 0;

    this.sx = 0;
    this.sy = 0;
    this.sWidth = 101;
    this.sHeight = 171;

    this.name = 'player';

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
    cp("Player " + this.name + " initialize" );
    this.tile = tile;
}

Player.prototype.update = function(dt) {
    //cp('Player update');
    this.calculatePosition();
    this.calculateCollisionCircles();
    if (this.steed){
        this.steed.tile = this.tile;
        this.steed.direction = this.direction;
        this.steed.tile = this.tile;
        this.steed.offset.y = 10 * this.steed.scale
        this.steed.calculatePosition();

        this.offset = {
            x: 40 * this.steed.scale * this.steed.direction.x,
            y: 40 * this.steed.scale
        };
    }else{
        this.offset = {
            x: 0,
            y: 0
        };
    }
    this.anyCollisions();
    this.calculateCollectableSpacing();
};

Player.prototype.walkToTile = function() {
    cp('Player walkToTile');
    var result = 0;
    if (this.tile.x >= 0 && this.tile.x < game.world.currentMap.totalTiles.x &&
        this.tile.y >= 0 && this.tile.y < game.world.currentMap.totalTiles.y) {
    cp(game.world.currentMap.walkMap);
        if (this.steed && this.steed.scale >= 2) {
            result = 1;
        }else{
          result = game.world.currentMap.walkMap[this.tile.y * game.world.currentMap.totalTiles.x + this.tile.x];
        }
    }
    return result;
}

Player.prototype.calculatePosition = function(dt){
  cg('GamePiece calculatePosition ' + this.name);

  this.position = {
    x : this.tile.x * game.world.pixelsPerTileUnit.x +
        game.world.pixelsPerTileUnit.x / 2 -
        this.center.x,
    y : (this.tile.y + 1) * game.world.pixelsPerTileUnit.y -
        game.world.pixelsPerElevationUnit.y * game.world.currentMap.topoMap[Math.floor(this.tile.y) * game.world.currentMap.totalTiles.x + Math.floor(this.tile.x)] +
        game.world.elevationOffset  -
        this.center.y
  };

}

//TODO PAUSE FEATURE SET TIMEOUT AND TIMEOUT CLEAR

Player.prototype.handleInput = function(key) {
    cp('Player handleInput');
    var tile0 = {
        x: this.tile.x,
        y: this.tile.y
    },
    direction0 = this.direction;

    switch(key){
        case 'left':
            this.tile.x = this.tile.x - 1;
            this.direction = {
                x: -1,
                y: 0
            };
            break;
        case 'right':
            this.tile.x = this.tile.x + 1;
            this.direction = {
                x: 1,
                y: 0
            };
            break;
        case 'up':
            this.tile.y = this.tile.y - 1;
            this.direction = {
                x: 0,
                y: -1
            };
            break;
        case 'down':
            this.tile.y = this.tile.y + 1;
            this.direction = {
                x: 0,
                y: 1
            };
            break;
        case 'space':

            this.throw();
            break;
        case 'dismount':

            this.dismount();
            break;
    }

    if (this.walkToTile() === 0){
        this.tile= tile0;
        this.direction = direction0;
    }

};

Player.prototype.tag = function(p){
    cp('Player tag');
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

            game.allPlayers.splice(i,1,game.allPlayers[0]);
            game.allPlayers[0] = p;
        }
    }
};

Player.prototype.death = function(){
    cp('Player death');
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

    if (game.allPlayers.length === 0){
    }
};

Player.prototype.throw = function(){
    cp('Player ' + this.name + ' throw ' + this.direction.x + " " + this.direction.y);
    if (this.collectables.length > 0){
        var projectile = this.collectables.pop();
        projectile.collisionBoundary.primary.collidesWith = [
            Player,
            Enemy,
            Transporter
        ];
        projectile.direction = this.direction;
        projectile.speed = this.speed;
        this.collectablesWidth -= projectile.spriteDimensions.x;
        projectile.collisionBoundary.primary.r = projectile.collisionBoundary.primary.r1;
        projectile.position.x = this.collisionBoundary.primary.x - projectile.center.x + (this.collisionBoundary.primary.r + projectile.collisionBoundary.primary.r + 5) * projectile.direction.x;
        projectile.position.y = this.collisionBoundary.primary.y - projectile.center.y + (this.collisionBoundary.primary.r + projectile.collisionBoundary.primary.r + 5) * projectile.direction.y;
        projectile.carriedBy = "";


    }
};

Player.prototype.catchIt = function(collectable){
    cp('Player catchIt');
    for ( var collectable in game.allCollectables){
        this.collisionCheck(game.allCollectables[collectable], "primary", this.pickup);
    }
};

Player.prototype.ride = function(steed){
    cp('Player ride');
    this.steed = steed;
    steed.becomeSteed(this);


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
    cp('Player dismount');
    //this.steed.direction.x = 1;
    //game.allEnemies.push(this.steed);

    this.steed.collisionBoundary.primary.r = this.steed.collisionBoundary.primary.r1;
    this.steed.collisionBoundary.secondary.r = this.steed.collisionBoundary.secondary.r1;

    this.steed.collisionBoundary.primary.collidesWith = [
        Player,
        Transporter,
        Collectable
    ];
    this.steed.collisionBoundary.secondary.collidesWith = [
        Player
    ];
    this.steed.speed = 3;

    this.steed.tile.y = this.tile.y;
    this.steed.tile.x = this.tile.x + this.direction.x;
    this.steed.steedOf = false;
    this.steed = false;

    if (this.tile.y < game.world.currentMap.totalTiles.y - 1 ){
        this.tile.y = this.tile.y + 1;
    } else {
        this.tile.y = this.tile.y - 1;
    }


}

Player.prototype.wait = function() {
    cp('Player wait');

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

Player.prototype.calculateSteedPosition = function(){
        this.steed.direction = this.direction;

        this.steed.positon = this.position;
        this.steed.row = this.row;

//        this.position.x = this.position.x + 10 * this.steed.scale;
//        this.position.y = this.position.y - 0.15 * this.steed.spriteDimensions.y;
}

Player.prototype.pickup = function(collectable){
    cp('Player ' + this.name + ' pickup');
    collectable.attach(this);
    this.collectables.push(collectable);
    this.collectablesWidth += collectable.spriteDimensions.x;
    this.calculateCollectableSpacing();
};

Player.prototype.calculateCollectableSpacing = function() {
    this.collectablesSpacing = 0;
    for (var i = 0; i < this.collectables.length; i++){
        this.collectables[i].offset.x = -this.collectablesWidth/2 + this.collectablesSpacing;
        this.collectables[i].offset.y = 20 * this.scale;
        this.collectablesSpacing += this.collectables[i].spriteDimensions.x;
    }
}

Player.prototype.anyCollisions = function() {
    for ( var enemy in game.allEnemies){
        if (!this.steed){
            this.collisionCheck(game.allEnemies[enemy], "primary", this.death);
            this.collisionCheck(game.allEnemies[enemy], "secondary", this.ride);
        }
    }
    for ( var collectable in game.allCollectables){
        this.collisionCheck(game.allCollectables[collectable], "primary", this.pickup);
    }
    for ( var i = 1; i < game.allPlayers.length; i++){
        this.collisionCheck(game.allPlayers[i], "primary", this.tag)
    }
}