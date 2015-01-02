var Collectable = function(posX, posY, speed, scale, type) {
  GamePiece.call(this, posX, posY, speed, scale);
  this.center.height = 125 * this.scale;
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
  ]
    this.type = type;
    this.sprite = types[this.type].sprite;
    this.name = types[this.type].name;
    this.direction = {
      'x': 0,
      'y': 0
    };
    this.collisionCircles = [
      {
        'name': 'primary',
        'affects': [
          Player,
          Enemy
          ],
        'r': 30 * this.scale,
        'x': 0,
        'y': 0,
        'xOffset': this.center.width,
        'yOffset': this.center.height
      }
    ]

};

Collectable.prototype = Object.create(GamePiece.prototype);
Collectable.prototype.constructor = Collectable;

Collectable.prototype.follow = function(player){ //TODO

}

Collectable.prototype.attach = function(player){
  this.collisionCircles[0].x = 0;
  this.collisionCircles[0].y = 0;
  this.collisionCircles[0].r1 = this.collisionCircles[0].r;
  this.collisionCircles[0].r = 0;
  this.attachedTo = 1;
}

Collectable.prototype.update = function(dt) {
    this.x = this.speed * this.direction.x*dt + this.x;
    this.y = this.speed * this.direction.y*dt + this.y;

    this.collisionCircles[0].x = this.x + this.collisionCircles[0].xOffset;
    this.collisionCircles[0].y = this.y  + this.collisionCircles[0].yOffset;

//    console.log(this.y);
//    this.sprite = this.types[this.type].sprite;
//    this.name = this.types[this.type].name;
}