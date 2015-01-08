var Boss = function( posX, posY, speed, scale){
  Player.call(this, posX, posY, speed, scale, 0);

  allEnemies.push(new Enemy(posX, posY, speed, 2, 1));
    this.moveAI = ['left', 'right', 'up', 'down', 'space']
    this.moveInterval = 1;
    for(var i = 0; i < 7; i++) {
    var c = new Collectable(posX, posY, 500, 0.3, 6);
    allCollectables.push(c);
    this.pickup(c);
  }
  this.ride(allEnemies[allEnemies.length-1]);

}

Boss.prototype = Object.create(Player.prototype);
Boss.prototype.constructor = Boss;



Boss.prototype.move = function(dt) {
  this.moveInterval -= dt;
  console.log(dt);
  console.log(this.moveInterval);
  if (this.moveInterval < 0){
    this.handleInput(this.moveAI[Math.floor(Math.random()*5)])
    this.moveInterval = Math.random();
  }
}