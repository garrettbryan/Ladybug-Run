/*
The game object acts as a container for all the game components.  game.js contains all the game settings such as number of enemies, collectables, characters, etc.
*/
var Game = function() {
  cl('game new');
  this.refresh = true;
  this.menu = 0;
  this.playerName;
  this.victory = false;
  this.defeat = false;
  this.level = 0;
  this.topScore = 0;
  this.score = 0;
  this.passedPlayers = 0;
  this.deadPlayers = 0;
  this.active = false;
  this.world = {};
  this.controlling = {};
  this.numberOfPlayerCharacters = 4;
  this.allPlayers = [];
  this.boss = {};
  this.numberOfEnemies = 25;
  this.allEnemies = [];
  this.numberOfCollectables = 7;
  this.allCollectables = [];
  this.numberOfGoals = 4;
  this.allGoals = [];
  this.numberOfTransporters = 2;
  this.allTransporters = [];
  this.currentMenu = {};
  this.allMenus = [];
  this.messageBugs = {};
};

/*
The game init runs at the beginning of the game. It creates all the objects the game may need. No other objects are created or destroyed. Objects are active or inactive. Each object may be reused throughout the game.
*/
Game.prototype.init = function(level, score) {
  cl("game init");
  this.level = level;
  this.score = score;

  this.world = new World();

  for (var p = 0; p < this.numberOfPlayerCharacters; p++){
    this.allPlayers[p] = new Player(characters[p+1],Math.random() * 1 + 0.5); //bugboy is element 1 of the characters array.
    //console.log(this.allPlayers[p]);
  }
  this.controlling = this.allPlayers[0];

  this.boss = new Boss();
  this.boss.armaments();
  this.boss.cutscene();
  //console.log(this.boss);

  for (var j = 0; j < this.numberOfEnemies; j++){
    this.allEnemies[j] = (new Enemy(Math.random() * 2.5 + 0.5));
    //console.log(this.allEnemies[j]);
  }

  for (var i = 0; i < this.numberOfCollectables; i++) {
    this.allCollectables.push(new Collectable(collectables[i]));
    //console.log(this.allCollectables[i]);
  }

  this.messageBugs = new BugMessage();
  //console.log(this.messageBugs);

  for (var t = 0; t <  this.numberOfTransporters; t++){
    this.allTransporters.push(new Transporter());
    //console.log(this.allTransporters[t]);
  }

  for (var g = 0; g < this.numberOfGoals; g++){
    this.allGoals.push(new Goal());
    //console.log(this.allGoals[g])
  }

  this.allMenus.push(new Menu("title"));
  this.allMenus.push(new Menu("cutscene"));
  this.allMenus.push(new Menu("defeat"));
  this.allMenus.push(new Menu("victory"));
  //console.log(this.allMenus);

  for (var i = 0; i < titleMenu.length; i++){
    this.allMenus[0].add(titleMenu[i]); //TODO is this redering
  }
  for (var i = 0; i < cutsceneMenu.length; i++){
    this.allMenus[1].add(cutsceneMenu[i]);
  }
  for (var i = 0; i < defeatMenu.length; i++){
    this.allMenus[2].add(defeatMenu[i]);
  }
  for (var i = 0; i < victoryMenu.length; i++){
    this.allMenus[3].add(victoryMenu[i]);
  }
  this.currentMenu = this.allMenus[0];
}

/*
startLevel does what it says and starts the current level or cutscene.
*/
Game.prototype.startLevel = function(restart) {
  //console.log("game start level " + this.level);
  if (restart) {
    this.level = 0;
    this.score = 0;
  }
  this.world.activateComponents(game.refresh);
}

Game.prototype.update = function() {
  //console.log('game update')
  this.nextAvailablePlayer();
  this.playerName = this.allPlayers.length ? this.controlling.elementName : "";
}
/*
nextLevel increments the level and adjusts the cutscene boolean. All playable levels have a begining cutscene.
*/
Game.prototype.nextLevel = function() {
  console.log("game nextLevel");
  if (this.level === 0){
    this.level++;
    this.world.cutscene = false;
  } else if (!this.world.cutscene){
      this.level++;
  }
  this.world.cutscene = !this.world.cutscene;
  this.passedPlayers = 0;
}

Game.prototype.updateMenu = function(){
  //console.log('game updateMenu');
  if (this.world.cutscene){
//    this.currentMenu = this.allMenus[1];
  }
}

Game.prototype.nextAvailablePlayer = function(){
  //console.log('game nextAvailablePlayer');
  if (this.controlling.dead || this.controlling.passed){
    for (var i = 0; i < this.allPlayers.length; i++){
      if (!this.allPlayers[i].dead && !this.allPlayers[i].passed) {
        this.controlling = this.allPlayers[i];
        break;
      }
    }
  }
}

Game.prototype.playerPassedReset = function() {
  //console.log('game playerPassedReset');
  this.allPlayers.forEach(function (player){
    player.passed = false;
  });
}


Game.prototype.renderStatusBar = function() {
  //console.log("game renderStatusBar");
  ctx.save();
  ctx.fillStyle = '#000';
  ctx.font = 'Italic 30px Sans-Serif';
  ctx.textBaseline = 'Top';
  ctx.fillText('Player: ' + this.playerName, 5, 30);
  ctx.fillText('Score: ' + this.score, game.world.canvasSize.x * 3 / 4, 30);
  ctx.fillText('Time: ' + this.world.worldTime.toFixed(2), game.world.canvasSize.x / 4, 30);
  ctx.fillText('Level: ' + this.level, game.world.canvasSize.x / 2, 30);
  ctx.restore();
}

Game.prototype.notControlling = function(player) {
  //console.log('game notControlling');
  return this.controlling !== player;
}

Game.prototype.checkDefeat = function() {
  //console.log('game checkDefeat');
  if(this.allDead()){
    this.world.init();
    this.world.failure();
    this.currentMenu = this.allMenus[2];
    return true;
  }
}

Game.prototype.allDead = function() {
  //console.log('game allDead');
  var result = false;
  if (this.deadPlayers === game.allPlayers.length) {
    result = true;
    this.deadPlayers = 0;
    this.allPlayers.forEach(function(player){
      player.dead = false;
    });
  }
  return result;
}

Game.prototype.playersPassed = function() {
  //console.log('game playersPassed');
  var result = false;
  ////console.log(this.deadPlayers);
  ////console.log(this.passedPlayers);
  if (this.deadPlayers + this.passedPlayers === game.allPlayers.length){
    result = true;
    this.currentMenu = this.allMenus[1];
  }
  return result;
}

Game.prototype.resurectPlayers = function(){
  this.deadPlayers = 0;
  this.allPlayers.forEach(function(player){
    player.dead = false;
  });
}