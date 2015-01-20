var World = function() {
  cl('World new');

  this.currentMap = {};

  this.tiles = {
    //these values will be reset per level
    x: 0,
    y: 0
  };

  this.canvasSize = {};

  this.elevationOffset = 0;

  this.worldTime = 0;

  this.pixelsPerTileUnit = {
    x: 101,
    y: 83
  }

  this.pixelsPerElevationUnit = {
    x: 0,
    y: 40
  }

  this.pixelsPerBlockImg = {
    x: 101,
    y: 171
  };

  this.randomMap = {
    scrollingMap: {
      x: 0,
      y: 0
    },
    totalTiles: {
      x: 20,
      y: 11,
    },
    playerStartTile: {
      x: 0,
      y: 0
    },
    enemyPaths: [],
    textureMap: [],
    topoMap: [],
    walkMap: [],
  };
  for (var i = 0; i < 6; i++) {
    this.randomMap.enemyPaths.push([{
      x: this.randomMap.totalTiles.x,
      y: i + 2
    }, {
      x: -1,
      y: i + 2
    }]);
  }
  //console.log(this.randomMap.enemyPaths);


  this.possibleTiles = ['s', 'g', 'w'];
  for (var i = 0; i < (this.randomMap.totalTiles.x + 1) * (this.randomMap.totalTiles.y); i++) {
    this.randomMap.textureMap.push(this.possibleTiles[Math.floor(Math.random() * 3 * Math.random())]);
    this.randomMap.topoMap.push(0);
    this.randomMap.walkMap.push(1);
  }
  //console.log(this.randomMap.textureMap.length);

  this.failureMap = {

      totalTiles: {
        x: 5,
        y: 4
      },
      playerStartTile: {
        x: 2,
        y: 3
      },
      textureMap: [
        't', 't', 't', 't', 't',
        's', 's', 's', 's', 's',
        's', 's', 's', 's', 's',
        's', 's', 's', 's', 's'
      ],
      topoMap: [
        45, 45, 45, 45, 45,
        40, 40, 40, 40, 40,
        1, 1, 1, 1, 1,
        1, 1, 1, 1, 1
      ],
      walkMap: [
        0, 0, 0, 0, 0,
        0, 0, 0, 0, 0,
        1, 1, 1, 1, 1,
        1, 1, 1, 1, 1,
      ]
    },

    this.victoryMap = {
      totalTiles: {
        x: 9,
        y: 5
      },
      playerStartTile: {
        x: 2,
        y: 3
      },
      textureMap: [
        't', 't', 't', 't', 't', 't', 't', 't', 't',
        't', 't', 't', 't', 't', 't', 't', 't', 't',
        's', 's', 's', 's', 's', 's', 's', 's', 's',
        's', 's', 's', 's', 's', 's', 's', 's', 's',
        's', 's', 's', 's', 's', 's', 's', 's', 's'
      ],
      topoMap: [
        0, 0, 0, 0, 40, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0,
        32, 29, 26, 35, 35, 32, 29, 32, 29,
        29, 28, 24, 30, 31, 29, 28, 29, 28,
        19, 18, 22, 20, 22, 19, 18, 19, 18,
      ],
      walkMap: [
        0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0,
        1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1
      ]
    },

    this.maps = [{
      totalTiles: {
        x: 9,
        y: 10
      },
      playerStartTile: {
        x: 4,
        y: 8
      },
      enemyPaths: [
        [{
          x: -1,
          y: 7
        }, {
          x: 9,
          y: 7
        }],
        [{
          x: 9,
          y: 2
        }, {
          x: -1,
          y: 2
        }],
        [{
          x: -1,
          y: 3
        }, {
          x: 9,
          y: 3
        }],
        [{
          x: 9,
          y: 4
        }, {
          x: -1,
          y: 4
        }],
        [{
          x: -1,
          y: 5
        }, {
          x: 9,
          y: 5
        }],
        [{
          x: 9,
          y: 6
        }, {
          x: -1,
          y: 6
        }]
      ],

      textureMap: [
        'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w',
        'w', 'w', 'g', 'g', 'w', 'g', 'g', 'w', 'w',
        's', 's', 's', 's', 's', 's', 's', 's', 's',
        's', 's', 's', 's', 's', 's', 's', 's', 's',
        's', 's', 's', 's', 's', 's', 's', 's', 's',
        's', 's', 's', 's', 's', 's', 's', 's', 's',
        's', 's', 's', 's', 's', 's', 's', 's', 's',
        's', 's', 's', 's', 's', 's', 's', 's', 's',
        'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g',
        'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g'
      ],
      topoMap: [
        0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 1, 1, 0, 1, 1, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0,
        1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1
      ],
      walkMap: [
        0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 1, 1, 0, 1, 1, 0, 0,
        1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1
      ]
    }, {
      totalTiles: {
        x: 11,
        y: 5
      },
      playerStartTile: {
        x: 10,
        y: 3
      },
      enemyPaths: [
        [{
          x: 0,
          y: 1
        }, {
          x: 3,
          y: 0
        }, {
          x: 5,
          y: 3
        }, {
          x: 0,
          y: 2
        }],

      ],

      textureMap: [
        's', 's', 'g', 's', 'w', 'w', 's', 's', 's', 's', 's',
        's', 's', 'sb', 'g', 'g', 'w', 'w', 's', 'g', 's', 's',
        's', 's', 's', 's', 'g', 'g', 'w', 'w', 's', 's', 's',
        's', 's', 's', 's', 'g', 'g', 'g', 'w', 'w', 's', 's',
        'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'w', 'w', 'g'
      ],

      topoMap: [
        1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1
      ],
      walkMap: [
        1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1,
        1, 1, 0, 1, 1, 0, 0, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1
      ]
    }, {
      totalTiles: {
        x: 11,
        y: 11
      },

      playerStartTile: {
        x: 5,
        y: 7
      },

      enemyPaths: [
        [{
          x: 2,
          y: 2
        }, {
          x: 7,
          y: 2
        }, {
          x: 8,
          y: 8
        }, {
          x: 3,
          y: 8
        }, {
          x: 2,
          y: 2
        }]
      ],
      textureMap: [
        'w', 'w', 'w', 'w', 'w', 'w', 'wb', 'w', 'w', 'w', 'w',
        'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 's', 'w', 'w',
        'w', 'w', 's', 's', 's', 's', 's', 's', 's', 's', 'w',
        'w', 's', 's', 'g', 's', 's', 'g', 'g', 'w', 's', 'w',
        'wb', 'w', 's', 's', 'g', 'g', 'g', 's', 's', 's', 'w',
        'w', 'w', 's', 'g', 'g', 'g', 'g', 'g', 's', 'w', 'w',
        'w', 'w', 's', 's', 'g', 'g', 'g', 'g', 's', 'w', 'wb',
        'w', 'w', 's', 'g', 'g', 'g', 's', 'g', 's', 'w', 'w',
        'w', 'w', 'w', 's', 's', 's', 's', 's', 's', 's', 'w',
        'w', 'w', 'w', 'w', 'sb', 's', 's', 's', 's', 'w', 'w',
        'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w'
      ],

      topoMap: [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0,
        0, 0, 2, 2, 2, 2, 1, 1, 1, 1, 0,
        0, 1, 2, 2, 2, 2, 2, 1, 0, 1, 0,
        0, 0, 2, 2, 3, 3, 3, 2, 1, 1, 0,
        0, 0, 2, 2, 3, 4, 3, 2, 2, 0, 0,
        0, 0, 2, 2, 3, 3, 3, 2, 2, 0, 0,
        0, 0, 2, 2, 2, 2, 2, 2, 2, 0, 0,
        0, 0, 0, 2, 2, 2, 2, 2, 2, 1, 0,
        0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
      ],

      walkMap: [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0,
        0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0,
        0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0,
        0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0,
        0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0,
        0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0,
        0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0,
        0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0,
        0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
      ]
    }, {
      totalTiles: {
        x: 12,
        y: 12
      },

      playerStartTile: {
        x: 9,
        y: 9
      },
      enemyPaths: [
        [{
          x: 0,
          y: 0
        }, {
          x: 5,
          y: 5
        }, {
          x: 10,
          y: 5
        }]
      ],
      textureMap: [
        's', 'g', 's', 's', 's', 's', 's', 'g', 's', 's', 's', 's',
        's', 'g', 'g', 's', 's', 's', 's', 'g', 's', 's', 's', 's',
        's', 's', 'g', 'g', 's', 'sb', 'g', 'g', 's', 's', 's', 's',
        's', 's', 'g', 'g', 's', 's', 'g', 'g', 'g', 's', 's', 's',
        's', 'g', 'g', 'g', 'g', 'g', 'g', 's', 's', 's', 's', 's',
        's', 's', 's', 'sb', 'g', 'g', 'g', 'g', 'g', 's', 'g', 'g',
        's', 's', 's', 's', 'g', 'g', 'g', 'g', 's', 'gb', 'g', 'g',
        's', 's', 'g', 'g', 'g', 'g', 's', 'g', 'g', 'g', 's', 's',
        's', 's', 's', 'g', 'g', 's', 's', 's', 's', 's', 's', 's',
        's', 's', 's', 'g', 'g', 's', 's', 'sb', 's', 's', 's', 's',
        's', 's', 's', 's', 'g', 's', 's', 's', 's', 's', 's', 's',
        's', 'g', 's', 's', 's', 's', 's', 'g', 's', 's', 's', 's'
      ],

      topoMap: [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
      ],

      walkMap: [
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
      ]
    }, {
      totalTiles: {
        x: 11,
        y: 11
      },

      playerStartTile: {
        x: 6,
        y: 8
      },

      bossStartTile: {
        x: 5,
        y: 2
      },

      enemyPaths: [
        [{
          x: -1,
          y: 3
        }, {
          x: 5,
          y: 5
        }, {
          x: 11,
          y: 1
        }]
      ],
      textureMap: [
        's', 's', 's', 's', 's', 's', 's', 's', 'g', 'gb', 's',
        's', 's', 's', 's', 's', 's', 'sb', 's', 's', 'g', 's',
        'g', 'sb', 's', 's', 's', 's', 's', 's', 's', 's', 's',
        's', 's', 's', 'g', 's', 's', 'g', 'g', 's', 's', 's',
        'w', 'sb', 's', 'g', 'gb', 'g', 'g', 's', 's', 'w', 'w',
        'w', 's', 's', 's', 'g', 'g', 'g', 'g', 's', 'w', 'w',
        'w', 's', 's', 's', 'g', 'g', 'g', 'gb', 's', 'w', 'w',
        'w', 's', 's', 'g', 'g', 'g', 's', 'g', 's', 'w', 'w',
        'w', 'w', 'w', 's', 's', 's', 's', 's', 's', 's', 'w',
        'w', 'w', 'w', 'w', 'w', 'w', 's', 's', 's', 'w', 'w',
        'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w'
      ],

      topoMap: [
        7, 7, 8, 9, 10, 10, 11, 7, 7, 5, 5,
        7, 6, 5, 6, 5, 6, 7, 6, 5, 5, 4,
        6, 5, 2, 2, 2, 2, 2, 2, 2, 4, 6,
        5, 4, 2, 2, 2, 2, 2, 2, 0, 3, 5,
        0, 3, 2, 2, 2, 2, 2, 2, 2, 0, 0,
        0, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0,
        0, 1, 2, 2, 2, 2, 2, 2, 2, 0, 0,
        0, 1, 2, 2, 2, 2, 2, 2, 2, 0, 0,
        0, 0, 0, 2, 2, 2, 2, 2, 2, 1, 0,
        0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
      ],
      walkMap: [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0,
        0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0,
        0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0,
        0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0,
        0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0,
        0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0,
        0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0,
        0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
      ]
    }];
};

