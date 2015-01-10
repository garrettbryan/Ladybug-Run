var Enemy = function(speed, scale) {
    GamePiece.call(this, speed, scale);

//Path information comes from the world maps
    this.pathNodes = [];
    this.currentNodeIndex = 0;
    this.currentNode = {
        x: 0,
        y: 0
    };
    this.targetNode = {
        x: 0,
        y: 0
    };
    this.directions = [];
//

    this.tile = {
        x: 4,
        y: 4
    };

    this.center.y = 110 * this.scale;

    console.log(this.tile);
    console.log(this.center);

    this.position.x = this.tile.x * 101 + 101/2 - this.center.x;
    this.position.y = this.tile.y * 83 - this.center.y;

    console.log(this.position);

    this.direction = {
        'x': 0,
        'y': 0
    };

    this.rotation = 0;

    this.spriteDimensions = {
        x: 101 * this.scale,
        y: 171 * this.scale
    };

    this.sx = 0;
    this.sy = 0;
    this.sWidth = 101;
    this.sHeight = 171;

    this.speed = speed;

    this.name = 'Lady Bug';
    this.sprite = 'images/enemy-bug_sprite_sheet.png';
//    this.sprite = 'images/enemy-bug.png';
    this.spriteFore = 'images/enemy-bug-front_sprite_sheet.png';

    this.collisionBoundary.primary.collidesWith = [
        Player,
        Transporter
    ]
    this.collisionBoundary.primary.r = 20 * this.scale;
    this.collisionBoundary.primary.xOffset = 25 * this.scale + this.center.x;
    this.collisionBoundary.primary.yOffset = this.center.y;
    this.collisionBoundary.secondary  = {
        'collidesWith' : [
            Player,
            Enemy,
            Collectable
        ],
        'r': 20 * this.scale,
        'x': 0,
        'y': 0,
        'xOffset': -25 * this.scale + this.center.x,
        'yOffset': this.center.y
    };
    this.collisionBoundary.navPoint  = {
        'collidesWith' : [
            Enemy,
        ],
        'r': 20,
        'x': 0,
        'y': 0,
        'xOffset': 0,
        'yOffset': 0
    };

};

Enemy.prototype = Object.create(GamePiece.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.init = function(){
    this.assignPath(game.world.currentMap.enemyPaths);
}


Enemy.prototype.update = function(dt) {

    console.log(this.position);
    //this.tile.x = this.tile.x + this.speed * this.direction.x * dt / this.scale;

 //   this.position.x =  this.center.x + this.tile.x * 101 + 101/2;
 //   this.position.y = - this.center.y + this.tile.y * 83;
    this.tile = {
        x: 4,
        y: 4
    };
    console.log(this.tile);
    this.calculateTile();
   // console.log('tile ' + this.tile);
    this.collisionCheck(this, "navPoint", this.reachTarget);

    for (boundary in this.collisionBoundary){
      this.collisionBoundary[boundary].x = this.position.x + this.collisionBoundary[boundary].xOffset;
      this.collisionBoundary[boundary].y = this.position.y  + this.collisionBoundary[boundary].yOffset;
    }
//
//    for ( var collectable in allCollectables){
//        this.collisionCheck(allCollectables[collectable], "primary", this.death);
//    }
//
//    if (this.position.x > 10 * 101){
        this.tile.x = -1;
        this.tile.y = Math.floor(2+Math.random()*5);
//    }else if (this.position.x < - this.spriteDimensions.x * 2) {
//        this.death();
//    }

    this.chooseSprite();

};

Enemy.prototype.chooseSprite = function(){
    if (this.direction.x >= 0){
        this.sx = 0;
        this.sy = 0;
        this.sWidth = 101;
        this.sHeight = 171;
    } else {
        this.sx = 0;
        this.sy = 171;
        this.sWidth = 101;
        this.sHeight = 171;
    }
}

Enemy.prototype.assignPath = function (enemyPaths){
    console.log(enemyPaths);
    //randomly pick a possible enemy path in the current map
    this.pathNodes = enemyPaths[Math.floor(Math.random() * enemyPaths.length)];

    console.log(this.pathNodes);

    this.currentNodeIndex = 0;
    this.currentNode = this.pathNodes[0];
    this.targetNode = this.pathNodes[1];
    for (var i = 1; i < this.pathNodes.length; i++){
        this.directions[i-1] = {
            x: this.pathNodes[i][0] - this.pathNodes[i-1][0],
            y: this.pathNodes[i][1] - this.pathNodes[i-1][1]
        };
    }
    this.direction = {
        x: this.directions[0].x,
        y: this.directions[0].y
    }
    this.tile = this.currentNode;
    this.collisionBoundary.navPoint.x = this.targetNode.x;
    this.collisionBoundary.navPoint.y = this.targetNode.y;
    console.log(this.tile);
}

Enemy.prototype.reachTarget = function(){

    if (this.currentNodeIndex < this.directions.length){
        this.currentNodeNumber++;
        this.currentNode = this.targetNode;
        this.targetNode = this.pathNodes[this.currentNodeIndex];
        this.direction = this.directions[this.currentNodeIndex];
    } else {
        this.currentNodeIndex = 0;
        this.currentNode = this.pathNodes[0];
        this.targetNode = this.pathNodes[1];
        this.direction = this.directions[0];
        this.tile = this.currentNode;
    }
    this.collisionBoundary.navPoint.x = this.targetNode.x;
    this.collisionBoundary.navPoint.y = this.targetNode.y;
}

Enemy.prototype.death = function(){
    for(var i = 0; i < allEnemies.length; i++){
        if (this === allEnemies[i]){
            allEnemies.splice(i,1);
        }
    }
    console.log("Bug Bye");
    if (allEnemies.length === 0){
        for (var i = 1; i < 6; i++){
            allEnemies.push(function(){
                return new Enemy( -1, i+1, 3, 0.5*i, 1);
            }());
            console.log(allEnemies[0]);
        }
        for (var i = 0; i < 2; i++){
            transporters.push(function(){
                return new Transporter( Math.floor(Math.random()*4+5*i), Math.floor(Math.random()*5+2));
            }());
        }
    }
//    this.character = Math.floor(Math.random()*5);
//    this.tileX = 4;
//    this.tileY = 7;
};

Enemy.prototype.becomeSteed = function(player){
  this.collisionBoundary.primary.r1 = this.collisionBoundary.primary.r;
  this.collisionBoundary.primary.r = 0;
  this.speed = 0;
  this.steedOf = player;
}

//Enemy.prototype.render = function() {
//    //ctx.scale(-1,1);
//    ctx.drawImage(Resources.get(this.sprite),
//        this.sx, this.sy, this.sWidth, this.sHeight,
//        this.position.x, this.position.y,
//        this.spriteDimensions.x, this.spriteDimensions.y);
//  for (boundary in this.collisionBoundary){
//    ctx.beginPath();
//    ctx.arc(this.collisionBoundary[boundary].x, this.collisionBoundary[boundary].y, this.collisionBoundary[boundary].r, 0, 2 * Math.PI, false);
//    ctx.stroke();
//  }
//};

Enemy.prototype.renderRider = function() {
    ctx.drawImage(Resources.get(this.spriteFore),
    this.sx, this.sy, this.sWidth, this.sHeight,
    this.position.x, this.position.y,
    this.spriteDimensions.x, this.spriteDimensions.y);
}