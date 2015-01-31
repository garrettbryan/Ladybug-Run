var Transporter = function() {
  this.scale = 1;

  GamePiece.call(this);

  this.center = {
    x: 101/2,
    y: 125 * this.scale
  };

  this.sprite = 'images/Selector.png';
  this.name = 'Transporter';

  this.collisionBoundary = {
    'primary': {
      'collidesWith': [
        Player,
        Enemy,
        Collectable
      ],
      'r': 15 * this.scale,
      'offset': {
        'x': 0,
        'y': 0
      }
    }
  };
};

Transporter.prototype = Object.create(GamePiece.prototype);
Transporter.prototype.constructor = Transporter;

Transporter.prototype.init = function() {
  do {
    this.tile = {
      x: Math.floor(Math.random() * (game.world.currentMap.totalTiles.x - 1)),
      y: Math.floor(Math.random() * (game.world.currentMap.totalTiles.x - 1))
    }
  } while (this.tile.y === game.world.currentMap.playerStartTile.y ||
    this.tile.y === game.world.currentMap.goalTile[0].y);
  this.draw = true;
  this.active = true;
  this.calculatePosition();
}


Transporter.prototype.update = function() {
  for (var player in game.allPlayers){
    this.collisionCheck(game.allPlayers[player], "primary", this.transport);
  }
  for (var enemy in game.allEnemies){
    this.collisionCheck(game.allEnemies[enemy], "secondary", this.transport);
  }
  for (var collectable in game.allCollectables){
    this.collisionCheck(game.allCollectables[collectable], "primary", this.transport);
  }
}