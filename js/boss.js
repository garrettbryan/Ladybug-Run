var Boss = function(){
  Player.call(this, characters[0]);
}

Boss.prototype = Object.create(Player.prototype);
Boss.prototype.constructor = Boss;

Boss.prototype.init = function(tile) {

  this.tile = tile;
  this.name = "Boss";
  //this.moveAI = ['left', 'right', 'up', 'down', 'space'];
  this.moveAI = ['space'];
  this.moveInterval = 1;
  game.allEnemies.push(new Enemy());

  for(var i = 0; i < 7; i++) {
    var c = new Collectable(6);
    c.speed = 500;
    game.allCollectables.push(c);
    this.pickup(c);
  }
  this.ride(game.allEnemies[game.allEnemies.length-1]);
}

GamePiece.prototype.target = function(player){
  ce('target');

  var vector = {},
    vectorMagnitude = 0,
    normal = {};

  vector = {
      x: player.position.x - (this.position.x),
      y: player.position.y - (this.position.y)
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
    this.handleInput(this.moveAI[0]);//Math.floor(Math.random()*5)])
    this.moveInterval = Math.random();
  }
}