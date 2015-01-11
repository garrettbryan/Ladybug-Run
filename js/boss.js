var Boss = function( speed, scale){
  Player.call(this, speed, scale, characters[0]);
}

Boss.prototype = Object.create(Player.prototype);
Boss.prototype.constructor = Boss;

Boss.prototype.init = function(tile) {
  console.log('initialize Boss');
  this.tile = tile;
  this.moveAI = ['left', 'right', 'up', 'down', 'space'];
  this.moveInterval = 1;
  //allEnemies.push(new Enemy(speed, 2,));

  //for(var i = 0; i < 7; i++) {
  //  var c = new Collectable(x, y, 500, 0.3, 6);
  //  allCollectables.push(c);
  //  this.pickup(c);
  //}
  //this.ride(allEnemies[allEnemies.length-1]);
}

Boss.prototype.move = function(dt) {
  this.moveInterval -= dt;
  console.log(dt);
  console.log(this.moveInterval);
  if (this.moveInterval < 0){
    this.handleInput(this.moveAI[Math.floor(Math.random()*5)])
    this.moveInterval = Math.random();
  }
}