World.prototype.init = function() {
  cl("world init");
  this.maxElevation = this.maximumBlockElevation() * this.pixelsPerElevationUnit.y;
  this.canvasSize.x = this.currentMap.totalTiles.x * this.pixelsPerTileUnit.x;
  this.canvasSize.y = this.currentMap.totalTiles.y * this.pixelsPerTileUnit.y + this.pixelsPerBlockImg.y - this.pixelsPerTileUnit.y + this.maxElevation;
};


World.prototype.randomizeTileHeights = function(map) { //TODO add some texture to the landscape
  cl('world randomizeTileHeights');
  var newMap = [];
  map.forEach(function(tile) {
    newMap.push(tile + Math.random());
  });
  return newMap;
}

World.prototype.updateTime = function(dt) {
  cl('world updateTime');
  this.worldTime += 0;
  this.worldTime += dt;
}

/*
Calculates the screen space needed by each additional elevation unit
*/
World.prototype.maximumBlockElevation = function() {
  cl('world maximumBlockElevation');
  var max = this.currentMap.topoMap[0];
  for (var i = 1; i < this.currentMap.totalTiles.x; i++) {
    max = Math.max(max, this.currentMap.topoMap[i]);
  }
  //console.log(max);
  return max;
}

World.prototype.checkVictory = function() {
  cl('world checkVictory');
  if (game.active) {
    //cl(this.worldTime);
    if (this.worldTime > 20) {
      if (game.level < game.world.maps.length) {
        game.level++;
        game.score += 1000;
        this.worldTime = 0;
        this.init();
        game.startLevel(false);
        return true;
      } else {
        cl("victory sequence");
        this.init();
        game.failure();
        return true;
      }
    }

  }
  return false;
};


