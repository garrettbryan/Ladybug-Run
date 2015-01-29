/* Engine.js
 * This file provides the game loop functionality (update entities and render),
 * draws the initial game board on the screen, and then calls the update and
 * render methods on your player and enemy objects (defined in your app.js).
 *
 * A game engine works by drawing the entire game screen over and over, kind of
 * like a flipbook you may have created as a kid. When your player moves across
 * the screen, it may look like just that image/character is moving or being
 * drawn but that is not the case. What's really happening is the entire "scene"
 * is being drawn over and over, presenting the illusion of animation.
 *
 * This engine is available globally via the Engine variable and it also makes
 * the canvas' context (ctx) object globally available to make writing app.js
 * a little simpler to work with.
 */

var clg = 0,
  cgg = 0,
  ceg = 0,
  cpg = 0,
  crg = 0,
  cycle = 0;

cr = function(log) {
  if (crg === 1) {
    console.log(log);
  }
};

cp = function(log) {
  if (cpg === 1) {
    console.log(log);
  }
};

cl = function(log) {
  if (clg === 1) {
    console.log(log);
  }
};

cg = function(log) {
  if (cgg === 1) {
    console.log(log);
  }
};

ce = function(log) {
  if (ceg === 1) {
    console.log(log);
  }
};


var Engine = (function(global) {
  cl('engine');
  /* Predefine the variables we'll be using within this scope,
   * create the canvas element, grab the 2D context for that canvas
   * set the canvas elements height/width and add it to the DOM.
   */
  var doc = global.document,
    win = global.window,
    canvas = doc.createElement('canvas'),
    ctx = canvas.getContext('2d'),

    lastTime;

  canvas.width = 1010;
  canvas.height = 808;
  doc.body.appendChild(canvas);

  /* This function serves as the kickoff point for the game loop itself
   * and handles properly calling the update and render methods.
   */
  function main() {
    cl('engine main ' + cycle);
    cycle++;
    /* Get our time delta information which is required if your game
     * requires smooth animation. Because everyone's computer processes
     * instructions at different speeds we need a constant value that
     * would be the same for everyone (regardless of how fast their
     * computer is) - hurray time!
     */
    var now = Date.now(),
      dt = (now - lastTime) / 1000.0;

    /* Call our update/render functions, pass along the time delta to
     * our update function since it may be used for smooth animation.
     */
  //  console.log(game.world.bugMessage);
    //sendbugMessage(dt, game.world.bugMessage);
    //console.log(game.allEnemies.length);
    update(dt);
    render();
    //game.world.renderTitleScreenMap(dt);
    /* Set our lastTime variable which is used to determine the time delta
     * for the next time this function is called.
     */
    lastTime = now;

    /*
    lastPlayerState can be compared to the current player.active property to determine if there has been a change. If there has been a change then to reset the canvas window.
    */
    lastPlayerState = game.allPlayers[0].active;

    /* Use the browser's requestAnimationFrame function to call this
     * function again as soon as the browser is able to draw another frame.
     */
       win.requestAnimationFrame(main);
  };

  /* This function does some initial setup that should only occur once,
   * particularly setting the lastTime variable that is required for the
   * game loop.
   */
  function init() {
    cl('engine initilize');
    reset();
    lastTime = Date.now();
    lastPlayerState = game.allPlayers[0].active;
    console.log("last player state = " + lastPlayerState);
    main();
  }

  /* This function is called by main (our game loop) and itself calls all
   * of the functions which may need to update entity's data. Based on how
   * you implement your collision detection (when two entities occupy the
   * same space, for instance when your character should die), you may find
   * the need to add an additional function call here. For now, we've left
   * it commented out - you may or may not want to implement this
   * functionality this way (you could just implement collision detection
   * on the entities themselves within your app.js file).
   */
  function update(dt) {
    cl('engine update')
    game.world.updateTime(dt);

    if (game.world.checkDefeat()) {
      reset();
    }

    if (game.world.checkVictory()) {
      reset();
    }

    if (game.world.activateComponents(lastPlayerState !== game.allPlayers[0].active)){
      reset();
    }

    updateEntities(dt);
    // checkCollisions();
  }

  /* This is called by the update function  and loops through all of the
   * objects within your allEnemies array as defined in app.js and calls
   * their update() methods. It will then call the update function for your
   * player object. These update methods should focus purely on updating
   * the data/properties related to  the object. Do your drawing in your
   * render methods.
   */
  function updateEntities(dt) {
    cl(' update entities');

    game.allGoals.forEach(function(goal){
      goal.update(dt);
    });

    game.allTransporters.forEach(function(transporter) {
        transporter.update(dt);
    });

    game.allCollectables.forEach(function(collectable) {
      collectable.update(dt);
    });

    game.messageBugs.update(dt);

    game.world.update(dt);

    game.allPlayers[0].update();

    game.allEnemies.forEach(function(enemy) {
      enemy.update(dt);
    });

    game.boss.update(dt);

    /*
            allCollectables.forEach(function(collectable) {
                collectable.update(dt);
            });

            allEnemies.forEach(function(enemy) {
                enemy.update(dt);
            });
            //cl(dt);
            allPlayers[4].move(dt);

            transporters.forEach(function(transporter) {
                transporter.update(dt);
            });

            if (allPlayers.length > 0){
                allPlayers[0].update(dt);
            }

            allPlayers.forEach(function(player){
                player.catchIt();
                player.wait();
            });
    */
  }

  /* This function initially draws the "game level", it will then call
   * the renderEntities function. Remember, this function is called every
   * game tick (or loop of the game engine) because that's how games work -
   * they are flipbooks creating the illusion of animation but in reality
   * they are just drawing the entire screen over and over.
   */
  function render() {
    cr('engine render');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    game.renderStatusBar();

    var numRows = game.world.currentMap.totalTiles.y,
      numCols = game.world.currentMap.totalTiles.x,
      row, col;

    /* Loop through the number of rows and columns we've defined above
     * and, using the rowImages array, draw the correct image for that
     * portion of the "grid"
     */
    for (row = 0; row < numRows; row++) {
      /* The drawImage function of the canvas' context element
       * requires 3 parameters: the image to draw, the x coordinate
       * to start drawing and the y coordinate to start drawing.
       * We're using our Resources helpers to refer to our images
       * so that we get the benefits of caching these images, since
       * we're using them over and over.
       */
      // Modified so that it reads the tileMap array in world.

      game.world.render(row, numCols);
      renderEntities(row);
    }
      //game.renderTitle();
      game.allMenus[0].render();

    //        game.enemy.renderNavPoints();
  }

  /* This function is called by the render function and is called on each game
   * tick. It's purpose is to then call the render functions you have defined
   * on your enemy and player entities within app.js
   */
  function renderEntities(row) {
    cr(' render entities row:' + row);

    game.allGoals.forEach(function(goal){
      goal.renderColorPulse(row);
    });

    game.allTransporters.forEach(function(transporter) {
        transporter.render(row);
    });

    game.allCollectables.forEach(function(collectable) {
      collectable.render(row);
      //            console.log("render Collectable");
    });
    //        game.enemy.render(row);

    game.messageBugs.render(row);

    game.allEnemies.forEach(function(enemy) {
      enemy.render(row);
    });

    game.allPlayers.forEach(function(player){
      player.render(row);
    })

    game.boss.render(row);

    game.allGoals.forEach(function(goal){
      goal.renderColorPulseForeground(row);
    });

    /* Loop through all of the objects within the allEnemies array and call
     * the render function you have defined.
     */

    /*
            transporters.forEach(function(transporter) {
                transporter.render();
            });

            allCollectables.forEach(function(collectable) {
                collectable.render();
            });

            allEnemies.forEach(function(enemy) {
                enemy.render();
            });

            allPlayers.forEach(function(player){
                player.render();
            });
    */
  }

/*
The reset function resets the canvas to display the currentMap. It turns off all components so that game.world.activateComponents can initialize the exiting components to their new locations.
*/
  function reset() {
    console.log("engine reset");
    game.world.init();//determine canvas size.

    game.allMenus[0].layout(game.world);//measures canvas size for proportional placement of titles

    canvas.width = game.world.canvasSize.x;
    canvas.height = game.world.canvasSize.y;



    //game.allPlayers.init(game.world.currentMap.playerStartTile);

 //   game.allEnemies.forEach(function(enemy) {
// //     //enemy.simpleInit();
// //   });
//
// //   game.allCollectables.forEach(function(collectable) {
// //   //  collectable.init();
// //   });
//
// //   if (game.world.currentMap.hasOwnProperty('bossStartTile')) {
// //     game.boss.cutscene(game.world.currentMap.bossStartTile);
// //     //console.log(game.boss.tile);
// //     //console.log(game.boss.position);
// //     game.boss.active = true;
// //   }
//
// //   //console.log(game.world.currentMap);
// //   if (game.world.currentMap.hasOwnProperty('goalTile')){
// //     game.allGoals.forEach(function(goal){
// //       goal.notNeeded();
// //     });
// //     var i = 0;
// //     game.world.currentMap.goalTile.forEach(function (tile){
// //       game.allGoals[i].init(tile);
// //       i++;
// //     });
//
 //     for (var i = 0; i < 2; i++){
 //         game.allTransporters[i].init();
 //     }
  //  }

  }

  /* Go ahead and load all of the images we know we're going to need to
   * draw our game level. Then set init as the callback method, so that when
   * all of these images are properly loaded our game will start.
   */
  Resources.load([
    'images/char-boy.png',
    'images/char-cat-girl.png',
    'images/char-horn-girl.png',
    'images/char-pink-girl.png',
    'images/char-princess-girl.png',
    'images/enemy-bug-front_sprite_sheet.png',
    'images/enemy-bug_sprite_sheet.png',
    'images/Gem Blue.png',
    'images/Gem Green.png',
    'images/Gem Orange.png',
    'images/grass-block.png',
    'images/Heart.png',
    'images/Key.png',
    'images/Rock.png',
    'images/Selector.png',
    'images/Star.png',
    'images/stone-block.png',
    'images/water-block.png',
    'images/white-block.png'
  ]);
  cl('resources');
  Resources.onReady(init);

  /* Assign the canvas' context object to the global variable (the window
   * object when run in a browser) so that developer's can use it more easily
   * from within their app.js files.
   */
  global.ctx = ctx;
})(this);