var World = function(){
  this.tiles = {
    //these values will be reset per level
    x: 10,
    y: 8
  };

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
  }
  this.failureMap = {

    totalTiles: {
      x: 5,
      y: 4
    },
    playerStartTile: {
      x: 2,
      y: 3
    },
    textureMap:[
      't','t','t','t','t',
      's','s','s','s','s',
      's','s','s','s','s',
      's','s','s','s','s'
    ],
    topoMap:[
      45,45,45,45,45,
      40,40,40,40,40,
      1,1,1,1,1,
      1,1,1,1,1
    ],
    walkMap: [
      0,0,0,0,0,
      0,0,0,0,0,
      1,1,1,1,1,
      1,1,1,1,1,
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
    textureMap:[
      't','t','t','t','t','t','t','t','t',
      't','t','t','t','t','t','t','t','t',
      's','s','s','s','s','s','s','s','s',
      's','s','s','s','s','s','s','s','s',
      's','s','s','s','s','s','s','s','s'
    ],
    topoMap:[
      0,0,0,0,40,0,0,0,0,
      0,0,0,0,0,0,0,0,0,
      32,29,26,35,35,32,29,32,29,
      29,28,24,30,31,29,28,29,28,
      19,18,22,20,22,19,18,19,18,
    ],
    walkMap: [
      0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,
      1,1,1,1,1,1,1,1,1,
      1,1,1,1,1,1,1,1,1,
      1,1,1,1,1,1,1,1,1
      ]
  };

  this.maps = [
    {
      totalTiles: {
        x: 11,
        y: 5
      },
      playerStartTile: {
        x: 3,
        y: 4
      },
      textureMap: [
        's','s','g','s','w','w','s','s','s','s','s',
        's','s','s','g','g','w','w','s','g','s','s',
        's','s','s','s','g','g','w','w','s','s','s',
        's','s','s','s','g','g','g','w','w','s','s',
        'g','g','g','g','g','g','g','g','w','w','g'
      ],

      topoMap: [
        1,1,1,1,0,0,1,1,1,1,1,
        1,1,3,1,1,0,0,1,1,1,1,
        1,1,1,1,1,1,0,0,1,1,1,
        1,1,1,1,1,1,1,0,0,1,1,
        1,1,1,1,1,1,1,1,0,0,1
      ],
      walkMap: [
        1,1,1,1,0,0,1,1,1,1,1,
        1,1,0,1,1,0,0,1,1,1,1,
        1,1,1,1,1,1,0,0,1,1,1,
        1,1,1,1,1,1,1,0,0,1,1,
        1,1,1,1,1,1,1,1,0,0,1
      ]
    },
    {
      totalTiles: {
        x: 11,
        y: 11
      },

      playerStartTile: {
        x: 5,
        y: 7
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
        0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,
        0,0,2,2,2,2,2,2,2,0,0,
        0,0,2,2,2,2,2,2,0,0,0,
        0,0,2,2,3,3,3,2,2,0,0,
        0,0,2,2,3,4,3,2,2,0,0,
        0,0,2,2,3,3,3,2,2,0,0,
        0,0,2,2,2,2,2,2,2,0,0,
        0,0,0,2,2,2,2,2,2,0,0,
        0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0
      ],

      walkMap: [
        0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,
        0,0,1,1,1,1,1,1,1,0,0,
        0,0,1,1,1,1,1,1,0,0,0,
        0,0,1,1,1,1,1,1,1,0,0,
        0,0,1,1,1,1,1,1,1,0,0,
        0,0,1,1,1,1,1,1,1,0,0,
        0,0,1,1,1,1,1,1,1,0,0,
        0,0,0,1,1,1,1,1,1,0,0,
        0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0
      ]
    },
    {
      totalTiles: {
        x: 12,
        y: 12
      },

      playerStartTile: {
        x: 9,
        y: 9
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
        0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0
      ],

      walkMap: [
        1,1,1,1,1,1,1,1,1,1,1,1,
        1,1,1,1,1,1,1,1,1,1,1,1,
        1,1,1,1,1,1,1,1,1,1,1,1,
        1,1,1,1,1,1,1,1,1,1,1,1,
        1,1,1,1,1,1,1,1,1,1,1,1,
        1,1,1,1,1,1,1,1,1,1,1,1,
        1,1,1,1,1,1,1,1,1,1,1,1,
        1,1,1,1,1,1,1,1,1,1,1,1,
        1,1,1,1,1,1,1,1,1,1,1,1,
        1,1,1,1,1,1,1,1,1,1,1,1,
        1,1,1,1,1,1,1,1,1,1,1,1,
        1,1,1,1,1,1,1,1,1,1,1,1
      ]
    },
    {
      totalTiles: {
        x: 11,
        y: 11
      },

      playerStartTile: {
        x: 6,
        y: 8
      },

      textureMap: [
        's','s','s','s','s','s','s','s','g','gb','s',
        's','s','s','s','s','s','sb','s','s','g','s',
        'g','sb','s','s','s','s','s','s','s','s','s',
        's','s','s','g','s','s','g','g','s','s','s',
        'w','sb','s','g','g','g','g','s','s','w','w',
        'w','s','s','s','g','g','g','g','s','w','w',
        'w','w','s','s','g','g','g','g','s','w','w',
        'w','w','s','g','g','g','s','g','s','w','w',
        'w','w','w','s','s','s','s','s','s','w','w',
        'w','w','w','w','w','w','w','w','w','w','w',
        'w','w','w','w','w','w','w','w','w','w','w'
      ],

      topoMap: [
        7,7,8,9,10,10,11,7,7,5,5,
        7,6,5,6,5,6,7,6,5,5,4,
        6,5,2,2,2,2,2,2,2,4,6,
        5,4,2,2,2,2,2,2,0,3,5,
        0,3,2,2,4,2,2,2,2,0,0,
        0,3,2,2,2,2,2,2,2,0,0,
        0,0,2,2,2,2,2,4,2,0,0,
        0,0,2,2,2,2,2,2,2,0,0,
        0,0,0,2,2,2,2,2,2,0,0,
        0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0
      ],
      walkMap: [
        0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,
        0,0,1,1,1,1,1,1,1,0,0,
        0,0,1,1,1,1,1,1,0,0,0,
        0,0,1,1,0,1,1,1,1,0,0,
        0,0,1,1,1,1,1,1,1,0,0,
        0,0,1,1,1,1,1,0,1,0,0,
        0,0,1,1,1,1,1,1,1,0,0,
        0,0,0,1,1,1,1,1,1,0,0,
        0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0
      ]
    }
  ];

  this.currentMap = {};//this.maps[3];//
  //this.currentMap.topoMap = this.randomizeTileHeights(this.currentMap.topoMap);

};