World.prototype.render = function(row, numCols) {
  cl('world render row:' + row);

  for (var col = 0; col < numCols; col++) {
    var resource,
      tileHeight = (this.currentMap.topoMap[col + numCols * row]);

    switch (this.currentMap.textureMap[col + numCols * row]) {
      case 'w':
      case 'wb':
        resource = 'images/water-block.png';
        break;
      case 'g':
      case 'gb':
        resource = 'images/grass-block.png';
        break;
      case 's':
      case 'sb':
        resource = 'images/stone-block.png';
        break;
      case 't':
        resource = 'images/white-block.png';
        break;
    }
    for (var z = 0; z <= tileHeight; z++) {
      ctx.drawImage(Resources.get(resource), col * this.pixelsPerTileUnit.x, row * this.pixelsPerTileUnit.y - this.pixelsPerElevationUnit.y * z + this.maxElevation);
    }
    switch (this.currentMap.textureMap[col + numCols * row]) {
      case 'wb':
      case 'gb':
      case 'sb':
        resource = 'images/Rock.png';
        ctx.drawImage(Resources.get(resource), col * this.pixelsPerTileUnit.x, row * this.pixelsPerTileUnit.y - this.pixelsPerElevationUnit.y * z + this.maxElevation);
        break;
    }

  }
}

