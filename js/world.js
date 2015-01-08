var World = function(){
  this.tiles = {
    //these values will be reset per level
    x: 10,
    y: 8
  };

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
  }

  this.canvasSize = {
    x: this.tiles.x * this.pixelsPerTileUnit.x,
    y: this.tiles.y * this.pixelsPerTileUnit.y + this.pixelsPerBlockImg.y - this.pixelsPerTileUnit.y
  },

  this.failureMap = {
    totalTiles: {
      x: 5,
      y: 3
    },

    textureMap:[
      's','s','s','s','s',
      's','s','s','s','s',
      's','s','s','s','s'
    ],
    topoMap:[
      '40','40','40','40','40',
      '1','1','1','1','1',
      '1','1','1','1','1'
    ],
    walkMap: [
    '0','0','0','0','0',
    '1','1','1','1','1',
    '1','1','1','1','1',
    ],

    playerStartTile: {
      x: 2,
      y: 3
    }
  },

  this.victoryMap = {
    totalTiles: {
      x: 5,
      y: 20
    },

    textureMap:[
      'b','b','b','b','b',
      'b','b','b','b','b',
      'b','b','b','b','b',
      'b','b','b','b','b',
      'b','b','b','b','b',
      'b','b','b','b','b',
      'b','b','b','b','b',
      'b','b','b','b','b',
      'b','b','b','b','b',
      'b','b','b','b','b',
      'b','b','b','b','b',
      'b','b','b','b','b',
      'b','b','b','b','b',
      'b','b','b','b','b',
      'b','b','b','b','b',
      'b','b','b','b','b',
      'b','b','b','b','b',
      's','s','s','s','s',
      's','s','s','s','s',
      's','s','s','s','s'
    ],
    topoMap:[
      '0','0','0','0','0',
      '0','0','0','0','0',
      '0','0','0','0','0',
      '0','0','0','0','0',
      '0','0','0','0','0',
      '0','0','0','0','0',
      '0','0','0','0','0',
      '0','0','0','0','0',
      '0','0','0','0','0',
      '0','0','0','0','0',
      '0','0','0','0','0',
      '0','0','0','0','0',
      '0','0','0','0','0',
      '0','0','0','0','0',
      '0','0','0','0','0',
      '0','0','0','0','0',
      '0','0','0','0','0',
      '26','35','35','32','29',
      '24','30','31','29','28',
      '22','20','22','19','18'
    ],
    walkMap: [
      '0','0','0','0','0',
      '0','0','0','0','0',
      '0','0','0','0','0',
      '0','0','0','0','0',
      '0','0','0','0','0',
      '0','0','0','0','0',
      '0','0','0','0','0',
      '0','0','0','0','0',
      '0','0','0','0','0',
      '0','0','0','0','0',
      '0','0','0','0','0',
      '0','0','0','0','0',
      '0','0','0','0','0',
      '0','0','0','0','0',
      '0','0','0','0','0',
      '0','0','0','0','0',
      '0','0','0','0','0',
      '1','1','1','1','1',
      '1','1','1','1','1',
      '1','1','1','1','1'
      ],
    playerStartTile: {
      x: 2,
      y: 18
    }
  };

  this.maps = [
    {
      totalTiles: {
        x: 11,
        y: 5
      },

      textureMap: [
        's','s','g','s','w','w','s','s','s','s','s',
        's','s','s','g','g','w','w','s','g','s','s',
        's','s','s','s','g','g','w','w','s','s','s',
        's','s','s','s','g','g','g','w','w','s','s',
        'g','g','g','g','g','g','g','g','w','w','g'
      ],

      topoMap: [
        '1','1','1','1','0','0','1','1','1','1','1',
        '1','1','3','1','1','0','0','1','1','1','1',
        '1','1','1','1','1','1','0','0','1','1','1',
        '1','1','1','1','1','1','1','0','0','1','1',
        '1','1','1','1','1','1','1','1','0','0','1'
      ],
      walkMap: [
        '1','1','1','1','0','0','1','1','1','1','1',
        '1','1','0','1','1','0','0','1','1','1','1',
        '1','1','1','1','1','1','0','0','1','1','1',
        '1','1','1','1','1','1','1','0','0','1','1',
        '1','1','1','1','1','1','1','1','0','0','1'
      ],
    },
    {
      totalTiles: {
        x: 11,
        y: 11
      },

      textureMap: [
        'w','w','w','w','w','w','w','w','w','w','w',
        'w','w','w','w','w','w','w','w','w','w','w',
        'w','w','s','s','s','s','s','s','s','w','w',
        'w','w','s','g','s','s','g','g','w','w','w',
        'w','w','s','s','g','g','g','s','s','w','w',
        'w','w','s','g','g','g','g','g','s','w','w',
        'w','w','s','s','g','g','g','g','s','w','w',
        'w','w','s','g','g','g','s','g','s','w','w',
        'w','w','w','s','s','s','s','s','s','w','w',
        'w','w','w','w','w','w','w','w','w','w','w',
        'w','w','w','w','w','w','w','w','w','w','w'
      ],

      topoMap: [
        '0','0','0','0','0','0','0','0','0','0','0',
        '0','0','0','0','0','0','0','0','0','0','0',
        '0','0','2','2','2','2','2','2','2','0','0',
        '0','0','2','2','2','2','2','2','0','0','0',
        '0','0','2','2','3','3','3','2','2','0','0',
        '0','0','2','2','3','4','3','2','2','0','0',
        '0','0','2','2','3','3','3','2','2','0','0',
        '0','0','2','2','2','2','2','2','2','0','0',
        '0','0','0','2','2','2','2','2','2','0','0',
        '0','0','0','0','0','0','0','0','0','0','0',
        '0','0','0','0','0','0','0','0','0','0','0'
      ],

      walkMap: [
        '0','0','0','0','0','0','0','0','0','0','0',
        '0','0','0','0','0','0','0','0','0','0','0',
        '0','0','1','1','1','1','1','1','1','0','0',
        '0','0','1','1','1','1','1','1','0','0','0',
        '0','0','1','1','1','1','1','1','1','0','0',
        '0','0','1','1','1','1','1','1','1','0','0',
        '0','0','1','1','1','1','1','1','1','0','0',
        '0','0','1','1','1','1','1','1','1','0','0',
        '0','0','0','1','1','1','1','1','1','0','0',
        '0','0','0','0','0','0','0','0','0','0','0',
        '0','0','0','0','0','0','0','0','0','0','0'
      ],
    },
    {
      totalTiles: {
        x: 12,
        y: 12
      },

      textureMap: [
        's','g','s','s','s','s','s','g','s','s','s','s',
        's','g','g','s','s','s','s','g','s','s','s','s',
        's','s','g','g','s','s','g','g','s','s','s','s',
        's','s','g','g','s','s','g','g','g','s','s','s',
        's','g','g','g','g','g','g','s','s','s','s','s',
        's','s','s','s','g','g','g','g','g','s','g','g',
        's','s','s','s','g','g','g','g','s','g','g','g',
        's','s','g','g','g','g','s','g','g','g','s','s',
        's','s','s','g','g','s','s','s','s','s','s','s',
        's','s','s','g','g','s','s','s','s','s','s','s',
        's','s','s','s','g','s','s','s','s','s','s','s',
        's','g','s','s','s','s','s','g','s','s','s','s'
      ],

      topoMap: [
        '1','1','1','1','1','1','1','1','1','1','1','1',
        '1','1','1','1','1','1','1','1','1','1','1','1',
        '1','1','1','1','1','1','1','1','1','1','1','1',
        '1','1','1','1','1','1','1','1','1','1','1','1',
        '1','1','1','1','1','1','1','1','1','1','1','1',
        '1','1','1','1','1','1','1','1','1','1','1','1',
        '1','1','1','1','1','1','1','1','1','1','1','1',
        '1','1','1','1','1','1','1','1','1','1','1','1',
        '1','1','1','1','1','1','1','1','1','1','1','1',
        '1','1','1','1','1','1','1','1','1','1','1','1',
        '1','1','1','1','1','1','1','1','1','1','1','1',
        '1','1','1','1','1','1','1','1','1','1','1','1'
      ],

      walkMap: [
              '1','1','1','1','1','1','1','1','1','1','1','1',
        '1','1','1','1','1','1','1','1','1','1','1','1',
        '1','1','1','1','1','1','1','1','1','1','1','1',
        '1','1','1','1','1','1','1','1','1','1','1','1',
        '1','1','1','1','1','1','1','1','1','1','1','1',
        '1','1','1','1','1','1','1','1','1','1','1','1',
        '1','1','1','1','1','1','1','1','1','1','1','1',
        '1','1','1','1','1','1','1','1','1','1','1','1',
        '1','1','1','1','1','1','1','1','1','1','1','1',
        '1','1','1','1','1','1','1','1','1','1','1','1',
        '1','1','1','1','1','1','1','1','1','1','1','1',
        '1','1','1','1','1','1','1','1','1','1','1','1'
      ],

    },
    {
      totalTiles: {
        x: 11,
        y: 11
      },

      textureMap: [
        's','s','s','s','s','s','s','s','g','g','s',
        's','s','s','s','s','s','s','s','s','g','s',
        'g','s','s','s','s','s','s','s','s','s','s',
        's','s','s','g','s','s','g','g','s','s','s',
        'w','s','s','g','g','g','g','s','s','w','w',
        'w','s','s','s','g','g','g','g','s','w','w',
        'w','w','s','s','g','g','g','g','s','w','w',
        'w','w','s','g','g','g','s','g','s','w','w',
        'w','w','w','s','s','s','s','s','s','w','w',
        'w','w','w','w','w','w','w','w','w','w','w',
        'w','w','w','w','w','w','w','w','w','w','w'
      ],

      topoMap: [
        '7','7','8','9','10','10','11','7','7','5','5',
        '7','6','5','6','5','6','7','6','5','5','4',
        '6','5','2','2','2','2','2','2','2','4','6',
        '5','4','2','2','2','2','2','2','0','3','5',
        '0','3','2','2','4','2','2','2','2','0','0',
        '0','3','2','2','2','2','2','2','2','0','0',
        '0','0','2','2','2','2','2','4','2','0','0',
        '0','0','2','2','2','2','2','2','2','0','0',
        '0','0','0','2','2','2','2','2','2','0','0',
        '0','0','0','0','0','0','0','0','0','0','0',
        '0','0','0','0','0','0','0','0','0','0','0'
      ],
      walkMap: [
        '0','0','0','0','0','0','0','0','0','0','0',
        '0','0','0','0','0','0','0','0','0','0','0',
        '0','0','1','1','1','1','1','1','1','0','0',
        '0','0','1','1','1','1','1','1','0','0','0',
        '0','0','1','1','0','1','1','1','1','0','0',
        '0','0','1','1','1','1','1','1','1','0','0',
        '0','0','1','1','1','1','1','0','1','0','0',
        '0','0','1','1','1','1','1','1','1','0','0',
        '0','0','0','1','1','1','1','1','1','0','0',
        '0','0','0','0','0','0','0','0','0','0','0',
        '0','0','0','0','0','0','0','0','0','0','0'
      ]
    },
  ],

  this.tileMap = this.maps[3];//this.victoryMap;//

}

