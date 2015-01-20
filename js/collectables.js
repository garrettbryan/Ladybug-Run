/*
Collectables have a number of characteristics. They have a certain amount of points associated with them when picked up, which will increase the score, and also can be thrown to attack enemies which will reduce the score because the collectable is no longer carried by the player.
*/
var Collectable = function(collectable) {
  this.scale = 0.25;
  this.speed = 0;
  GamePiece.call(this);

  this.sprite = collectable.sprite;
  this.elementName = collectable.elementName;
  this.points = collectable.points;
  this.projectile = false;


  this.collisionBoundary.primary.collidesWith = [
    Player
  ];
};

Collectable.prototype = Object.create(GamePiece.prototype);
Collectable.prototype.constructor = Collectable;

/*
The init method places a collectable onto the level map on a walkable tile. Then calculates the position so the update function has an initial value.
*/
Collectable.prototype.init = function() {
  this.placeRandomly(game.world.currentMap);
  this.draw = true;
  this.calculatePosition();
}

/*
If a collectable has been picked up then the update function uses the carriers tile data. If the collectable is not attached then the position is determined by the previous position and any position change due to a speed and direction value. If the speed or direction is 0 then the collectable will be in its default state motionless on a tile.
*/
Collectable.prototype.update = function(dt) {
  if (this.carriedBy) {
    this.tile = this.carriedBy.tile;
    this.calculatePosition();
  } else {
    this.position.x = this.position.x + this.speed * dt * this.direction.x;
    this.position.y = this.position.y + this.speed * dt * this.direction.y;
  }
};

/*
Randomly places the collectables onto a walkable tile for any map.
*/
Collectable.prototype.placeRandomly = function(currentMap) {
  this.tile = {
    x: Math.floor(Math.random() * (currentMap.totalTiles.x)),
    y: Math.floor(Math.random() * (currentMap.totalTiles.y)),
  };
  if (currentMap.walkMap[Math.floor(this.tile.y) * game.world.currentMap.totalTiles.x + Math.floor(this.tile.x)] === 0) {
    this.placeRandomly(currentMap);
  } else {
    console.log(this.tile);
  }
}