World.prototype.createRandomMapColumn = function(currentMap) {
  var numRows = this.randomMap.totalTiles.y;
  for (var row = 0; row < 1; row++) {
    currentMap.textureMap.unshift(this.possibleTiles[Math.floor(Math.random() * 3 * Math.random())]);
    currentMap.topoMap.unshift(0);
    currentMap.walkMap.unshift(1);
    currentMap.textureMap.pop();
    currentMap.topoMap.pop();
    currentMap.walkMap.pop();
  }
}

World.prototype.generateRandomMap = function() {

}

World.prototype.renderTitleScreenMap = function(dt) {

  console.log(dt);
  this.randomMap.scrollingMap.x += dt;
  if (this.randomMap.scrollingMap.x >= 0) {
    this.createRandomMapColumn(this.randomMap);
    this.randomMap.scrollingMap.x = -1;
  }
  console.log(this.randomMap.scrollingMap.x);
  //tile side scrolling map for bug messages
  var numCols = this.randomMap.totalTiles.x,
    numRows = this.randomMap.totalTiles.y;
  for (var col = numCols; col >= 0; col--) {
    for (var row = 0; row < numRows; row++) {
      var resource,
        tileHeight = (this.randomMap.topoMap[col + numCols * row]);

      switch (this.randomMap.textureMap[col + numCols * row]) {
        case 'w':
        case 'wb':
          resource = 'images/water-block.png';
          break;
        case 'g':
        case 'gb':
          resource = 'images/grass-block.png';
          break;
        case 's':
        case 'sb':
          resource = 'images/stone-block.png';
          break;
      }


      //TODO IMPLEMENT RANDOMMAP GENERATOR
      for (var z = 0; z <= tileHeight; z++) {
        ctx.drawImage(Resources.get(resource), col * this.pixelsPerTileUnit.x + this.randomMap.scrollingMap.x * this.pixelsPerTileUnit.x, row * this.pixelsPerTileUnit.y - this.pixelsPerElevationUnit.y * z + this.elevationOffset);
      }
    }
  }
  //Testing different lighting styles by adding a black transparent rectangle.
  //ctx.save();
  //ctx.fillStyle = 'rgba(0,0,0,.75)';
  //ctx.fillRect(0,0, numCols * this.pixelsPerTileUnit.x, numRows * this.pixelsPerTileUnit.y);
  //ctx.restore();
}