World.prototype.randomizeTileHeights = function(map){  //TODO add some texture to the landscape
  var i = 0,
    tiles = map.topoMap.length;
  for ( ; i < tiles; i ++){
    map.topoMap[i] = map.topoMap[i];
  }
  return map;
}

World.prototype.init = function(){
  console.log("world initialize")
}

World.prototype.checkVictory = function() {
  console.log("victory");
}

World.prototype.addBoulders = function(){
  console.log("boulder added");
}

World.prototype.enemySource = function() {
  console.log("enemy source");
}

World.prototype.isTileWalkable = function() {
  console.log("walkable");
}

World.prototype.render = function() {
  var numRows = this.tileMap.totalTiles.y,
    numCols = this.tileMap.totalTiles.x,
    row, col;

        /* Loop through the number of rows and columns we've defined above
         * and, using the rowImages array, draw the correct image for that
         * portion of the "grid"
         */
for (row = 0; row < numRows; row++) {
  for (col = 0; col < numCols; col++) {
  /* The drawImage function of the canvas' context element
  * requires 3 parameters: the image to draw, the x coordinate
  * to start drawing and the y coordinate to start drawing.
  * We're using our Resources helpers to refer to our images
  * so that we get the benefits of caching these images, since
  * we're using them over and over.
  */
  // Modified so that it reads the tileMap array in world.
    var resource;
    switch (this.tileMap.textureMap[col + numCols*row])   {
      case 'w':
          resource = 'images/water-block.png';
          break;
      case 'g':
          resource = 'images/grass-block.png';
          break;
      case 's':
          resource = 'images/stone-block.png';
          break;
      case 'b':
          resource = 'images/white-block.png';
          break;
    }
      for (var z = 0; z <= this.tileMap.topoMap[col + numCols*row]; z++){
      ctx.drawImage(Resources.get(resource), col * this.pixelsPerTileUnit.x, row * this.pixelsPerTileUnit.y - this.pixelsPerElevationUnit.y * z);

      }
    }


  }
}
/*
var World = function() {
    //Size of the world map (in pixels)
    this.sizeInPixels = {
        width: 0,
        height: 0
    }
    this.tileSize= {
        x: 0,
        y: 0
    };
    //World representation, as an array of Tiles
    //'w' for water
    //'s' for stone
    //'g' for grass
    //'x' for goal
    this.victoryMap =
    {
        totalTiles: {
            x: 5,
            y: 6
        },
        map: [
        'w','w','w','w','w',
        's','w','w','w','s',
        's','w','s','w','s',
        's','g','g','g','s',
        'g','w','w','w','g',
        's','s','g','s','s'
        ]
    };

    this.maps= [
    {
        totalTiles :{
            x: 5,
            y: 6
        },
        playerStartTile : {
            x: 2,
            y: 5
        },
        map: [
        'w','w','x','w','w',
        's','s','s','s','s',
        's','s','s','s','s',
        's','s','s','s','s',
        'g','g','g','g','g',
        'g','g','g','g','g'
        ]
    },
    {
        totalTiles: {
            x: 5,
            y: 8
        },
        playerStartTile : {
            x: 2,
            y: 7
        },
        map:[
            'w','w','x','w','w',
            's','s','s','s','s',
            's','s','s','s','s',
            's','s','s','s','s',
            'w','w','g','w','w',
            's','s','s','s','s',
            's','s','s','s','s',
            'g','g','g','g','g'
        ]
    },
    {
        totalTiles: {
            x: 7,
            y: 10
        },
        playerStartTile : {
            x: 3,
            y: 9
        },
        map:[
            'w','w','w','x','w','w','w',
            's','s','s','s','s','s','s',
            's','s','s','s','s','s','s',
            's','s','s','s','s','s','s',
            's','s','s','s','s','s','s',
            'w','w','g','g','g','w','w',
            's','s','s','s','s','s','s',
            's','s','s','s','s','s','s',
            's','s','s','s','s','s','s',
            'g','g','g','g','g','g','g'
        ]
    },
    {
        totalTiles: {
            x: 7,
            y: 12
        },
        playerStartTile : {
            x: 3,
            y: 11
        },
        map:[
            'w','w','w','x','w','w','w',
            's','s','s','s','s','s','s',
            's','s','s','s','s','s','s',
            's','s','s','s','s','s','s',
            's','s','s','s','s','s','s',
            's','s','s','s','s','s','s',
            's','s','s','s','s','s','s',
            's','s','s','s','s','s','s',
            's','s','s','s','s','s','s',
            's','s','s','s','s','s','s',
            's','s','s','s','s','s','s',
            'g','g','g','g','g','g','g'
        ]
    }
    ];
    //This is the map used for the current game
    this.tileMap = {};
    //Tiles on which the player can walk
    this.walkableTiles = ['g','s','x'];
    //Tiles on which the enemy can be spawned
    this.enemyTiles= ['s'];
};

World.prototype.checkVictory = function()  {
    if (game.running === 1) {
        var collisionZone = 50;
        if ((Math.abs(game.princess.x - game.player.x) < collisionZone) &&
                (Math.abs(game.princess.y - game.player.y) < collisionZone)) {
                    console.log(game.level);
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
    console.log(this);
    this.sizeInPixels = sizeInPixels;
    this.tileSize = tileSize;
    console.log(this);
}

//Check if player can walk on tile, in which case the tile type is listed
//in the array walkableTiles
World.prototype.isTileWalkable = function(tileX, tileY) {
    var result = false;

    var tileType = this.tileMap.map[tileX + tileY*this.tileMap.totalTiles.x];

    if (tileType &&  (this.walkableTiles.indexOf(tileType) > -1)){
        //If tile exists and it is walkable returns true
        result = true;
    }
    return result;
}


//Returns an array with the indexes of the rows on which enemies can be spawned
World.prototype.enemyRows= function() {
    var result = [];
    for (var rowIndex = 0; rowIndex < this.tileMap.totalTiles.y; rowIndex++){
        //Reads only the first tile of each row, it is enough since
        //enemy rows must be omogenous
        var tileType = this.tileMap.map[rowIndex*this.tileMap.totalTiles.x];
        if (tileType &&  (this.enemyTiles.indexOf(tileType) > -1)){
            result.push(rowIndex);
        }
    }
    return result;
}
//Returns an array with the tiles coordinates of a specific type
World.prototype.getTilesOfType= function(type) {
    var result = [];
    for (var tileMapIndex = 0; tileMapIndex < this.tileMap.map.length; tileMapIndex ++) {
        if (this.tileMap.map[tileMapIndex] === type) {
            result.push({
                x: Math.floor(tileMapIndex % this.tileMap.totalTiles.x),
                y: Math.floor(tileMapIndex / this.tileMap.totalTiles.x)
            });
        }
    }
    return result;
}
*/