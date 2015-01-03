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

Transporter.prototype.update = function(){
    this.x = -101/2  * this.scale + this.tileX * 101 + 101/2;
    this.y = - 120 * this.scale + this.tileY * 83 + 83;

    this.collisionCircles[0].x = this.x + this.collisionCircles[0].xOffset;
    this.collisionCircles[0].y = this.y + this.collisionCircles[0].yOffset;

    for (var player in allPlayers){
      this.collisionCheck(allPlayers[player]),this.transporters);
    }
}

Transporter.prototype.transport = function(p){
    p.tileX = this.tileX + 1 * this.direction.x;
    p.tileY = this.tileY + 1 * this.direction.y;
    p.direction = this.direction;
    for (var i = 1; i < transporters.length; i++){
        if (transporters[i] === this){
            console.log(transporters.length);
            transporters.splice(i,1);
            transporters.push(this);
            allPlayers[0] = p;
        }
    }
}