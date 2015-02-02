/*
World handles all the setup for each level. It calls the map to use, and all the necessary objects. Then Game acutually pulls the trigger;
*/
var World = function() {
  cl('World new');
  this.loadLevel = false;
  this.worldTime = 0;
  this.playersPassed = 0;
  this.deadPlayers = 0;
  this.cutscene = false;
  this.canvasSize = {};
  this.currentMap = {};
  this.offset = {
    x: 0,
    y: 0
  };
  this.tiles = {
    x: 0,
    y: 0
  };
  this.elevationOffset = 0;
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
      x: 11,
      y: 12
    },
    playerStartTile: {
      x: -1,
      y: -1
    },
    bossStartTile: {
      x: 8,
      y: 10
    },
    enemyPaths: [],
    textureMap: [],
    topoMap: [],
    walkMap: [],
  };
  //Random map initialization
  for (var i = 0; i < 6; i++) {
    this.randomMap.enemyPaths.push([{
      x: this.randomMap.totalTiles.x,
      y: i + 2
    }, {
      x: -1,
      y: i + 2
    }]);
  }
  this.possibleTiles = ['s', 'g', 'w'];
  for (var i = 0; i < (this.randomMap.totalTiles.x + 1) * (this.randomMap.totalTiles.y); i++) {
    this.randomMap.textureMap.push(this.possibleTiles[Math.floor(Math.random() * 3 * Math.random())]);
    this.randomMap.topoMap.push(0);
    this.randomMap.walkMap.push(1);
  }


  this.failureMap = {
    totalTiles: {
      x: 5,
      y: 4
    },
    playerStartTile: {
      x: 1,
      y: 2
    },
    goalTile: [
      {
        x: 0,
        y: 2
      }
    ],
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


  this.maps = [
    {
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

      enemyMessage : "A long time ago . . .",

      goalTile: [
      {
        x: 2,
        y: 1
      },
      {
        x: 3,
        y: 1
      },
      {
        x: 5,
        y: 1
      },
      {
        x: 6,
        y: 1
      }
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
    },
      {
      totalTiles: {
        x: 11,
        y: 10
      },
      playerStartTile: {
        x: 7,
        y: 0
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

      enemyMessage : "A cold wind blows.",

      goalTile: [
      {
        x: 2,
        y: 9
      }
      ],

      textureMap: [
        's', 's', 'g', 's', 'w', 'w', 's', 's', 's', 's', 's',
        's', 's', 'sb', 'g', 'g', 'w', 'w', 's', 'g', 's', 's',
        's', 's', 's', 's', 'g', 'g', 'w', 'w', 's', 's', 's',
        's', 's', 's', 's', 'g', 'g', 'g', 'w', 'w', 's', 's',
        'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'w', 'w', 'g',
        'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'w', 'w', 'g',
        's', 's', 's', 's', 'g', 'g', 'g', 'w', 'w', 's', 's',
        's', 's', 's', 's', 'g', 'g', 'w', 'w', 's', 's', 's',
        's', 's', 'sb', 'g', 'g', 'w', 'w', 's', 'g', 's', 's',
        's', 's', 'g', 's', 'w', 'w', 's', 's', 's', 's', 's'
      ],

      topoMap: [
        1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1,
        1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1,
        1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1,
        1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1,
        1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1
      ],
      walkMap: [
        1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1,
        1, 1, 0, 1, 1, 0, 0, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1,
        1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1,
        1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1,
        1, 1, 0, 1, 1, 0, 0, 1, 1, 1, 1,
        1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1
      ]
    }, {
      totalTiles: {
        x: 11,
        y: 11
      },

      playerStartTile: {
        x: 5,
        y: 9
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

      enemyMessage : "We will find you.",

      goalTile: [
      {
        x: 8,
        y: 1
      }
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
        'w', 'w', 'w', 'w', 'sb', 's', 's', 's', 's', 's', 'w',
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
        0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0,
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
        0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
      ]
    }, {
      totalTiles: {
        x: 12,
        y: 12
      },

      playerStartTile: {
        x: 8,
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

      enemyMessage : "All your base are belong to us!",

      goalTile: [
      {
        x: 1,
        y: 0
      }
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
        y: 9
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

      enemyMessage : "LADYBUGS ATTACK!",

      goalTile: [
      {
      }
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
        'w', 'w', 'w', 's', 's', 's', 's', 's', 'g', 's', 'w',
        'w', 'w', 'w', 'w', 'w', 'w', 's', 's', 's', 's', 'w',
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
        0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0,
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
        0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
      ]
    }];
};

/*
The next three methods set the appropritate values for the different special levels.
*/
Game.prototype.title = function() {
  //console.log('game title');
  this.currentMap = this.world.randomMap;
  this.maxElevation = this.maximumBlockElevation() * this.pixelsPerElevationUnit.y;
}

World.prototype.victory = function() {
  //console.log("game victory");
  this.currentMap = this.victoryMap;
  this.maxElevation = this.maximumBlockElevation() * this.pixelsPerElevationUnit.y;
}

World.prototype.failure = function() {
  //console.log("game failure");
  this.currentMap = this.failureMap;
  this.maxElevation = this.maximumBlockElevation() * this.pixelsPerElevationUnit.y;
}

World.prototype.characterVictory = function(player){
  //console.log('world characterVictory');
  var result = false;
  if (this.currentMap.hasOwnProperty('goalTile')){
    for (var i = 0; i < this.currentMap.goalTile.length; i++){
      if (this.currentMap.goalTile[i].x === player.tile.x && this.currentMap.goalTile[i].y === player.tile.y){
        //console.log('character ' + player.elementName + ' victory');
        result = true;
        player.noCollisions();
        break;
      }
    }
  }
  return result;
}

World.prototype.checkVictory = function() {
  var result = false;
  //console.log('world checkVictory');
  if (game.world.characterVictory(game.controlling)) {
    game.controlling.passedLevel();
  }
  if (game.allDead()){
    this.removeComponents();
    this.failure();
    this.worldtime = 0;
    result = true;
  } else if (game.playersPassed()) {
    if (game.level < game.world.maps.length) {
      this.removeComponents();
      game.nextLevel();
      game.score += 1000;
      this.worldTime = 0;
      //console.log(this.maps[game.level-1].enemyMessage);
      this.currentMap = this.randomMap;
      result = true;
    } else {
      cl("victory sequence");
      this.init();
      game.world.characterVictory();
      result = true;
    }
  }else if (game.boss.dead){
    this.removeComponents();
    this.victory();
    game.score += 1000;
    this.worldtime = 0;
    result = true;
  }

  return result;
};

World.prototype.activateComponents = function(LastStateDifferent){
var result = false;
if (LastStateDifferent) {
  this.removeComponents();
  //console.log('World activateComponents');

  if (game.level > 0){
    if (this.cutscene){
        game.currentMenu = game.allMenus[1];
    } else {
        //console.log('found current menu');
        game.currentMenu = {};
    }
  }
  result = true;
    if (game.level === 0 || this.cutscene){
      this.currentMap = this.randomMap;
      this.maxElevation = this.maximumBlockElevation() * this.pixelsPerElevationUnit.y;

      if (this.currentMap.bossStartTile){
        game.boss.activate({
          x: game.world.currentMap.bossStartTile.x,
          y: game.world.currentMap.bossStartTile.y
        });
      }
      if (this.cutscene){
        game.messageBugs.create(this.maps[game.level-1].enemyMessage);
      }
    } else {
      this.currentMap = this.maps[game.level-1];
      this.maxElevation = this.maximumBlockElevation() * this.pixelsPerElevationUnit.y;

      if (this.currentMap.playerStartTile){
        var i = 0;
        game.allPlayers.forEach(function (player) {
          if (player.passed && !player.dead){
            player.activate({
              x: game.world.currentMap.playerStartTile.x + i,
              y: game.world.currentMap.playerStartTile.y
            });
            player.passed = false;
            player.calculatePosition(player.tile);
          }else{
            //game.allPlayers.push(game.allPlayers.shift());
          }
          i++;
        });
      }
      if (this.currentMap.bossStartTile){
        game.boss.activate({
          x: game.world.currentMap.bossStartTile.x,
          y: game.world.currentMap.bossStartTile.y
        });
        game.boss.bossFight();
      }

      game.allCollectables.forEach(function(collectable){
        if(!collectable.attachedTo){
          collectable.init();
        }
      })

      if (this.currentMap.goalTile){
        for (var i = 0; i < this.currentMap.goalTile.length; i++){
          game.allGoals[i].activate(this.currentMap.goalTile[i]);
        }
      }
      for (var i = 1; i < 5 * game.level; i++){
        game.allEnemies[i].simpleInit();
      }

      game.allTransporters.forEach(function(transporter){
        transporter.init();
      });



//      for (var i = 0; i < 7; i++){
//        game.allCollectables.push(new Collectable(collectables[i]));
//      }
//      for (var e = 0, j; e < 5 * game.level; e++){
//        j = Math.floor(Math.random() * game.numberOfEnemies - 1);
//        game.allEnemies[j].draw = true;
//        game.allEnemies[j].active = true;
//      }
    }
  }

  return result;
}

World.prototype.removeComponents = function() {
  //console.log('world removeComponents');
  game.boss.noCollisions();
  game.allPlayers.forEach(function(player){
    player.noCollisions();
  });
  game.allEnemies.forEach(function(enemy){
    enemy.noCollisions();
  });
  game.allGoals.forEach(function(goal){
    goal.noCollisions();
  });
  game.allTransporters.forEach(function(transporter){
    transporter.noCollisions();
  });
  game.allCollectables.forEach(function(collectable){
    collectable.noCollisions();
  });
}

/*
This method is called for every new scene (level or cutscene) recalculated.
*/
World.prototype.init = function() {
  //console.log("world init");
  this.canvasSize.x = this.currentMap.totalTiles.x * this.pixelsPerTileUnit.x;
  this.canvasSize.y = this.currentMap.totalTiles.y * this.pixelsPerTileUnit.y + this.pixelsPerBlockImg.y - this.pixelsPerTileUnit.y + this.maxElevation;
};

/*
updates the running game time.
*/
World.prototype.updateTime = function(dt) {
  cl('world updateTime');
  if (game.active && !game.world.cutscene){
    this.worldTime += dt;
  }
}

/*
Each second is worth a point. after every level the number of seconds it took to complete the level is subtracted from total score.
*/
World.prototype.subtractTimeFromScore = function() {
  game.score -= Math.round(this.WorldTime);
}

/*
Calculates the screen space needed by each additional elevation unit. It is required that the first row of the topoMap array, have the tallest block for proper rendering.
*/
World.prototype.maximumBlockElevation = function() {
  cl('world maximumBlockElevation');
  ////console.log("game level " + game.level);
  var max = this.currentMap.topoMap[0];
  for (var i = 1; i < this.currentMap.totalTiles.x; i++) {
    max = Math.max(max, this.currentMap.topoMap[i]);
  }
  ////console.log(max);
  return max;
}

/*
The world render method checks for a scrolling map. If the scrolling map is in use, the for loop needs to be adjusted so that the tile removal is not rendered to the canvas.
*/
World.prototype.render = function(row, numCols) {
  cr('world render row:' + row);
  if (this.currentMap === this.randomMap){
    numCols++;
  }

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
      ctx.drawImage(Resources.get(resource), (col + this.offset.x) * this.pixelsPerTileUnit.x, row * this.pixelsPerTileUnit.y - this.pixelsPerElevationUnit.y * z + this.maxElevation);
    }
    switch (this.currentMap.textureMap[col + numCols * row]) {
      case 'wb':
      case 'gb':
      case 'sb':
        resource = 'images/Rock.png';
        ctx.drawImage(Resources.get(resource), (col + this.offset.x) * this.pixelsPerTileUnit.x, row * this.pixelsPerTileUnit.y - this.pixelsPerElevationUnit.y * z + this.maxElevation);
        break;
    }

  }
}

/*
As the randomMap scrolls new tiles are generated before they enter the canvas as old ones are deleated when they leave the canvas.
*/
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

/*
The world update checks for the randomMap which is the scrolling map. If random map is in use, then it updates the offset.x property for a simulated tracking shot.
*/
World.prototype.update = function(dt) {
  cl('world update');
  if (this.currentMap === this.randomMap){
    this.offset.x += dt;
    if (this.offset.x >= 0) {
      this.createRandomMapColumn(this.randomMap);
      this.offset.x = -1;
    }
  }else{
    this.offset.x = 0;
  }
}



/*
World.prototype.checkVictory = function()  {
    if (game.running === 1) {
        var collisionZone = 50;
        if ((Math.abs(game.princess.x - game.controlling.x) < collisionZone) &&
                (Math.abs(game.princess.y - game.controlling.y) < collisionZone)) {
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