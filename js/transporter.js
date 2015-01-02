var Transporter = function(posX, posY) {
  console.log(this);
  GamePiece.call(this, posX, posY, 1, 1);

  this.height = 125 * this.scale;
  this.sprite = 'images/Selector.png';
  this.name = 'Selector';
  this.collisionCircles = [
    {
      'name': 'primary',
      'affects': [
        Player
        ],
      'r': 30 * this.scale,
      'x': 0,
      'y': 0,
      'xOffset': this.width / 2,
      'yOffset': this.height
    }
  ]

};

Transporter.prototype = Object.create(GamePiece.prototype);
Transporter.prototype.constructor = Transporter;