World.prototype.randomizeTileHeights = function(map){  //TODO add some texture to the landscape
  console.log(map);
  var newMap = [];
  map.forEach(function(tile){
    newMap.push(tile + Math.random());
  });
  console.log(newMap);
  return newMap;
}

World.prototype.updateTime = function(dt){
  this.worldTime += dt;
}

World.prototype.maximumBlockElevation = function(){
  var max = this.currentMap.topoMap[0];
  for( var i = 1; i < this.currentMap.totalTiles.x; i++){
    max = Math.max(max, this.currentMap.topoMap[i]);
  }
  return max;
}

World.prototype.init = function(){
  console.log("world initialize");
  this.elevationOffset = this.maximumBlockElevation() * this.pixelsPerElevationUnit.y;
  this.canvasSize = {
    x: this.currentMap.totalTiles.x * this.pixelsPerTileUnit.x,
    y: this.currentMap.totalTiles.y * this.pixelsPerTileUnit.y + this.pixelsPerBlockImg.y - this.pixelsPerTileUnit.y + this.elevationOffset
  };
};

World.prototype.checkVictory = function() {

    if (game.active) {
      //console.log(this.worldTime);
        if (this.worldTime > 10) {
                    console.log(game.level);
                    if (game.level <= game.world.maps.length) {
                        game.level++;
                        game.score += 1000;
                        this.worldTime = 0;
                        game.startLevel(false);
                        return true;
                    } else {
                        //game.victorySequence();
                        //console.log("victory sequence");
                    }
                }

    }
    return false;
}

World.prototype.addBoulders = function(currentMap){
  console.log("boulder added");


}

World.prototype.enemySource = function() {
  console.log("enemy source");
}


World.prototype.render = function(row, numCols) {
  for (col = 0; col < numCols; col++) {
    var resource,
      tileHeight = (this.currentMap.topoMap[col + numCols*row]);

    switch (this.currentMap.textureMap[col + numCols*row])   {
      case 'w':
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
    for (var z = 0; z <= tileHeight; z++){
      ctx.drawImage(Resources.get(resource), col * this.pixelsPerTileUnit.x, row * this.pixelsPerTileUnit.y - this.pixelsPerElevationUnit.y * z + this.elevationOffset);
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
    this.currentMap = {};
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