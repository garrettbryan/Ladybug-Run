var Collectable = function(posX, posY, speed, scale, type) {
  GamePiece.call(this, posX, posY, speed, scale);
  var types = [
    {
      name: 'Blue Gem',
      sprite: 'images/Gem Blue.png',
    },
    {
      name: 'Green Gem',
      sprite: 'images/Gem Green.png',
    },
    {
      name: 'Orange Gem',
      sprite: 'images/Gem Orange.png',
    },
    {
      name: 'Heart',
      sprite: 'images/Heart.png',
    },
    {
      name: 'Key',
      sprite: 'images/Key.png',
    },
    {
      name: 'Star',
      sprite: 'images/Star.png',
    },
    {
      name: 'Rock',
      sprite: 'images/Rock.png',
    },
  ];
  this.type = type;
  this.sprite = types[this.type].sprite;
  this.name = types[this.type].name;

  this.collisionBoundary.primary.collidesWith.people = true;

};

Collectable.prototype = Object.create(GamePiece.prototype);
Collectable.prototype.constructor = Collectable;

Collectable.prototype.follow = function(player){ //TODO

}

Collectable.prototype.attach = function(player){
  this.collisionBoundary.primary.x = 0;
  this.collisionBoundary.primary.y = 0;
  this.collisionBoundary.primary.r1 = this.collisionBoundary.primary.r;
  this.collisionBoundary.primary.r = 0;
  this.attachedTo = player;
}

Collectable.prototype.update = function(dt) {
    this.position.x = this.speed * this.direction.x * dt + this.position.x;
    this.position.y = this.speed * this.direction.y * dt + this.position.y;

    this.collisionBoundary.primary.x = this.position.x + this.collisionBoundary.primary.xOffset;
    this.collisionBoundary.primary.y = this.position.y  + this.collisionBoundary.primary.yOffset;

//    console.log(this.y);
//    this.sprite = this.types[this.type].sprite;
//    this.name = this.types[this.type].name;
}