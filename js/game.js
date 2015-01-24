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

  //Collectables and Enemies are spawned when the game is started.
  this.allCollectables = [];

  this.allEnemies = [];
  this.messageBugs = new BugMessage();

  this.allMenus = [];
  this.allMenus.push(new Menu("title"));
  for (var i = 0; i < titleMenu.length; i++){
    console.log(titleMenu[i]);
    console.log(this.allMenus[0]);
    this.allMenus[0].add(titleMenu[i]); //TODO is this redering
  }

}

Game.prototype.title = function() {
  cl('game title');
  this.world.currentMap = this.world.randomMap;
}

Game.prototype.nextLevel = function() {
  if (!this.game.cutscene){
      this.level++;
  }
  this.world.cutscene = !this.world.cutscene;
  this.player.active = !this.player.active;
}

Game.prototype.startLevel = function(restart) {
  cl("game startLevel" + this.level);
  if (restart) {
    this.level = 1;
    this.score = 0;
  }

//  this.world.cutscene(this.player.active);
  this.world.playLevel(true);


  // TODO create enemies;
  //this.enemy.init();
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

Game.prototype.renderTitle = function() {
  cl("game renderTitle");
  ctx.save();
  ctx.font = 'Bold 300px Sans-Serif';
  ctx.fillStyle = '#667AD9';
  ctx.shadowColor = '#000';
  ctx.shadowOffsetX = 5;
  ctx.shadowOffsetY = 5;
  ctx.shadowBlur = 5;
  ctx.textBaseline = 'Top';
  ctx.fillText('Ladybug Run', game.world.canvasSize.x * 0.025, game.world.canvasSize.y * 0.3);
  ctx.font = 'Italic 100px Sans-Serif';
  ctx.fillText('An Epic Five Levels', game.world.canvasSize.x * 0.025, game.world.canvasSize.y * 0.8);
  ctx.font = 'Italic 50px Sans-Serif';
  //ctx.fillText('By: Garrett Bryan', game.world.canvasSize.x * 0.025 , game.world.canvasSize.y * 0.9);
  ctx.fillText('Press the Spacebar to Play',game.world.canvasSize.x * 0.025 , game.world.canvasSize.y * 0.9);
  ctx.restore();
}

Game.prototype.renderDifficultyOption = function() {
  cl("game renderDifficultyOption");
  ctx.save();
  ctx.font = 'Italic 80px Sans-Serif';
  ctx.fillStyle = '#fff';
  ctx.shadowColor = '#000';
  ctx.shadowOffsetX = 10;
  ctx.shadowOffsetY = 10;
  ctx.shadowBlur = 10;
  ctx.textBaseline = 'Top';
  ctx.font = 'Italic 30px Sans-Serif';
  ctx.fillText('Difficulty', game.world.canvasSize.x / 4 , game.world.canvasSize.y / 2 + 50 + 50);
  ctx.fillText('Press the Spacebar to Select', game.world.canvasSize.x / 4 , game.world.canvasSize.y / 2 + 50 + 50 + 50);
  ctx.restore();
}



/*Game.prototype.startLevel = function(reset) {
    if (reset) {
        this.level = 1;
        this.lives = 3;
        this.score = 0;
    }

    this.world.tileMap = this.world.maps[this.level-1];
    this.active = true;
    //Enemies from previous level are reused, only new ones are added
//    for (var enemyIndex = this.allEnemies.length; enemyIndex < this.numberOfEnemies * this.level ; enemyIndex++) {
//        this.allEnemies.push(new Enemy('images/enemy-bug.png'));
//    }
    for (var i = 1; i < 6; i++){
        allEnemies.push(new Enemy( -1, i+1, 3, 0.5*i, 1));
        cl(allEnemies[0]);
    }
};

Game.prototype.init = function(level, lives, score) {
    //world variable is filled by the data in engine.js
    //and used by the entities;
    this.world = new World();

    this.lives = lives;
    this.level = level;
    this.numberOfEnemies = 1;

    //Enemies are spawned when the game is started.
    this.allEnemies = [];

    this.player = new Player('images/char-boy.png');
    this.extras = [];
    this.extras.push (new Actor('images/char-cat-girl.png'));
    this.extras.push (new Actor('images/char-pink-girl.png'));
    this.extras.push (new Actor('images/char-horn-girl.png'));
    this.extras.push (new Actor('images/char-princess-girl.png'));
    this.extras.push (new Actor('images/Heart.png'));
};

Game.prototype.checkCollisions = function()  {
    if (this.running === 1) {
        //Collision boundary. Not really precise, but will do for
        //this game
        var collisionZone = 50;
        this.allEnemies.forEach(function(enemy) {
            if ((Math.abs(enemy.x - game.player.x) < collisionZone) &&
                (Math.abs(enemy.y - game.player.y) < collisionZone)) {
                    this.lives--;
                    if (this.lives === 0) {
                        game.startLevel(true);
                    }
                    this.player.tileX = this.world.tileMap.playerStartTile.x;
                    this.player.tileY = this.world.tileMap.playerStartTile.y;
                }
        },this);
    }
}

Game.prototype.victorySequence = function() {
    //End sequence. Not very flexible, but it's one-off
    this.running = 0;
    this.world.tileMap = this.world.victoryMap;
    //Characters will be placed on the grass tiles of victoryMap
    var endTiles = this.world.getTilesOfType('g');
    this.player.tileX = endTiles[0].x;
    this.player.tileY = endTiles[0].y;
    this.extras[0].init(endTiles[3]);
    this.extras[1].init(endTiles[4]);
    this.extras[2].init(endTiles[5]);
    this.extras[3].init(endTiles[2]);
    this.extras[4].init(endTiles[1]);
    //Hide enemies
    this.allEnemies.forEach(function(enemy) {
        enemy.draw = false;
    } );
};
*/