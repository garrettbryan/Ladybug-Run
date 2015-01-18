var Boss = function(){
  Player.call(this, characters[0]);
}

Boss.prototype = Object.create(Player.prototype);
Boss.prototype.constructor = Boss;

Boss.prototype.init = function(tile) {

  this.tile = tile;
  this.name = "Boss";
  this.moveAI = ['left', 'right', 'up', 'down', 'space'];
  //this.moveAI = ['space'];
  this.moveInterval = 1;
  this.speed = 600;
  var e = new Enemy();
  this.ride(e);
  game.allEnemies.push(e);

  for(var i = 0; i < 7; i++) {
    //var c = new Collectable(collectables[6]);
    //c.speed = 600;
    //game.allCollectables.push(c);
    //this.pickup(c);
  }
}

GamePiece.prototype.target = function(player){
  ce('target');

  var vector = {},
    vector1 = this.calculateWorldPosition(this.tile);
    vector2 = this.calculateWorldPosition(player.tile);
    vectorMagnitude = 0,
    normal = {};

  vector = {
      x: vector2.x - (vector1.x),
      y: vector2.y - (vector1.y)
  };
  vectorMagnitude = Math.sqrt(vector.x * vector.x + vector.y * vector.y);

  this.direction = {
      x: vector.x / vectorMagnitude,
      y: vector.y / vectorMagnitude
  };

  ce(this.direction);

};

Boss.prototype.move = function(dt) {
  this.moveInterval -= dt;
  this.target(game.player);

  if (this.moveInterval < 0){
    this.handleInput(this.moveAI[Math.floor(Math.random()*5)])
    this.moveInterval = Math.random();
  }
}