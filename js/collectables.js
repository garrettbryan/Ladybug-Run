var Collectable = function(posX, posY, speed, scale, type) {
  GamePiece.call(this, posX, posY, speed, scale);
  var types = {
    'Blue': {
      name: 'Blue Gem',
      sprite: 'images/Gem Blue.png',
    },
    'Green': {
      name: 'Green Gem',
      sprite: 'images/Gem Green.png',
    },
    'Orange': {
      name: 'Orange Gem',
      sprite: 'images/Gem Orange.png',
    },
    'Heart': {
      name: 'Heart',
      sprite: 'images/Heart.png',
    },
    'Key': {
      name: 'Key',
      sprite: 'images/Key.png',
    },
    'Star': {
      name: 'Star',
      sprite: 'images/Star.png',
    },
    'Rock': {
      name: 'Rock',
      sprite: 'images/Rock.png',
    },
  }
    this.type = type;
    this.sprite = types[this.type].sprite;
    this.name = types[this.type].name;
    this.collisionCircles = [
      {
        'name': 'main',
        'r': 110 * this.scale,
        'x': 0,
        'y': 0,
        'xOffset': 0,
        'yOffset': 0
      }
    ]

};

Collectable.prototype = Object.create(GamePiece.prototype);
Collectable.prototype.constructor = Collectable;

Collectable.prototype.follow = function(player){ //TODO

}

Collectable.prototype.attach = function(player){
  this.collisionCircles[0].r1 = this.collisionCircles[0].r;
  this.collisionCircles[0].r = 0;
  this.attachedTo = player;
}