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
    this.direction = {
        'x': 0,
        'y': 0
    };
//

    this.tile = {
        x: 4,
        y: 4
    };

    this.center.y = 110 * this.scale;

    this.spriteDimensions = {
        x: 101 * this.scale,
        y: 171 * this.scale
    };

    // sprites
    this.name = 'Lady Bug';
    this.sprite = 'images/enemy-bug_sprite_sheet.png';
    this.spriteFore = 'images/enemy-bug-front_sprite_sheet.png';
    this.sx = 0;
    this.sy = 0;
    this.sWidth = 101;
    this.sHeight = 171;


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

    this.navSystem = {
        'currentNodeIndex' : 0,
        'currentNode' : {},
        'targetNode' : {},
        'targetPoint': {},
        'navNodes' : [],
        'navPoints': [],
        'directions' : [],
        'r' : 20,
        'offset' : {
            'x': 0,
            'y': 0
        }
    };

};

Enemy.prototype = Object.create(GamePiece.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.init = function(){
    //console.log("init");
    this.assignPath(game.world.currentMap.enemyPaths);
    this.navSystem.navPoints = this.calculateNavPoints(this.navSystem.navNodes);

}


Enemy.prototype.update = function(dt) {

    //this.tile.x = this.tile.x + this.speed * this.direction.x * dt / this.scale;

 //   this.position.x =  this.center.x + this.tile.x * 101 + 101/2;
 //   this.position.y = - this.center.y + this.tile.y * 83;
 //   this.tile = {
 //       x: 4,
 //       y: 4
 //   };
//    this.calculateTile();
   // //console.log('tile ' + this.tile);

    for (boundary in this.collisionBoundary){
      this.collisionBoundary[boundary].x = this.position.x + this.collisionBoundary[boundary].xOffset;
      this.collisionBoundary[boundary].y = this.position.y  + this.collisionBoundary[boundary].yOffset;
    }
    this.move(dt);
    //this.calculatePosition();

//
//    for ( var collectable in allCollectables){
//        this.collisionCheck(allCollectables[collectable], "primary", this.death);
//    }
//
//    if (this.position.x > 10 * 101){
//        this.tile.x = -1;
//        this.tile.y = Math.floor(2+Math.random()*5);
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

Enemy.prototype.calculateNavPoints = function(navNodes){
    var i = 0,
        navPoints = [];
    while (i < navNodes.length) {
        navPoints[i] = this.calculateWorldPosition(navNodes[i]);
        i++;
    }
    return navPoints;
}

Enemy.prototype.assignPath = function (enemyPaths){
    var vector = {},
        vectorMagnitude,
        normal = {};
    //randomly pick a possible enemy path in the current map
    this.navSystem.navNodes = enemyPaths[Math.floor(Math.random() * enemyPaths.length)];

    this.currentNodeIndex = 0;
    this.navSystem.currentNode = this.navSystem.navNodes[0];
    this.navSystem.targetNode = this.navSystem.navNodes[1];
    for (var i = 1; i < this.navSystem.navNodes.length; i++){
        vector = {
            x: this.navSystem.navNodes[i].x - this.navSystem.navNodes[i-1].x,
            y: this.navSystem.navNodes[i].y - this.navSystem.navNodes[i-1].y
        };
        vectorMagnitude = Math.sqrt(vector.x * vector.x + vector.y * vector.y)
        this.navSystem.directions[i-1] = {
            x: vector.x / vectorMagnitude,
            y: vector.y/  vectorMagnitude
        };
        //console.log(this.directions[i-1]);
    };
    this.direction = this.navSystem.directions[0];
    this.tile = this.navSystem.currentNode;
    console.log(this.navSystem.navPoints);
}

Enemy.prototype.reachedTarget = function(){
    console.log("target reached");
    if (this.navSystem.currentNodeIndex < this.navSystem.directions.length){
        this.navSystem.currentNodeIndex++;
        this.navSystem.currentNode = this.navSystem.targetNode;
        this.navSystem.targetNode = this.navSystem.navNodes[this.navSystem.currentNodeIndex];
        this.navSystem.direction = this.navSystem.directions[this.navSystem.currentNodeIndex];
    } else {
        this.navSystem.currentNodeIndex = 0;
        this.navSystem.currentNode = this.navSystem.navNodes[0];
        this.navSystem.targetNode = this.navSystem.navNodes[1];
        this.navSystem.direction = this.navSystem.directions[0];
        this.tile = this.currentNode;
    }
    console.log(this.collisionBoundary["navPoint"]);
}

Enemy.prototype.death = function(){
    for(var i = 0; i < allEnemies.length; i++){
        if (this === allEnemies[i]){
            allEnemies.splice(i,1);
        }
    }
    //console.log("Bug Bye");
    if (allEnemies.length === 0){
        for (var i = 1; i < 6; i++){
            allEnemies.push(function(){
                return new Enemy( -1, i+1, 3, 0.5*i, 1);
            }());
            //console.log(allEnemies[0]);
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

Enemy.prototype.renderNavPoints = function(){
    for (navPoint in this.navSystem.navNodes){
    //console.log(this.navSystem.navNodes[navPoint]);
      ctx.beginPath();
      ctx.arc(this.navSystem.navPoints[navPoint].x, this.navSystem.navPoints[navPoint].y, this.navSystem.r, 0, 2 * Math.PI, false);
      ctx.stroke();
    }
}