/*
World.prototype.checkVictory = function()  {
    if (game.running === 1) {
        var collisionZone = 50;
        if ((Math.abs(game.princess.x - game.player.x) < collisionZone) &&
                (Math.abs(game.princess.y - game.player.y) < collisionZone)) {
                    cl(game.level);
                    game.level++;
                    if (game.level <= game.world.maps.length) {
                        game.princess.draw = false;
                        game.score += 1000;
                        game.startLevel(false);
                        return true;
                    } else {
                        game.victorySequence();
                    }
                }

    }
    return false;
}


World.prototype.init = function(sizeInPixels, tileSize) {
    cl(this);
    this.sizeInPixels = sizeInPixels;
    this.tileSize = tileSize;
    cl(this);
}

//Check if player can walk on tile, in which case the tile type is listed
//in the array walkableTiles
World.prototype.isTileWalkable = function(tileX, tileY) {
    var result = false;

    var tileType = this.currentMap.map[tileX + tileY*this.currentMap.totalTiles.x];

    if (tileType &&  (this.walkableTiles.indexOf(tileType) > -1)){
        //If tile exists and it is walkable returns true
        result = true;
    }
    return result;
}


//Returns an array with the indexes of the rows on which enemies can be spawned
World.prototype.enemyRows= function() {
    var result = [];
    for (var rowIndex = 0; rowIndex < this.currentMap.totalTiles.y; rowIndex++){
        //Reads only the first tile of each row, it is enough since
        //enemy rows must be omogenous
        var tileType = this.currentMap.map[rowIndex*this.currentMap.totalTiles.x];
        if (tileType &&  (this.enemyTiles.indexOf(tileType) > -1)){
            result.push(rowIndex);
        }
    }
    return result;
}
//Returns an array with the tiles coordinates of a specific type
World.prototype.getTilesOfType= function(type) {
    var result = [];
    for (var tileMapIndex = 0; tileMapIndex < this.currentMap.map.length; tileMapIndex ++) {
        if (this.currentMap.map[tileMapIndex] === type) {
            result.push({
                x: Math.floor(tileMapIndex % this.currentMap.totalTiles.x),
                y: Math.floor(tileMapIndex / this.currentMap.totalTiles.x)
            });
        }
    }
    return result;
}
*/