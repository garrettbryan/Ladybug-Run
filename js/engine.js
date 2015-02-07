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

var Engine = (function(global) {
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
    update(dt);
    render();

    /* Set our lastTime variable which is used to determine the time delta
     * for the next time this function is called.
     */
    lastTime = now;

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
    reset();
    lastTime = Date.now();
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

   /*
  update first increments time in the game, then checks for either a gameover
  or victory condition.
   */
  function update(dt) {
    game.world.updateTime(dt);

    if (game.world.levelCompleteCondition()) {
      reset();
    }

    if (game.refresh){
      console.log("refresh");
      game.world.activateComponents(game.refresh);
      game.refresh = false;
      reset();
    }

    updateEntities(dt);
  }

  /* This is called by the update function  and loops through all of the
   * objects within your allEnemies array as defined in app.js and calls
   * their update() methods. It will then call the update function for your
   * player object. These update methods should focus purely on updating
   * the data/properties related to  the object. Do your drawing in your
   * render methods.
   */
   /*
  If the game.refresh condition is set to true during the update, then a major
  game event has taken place, and the current level will be replaced.
   */
  function updateEntities(dt) {

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

    game.controlling.update();

    game.allPlayers.forEach(function(player){
      if (game.notControlling(player)){
        player.catchIt();
      }
    });

    game.allEnemies.forEach(function(enemy) {
      enemy.update(dt);
    });

    game.boss.update(dt);

    game.update();

    if (game.refresh) {
      update(dt);
    }
  }

  /* This function initially draws the "game level", it will then call
   * the renderEntities function. Remember, this function is called every
   * game tick (or loop of the game engine) because that's how games work -
   * they are flipbooks creating the illusion of animation but in reality
   * they are just drawing the entire screen over and over.
   */
   /*
   I modified the render function to render by row--background to foreground--
   to maintain the illusion of depth. Also if a collectable is a projectile then
   it renders outside of the row rendering logic.
   */
  function render() {

    game.world.renderBackground(canvas);

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

      game.world.render(row, numCols);
      renderEntities(row);
    }

    game.allCollectables.forEach(function(collectable) {
      if (collectable.projectile){
        collectable.render();
      }
    });
  }

  /* This function is called by the render function and is called on each game
   * tick. It's purpose is to then call the render functions you have defined
   * on your enemy and player entities within app.js
   */
  function renderEntities(row) {

    game.allGoals.forEach(function(goal){
      goal.renderColorPulse(row);
    });

    game.allTransporters.forEach(function(transporter) {
        transporter.render(row);
    });

    game.allCollectables.forEach(function(collectable) {
      collectable.render(row);
    });

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

    if (game.world.cutscene || game.level === 0 || game.victory || game.defeat){
        game.currentMenu.render();
    }
  }

/*
The reset function resets the canvas to display the currentMap. It turns off all
 components so that game.world.activateComponents can initialize the exiting
 components to their new locations.
 game.world.init calculates required canvas size
 menu.layout measures canvas size for proportional placement of titles
*/
  function reset() {

    game.world.init();

    game.allMenus[0].layout(game.world);
    game.allMenus[1].layout(game.world);
    game.allMenus[2].layout(game.world);
    game.allMenus[3].layout(game.world);

    canvas.width = game.world.canvasSize.x;
    canvas.height = game.world.canvasSize.y;
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
    'images/white-block.png',
    'images/Polarlicht_2.png'
  ]);
  Resources.onReady(init);

  /* Assign the canvas' context object to the global variable (the window
   * object when run in a browser) so that developer's can use it more easily
   * from within their app.js files.
   */
  global.ctx = ctx;
})(this);