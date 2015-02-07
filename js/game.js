/*
The game object acts as a container for all the game components.  game.js contains all the game settings such as number of enemies, collectables, characters, etc.
*/
var Game = function() {
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
The game init runs at the beginning of the game. It creates all the objects the game may need. No other objects are created or destroyed. Objects are active or inactive. If an object is no longer used and its active and draw property is set to false.
*/
Game.prototype.init = function(level, score) {
  this.level = level;
  this.score = score;

  this.world = new World();

  for (var p = 0; p < this.numberOfPlayerCharacters; p++){
    this.allPlayers[p] = new Player(characters[p+1],Math.random() * 1 + 0.5);
  }
  this.controlling = this.allPlayers[0];

  this.boss = new Boss();
  this.boss.armaments();
  this.boss.cutscene();

  for (var j = 0; j < this.numberOfEnemies; j++){
    this.allEnemies[j] = (new Enemy(Math.random() * 2.5 + 0.5));
  }

  for (var i = 0; i < this.numberOfCollectables; i++) {
    this.allCollectables.push(new Collectable(collectables[i]));
  }

  this.messageBugs = new BugMessage();

  for (var t = 0; t <  this.numberOfTransporters; t++){
    this.allTransporters.push(new Transporter());
  }

  for (var g = 0; g < this.numberOfGoals; g++){
    this.allGoals.push(new Goal());
  }

  this.allMenus.push(new Menu("title"));
  this.allMenus.push(new Menu("cutscene"));
  this.allMenus.push(new Menu("defeat"));
  this.allMenus.push(new Menu("victory"));

  for (var i = 0; i < titleMenu.length; i++){
    this.allMenus[0].add(titleMenu[i]);
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
  if (restart) {
    this.level = 0;
    this.score = 0;
  }
  this.world.activateComponents(game.refresh);
}

/*
If a character dies then select the next available player character
*/
Game.prototype.update = function() {
  this.nextAvailablePlayer();
  this.playerName = this.allPlayers.length ? this.controlling.elementName : "";
}

/*
nextLevel increments the level and adjusts the cutscene boolean. All playable levels have a begining cutscene.
*/
Game.prototype.nextLevel = function() {
  if (this.level === 0){
    this.level++;
    this.world.cutscene = false;
  } else if (!this.world.cutscene){
    this.level++;
  }
  this.world.cutscene = !this.world.cutscene
  this.passedPlayers = 0;

}

/*
Set the game.controlling to be the next available player character.
*/
Game.prototype.nextAvailablePlayer = function(){
  if (this.controlling.dead || this.controlling.passed){
    for (var i = 0; i < this.allPlayers.length; i++){
      if (!this.allPlayers[i].dead && !this.allPlayers[i].passed) {
        this.controlling = this.allPlayers[i];
        break;
      }
    }
  }
}

/*
Reset the player.passed property to false. use when begining a new level.
*/
Game.prototype.playerPassedReset = function() {
  this.allPlayers.forEach(function (player){
    player.passed = false;
  });
}


Game.prototype.renderStatusBar = function() {
  if (!this.world.cutscene && this.level !== 0){
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
}

/*
return true if player character is not being controlled.
*/
Game.prototype.notControlling = function(player) {
  return this.controlling !== player;
}

/*
Check if all player characters are dead. and start the failure level.
*/
Game.prototype.checkDefeat = function() {
  if(this.allDead()){
    this.world.init();
    this.world.failure();
    this.currentMenu = this.allMenus[2];
    return true;
  }
}

/*
if all player characters are dead return true.
*/
Game.prototype.allDead = function() {
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

/*
if all player characters pass return true.
*/
Game.prototype.playersPassed = function() {
  var result = false;
  if (this.deadPlayers + this.passedPlayers === game.allPlayers.length){
    result = true;
    this.currentMenu = this.allMenus[1];
  }
  return result;
}
