var Game = function() {
  cl('game new');
  this.lives = 0;
  this.menu = 0;
  this.level = 0;
  this.topScore = 0;
  this.score = 0;
  this.numberOfEnemies = 0;
  this.active = false;
  this.world = {};
  this.player = {};
  this.allCharacters = {};
  this.allEnemies = {};
  this.allCollectables = {};
};


Game.prototype.init = function(level, score) {
  cl("game init");
  this.level = level;
  this.score = score;

  this.world = new World();

  this.allPlayers = [];
  this.player = new Player(characters[1]);

  //this.enemy = new Enemy();
  this.boss = new Boss();

  this.allGoals = [];

  //Collectables and Enemies are spawned when each level is started.
  this.allCollectables = [];

  this.allEnemies = [];
  this.messageBugs = new BugMessage();

  this.allMenus = [];
  this.allMenus.push(new Menu("title"));
  for (var i = 0; i < titleMenu.length; i++){
//    console.log(titleMenu[i]);
//    console.log(this.allMenus[0]);
    this.allMenus[0].add(titleMenu[i]); //TODO is this redering
  }

}

Game.prototype.title = function() {
  cl('game title');
  this.world.currentMap = this.world.randomMap;
}

Game.prototype.nextLevel = function() {
  if (this.level === 0){
    this.level++;
    this.world.cutscene = false;
  } else if (!this.world.cutscene){
      this.level++;
  }
  this.world.cutscene = !this.world.cutscene
  this.allCollectables = [];
  this.allGoals = [];
  this.allbugs = [];
  //this.allEnemies = [];
}

Game.prototype.startLevel = function(restart) {
  cl("game start Level " + this.level);
  if (restart) {
    this.level = 0;
    this.score = 0;
  }

  this.world.playLevel(true);

}

Game.prototype.victory = function() {
  cl("game victory");
  this.world.currentMap = this.world.victoryMap;
}

Game.prototype.failure = function() {
  cl("game failure");
  this.world.currentMap = this.world.failureMap;
}

Game.prototype.renderStatusBar = function() {
  cl("game renderStatusBar");
  ctx.save();
  ctx.fillStyle = '#000';
  ctx.font = 'Italic 30px Sans-Serif';
  ctx.textBaseline = 'Top';
  ctx.fillText('Score: ' + this.score, game.world.canvasSize.x * 3 / 4, 30);
  ctx.fillText('Time: ' + this.world.worldTime.toFixed(2), game.world.canvasSize.x / 4, 30);
  ctx.fillText('Level: ' + this.level, game.world.canvasSize.x / 2, 30);

  ctx.restore();
}