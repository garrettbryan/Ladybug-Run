var Enemy = function() {
    ce('enemy');
    this.speed = 3;
    this.scale = 2;

    GamePiece.call(this);

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

    this.collisionBoundary = {
        primary : {
            'collidesWith' : [
                Player,
                Enemy,
                Collectable
            ],
            'r': 20 * this.scale,
            'x': 0,
            'y': 0,
            'xOffset': 25 * this.scale,
            'yOffset': this.center.y
        },
        secondary : {
            'collidesWith' : [
                Player,
                Enemy,
                Collectable
            ],
            'r': 20 * this.scale,
            'x': 0,
            'y': 0,
            'xOffset': -25 * this.scale,
            'yOffset': this.center.y
        },
        navigatory : {
            'collidesWith' : [
            ],
            r: 2 * this.scale,
            x: 0,
            y: 0,
            'xOffset': 0,
            'yOffset': this.center.y
        }
    };

    this.navData = {
        'currentNodeIndex' : 0,
        'currentNode' : {},
        'targetNode' : {},
        'targetPoint': {},
        'navNodes' : [],
        'navPoints': [],
        'directions' : [],
        'r' : 1,
        'offset' : {
            'x': 0,
            'y': 0
        }
    };

};

Enemy.prototype = Object.create(GamePiece.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.init = function(){
    ce('enemy init');
    //TODO SET ALL PARAMETERS FOR AN ENEMY
    this.assignPath(game.world.currentMap.enemyPaths);

}

Enemy.prototype.update = function(dt) {
    ce('enemy update');

    //TODO IF NOT NAVIGATING THEN ENEMY IS BEING RIDDEN


    if (this.steedOf){
        //player controls positioning of a steed
    }else{
        this.navigate(this.navData, this.reachedTarget);
        ce(this.navData.targetPoint);
        ce(this.position);
        this.retarget(this.navData.targetPoint);
        this.move(dt);
    }
    this.reflectCollisionBoundaries();
    this.chooseSpriteDirection();


};

Enemy.prototype.reflectCollisionBoundaries = function(){
    ce('enemy reflectCollisionBoundaries');

    for (boundary in this.collisionBoundary){
    if (this.direction.x >= 0) {
        this.collisionBoundary[boundary].x = this.position.x + this.center.x + this.collisionBoundary[boundary].xOffset;
    } else {
        this.collisionBoundary[boundary].x = this.position.x + this.center.x - this.collisionBoundary[boundary].xOffset;
    }
      this.collisionBoundary[boundary].y = this.position.y  + this.collisionBoundary[boundary].yOffset;
    }
}

Enemy.prototype.chooseSpriteDirection = function(){
    ce('enemy chooseSpriteDirection');


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
    ce('enemy calculateNavPoints');
    var i = 0,
        navPoints = [];
    while (i < navNodes.length) {
        navPoints[i] = this.calculateWorldPosition(navNodes[i]);
        i++;
    }
    return navPoints;
}

Enemy.prototype.assignPath = function (enemyPaths){
    ce('enemy assignPath');

    var vector = {},
        vectorMagnitude,
        normal = {};
    this.navData.directions = [];
    //randomly pick a possible enemy path in the current map
    this.navData.navNodes = enemyPaths[Math.floor(Math.random() * enemyPaths.length)];

    this.navData.currentNodeIndex = 0;
    this.navData.currentNode = this.navData.navNodes[0];
    this.navData.targetNode = this.navData.navNodes[1];
    for (var i = 1; i < this.navData.navNodes.length; i++){
        vector = {
            x: this.navData.navNodes[i].x - this.navData.navNodes[i-1].x,
            y: this.navData.navNodes[i].y - this.navData.navNodes[i-1].y
        };
        vectorMagnitude = Math.sqrt(vector.x * vector.x + vector.y * vector.y)

        this.navData.directions.push({
            x: vector.x / vectorMagnitude,
            y: vector.y /  vectorMagnitude
        });

    };
    this.direction = this.navData.directions[0];
    this.tile = this.navData.currentNode;

    this.calculatePosition();
    this.navData.navPoints = this.calculateNavPoints(this.navData.navNodes);
    this.navData.targetPoint = this.navData.navPoints[1];

}

GamePiece.prototype.navigate = function(navData, result){
    ce('enemy navigate');
    var distanceToNextNavPoint =
        (navData.targetPoint.x - this.collisionBoundary.navigatory.x) *
        (navData.targetPoint.x - this.collisionBoundary.navigatory.x) +
        (navData.targetPoint.y - this.collisionBoundary.navigatory.y) *
        (navData.targetPoint.y - this.collisionBoundary.navigatory.y);
    var radiiSum = (navData.r + this.collisionBoundary.navigatory.r) *
         (navData.r + this.collisionBoundary.navigatory.r);
    if (distanceToNextNavPoint < radiiSum) {

        result.call(this);
    }


}

Enemy.prototype.reachedTarget = function(){
    ce('enemy reachedTarget');

    if (this.navData.currentNodeIndex < this.navData.directions.length){
        this.navData.currentNodeIndex++;
        this.navData.currentNode = this.navData.targetNode;
        this.navData.targetNode = this.navData.navNodes[this.navData.currentNodeIndex];
        this.navData.targetPoint = this.navData.navPoints[this.navData.currentNodeIndex];
        this.direction = this.navData.directions[this.navData.currentNodeIndex-1];
    } else {
        this.navData.currentNodeIndex = 0;
        this.navData.currentNode = this.navData.navNodes[0];
        this.navData.targetNode = this.navData.navNodes[1];
        this.navData.targetPoint = this.navData.navPoints[1];
        this.direction = this.navData.directions[0];
        this.tile = this.navData.navNodes[0];
        //this.tile = this.currentNode;
    }

}

Enemy.prototype.death = function(){
    ce('enemy death');
    for(var i = 0; i < allEnemies.length; i++){
        if (this === allEnemies[i]){
            allEnemies.splice(i,1);
        }
    }

    if (allEnemies.length === 0){
        for (var i = 1; i < 6; i++){
            allEnemies.push(function(){
                return new Enemy( -1, i+1, 3, 0.5*i, 1);
            }());

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
    ce('enemy becomeSteed');


  this.collisionBoundary.primary.r1 = this.collisionBoundary.primary.r;
  this.collisionBoundary.primary.r = 0;
  this.collisionBoundary.secondary.r1 = this.collisionBoundary.secondary.r;
  this.collisionBoundary.secondary.r = 0;
  this.speed = 0;
  this.steedOf = true;
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
    ce('enemy renderRider');
    ctx.drawImage(Resources.get(this.spriteFore),
    this.sx, this.sy, this.sWidth, this.sHeight,
    this.position.x, this.position.y,
    this.spriteDimensions.x, this.spriteDimensions.y);
}

Enemy.prototype.renderNavPoints = function(){
    ce('enemy renderNavPoints');
    for (navPoint in this.navData.navNodes){

      ctx.beginPath();
      ctx.arc(this.navData.navPoints[navPoint].x, this.navData.navPoints[navPoint].y, this.navData.r, 0, 2 * Math.PI, false);
      ctx.stroke();
    }
}