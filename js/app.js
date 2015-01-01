// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// 5 * colSize = 101, 6 * rowSize = 83

var allEnemies = [];

for (var i = 1; i < 7; i++){
    allEnemies.push(function(){
        return new Enemy( -1, Math.ceil(i/2), 3, 2);
    }());
    console.log(allEnemies[0]);
}

var player = new Player( 4, 7, 5, 1, 2);

var allCollectables = []
for (var i = 0; i < 7; i++){
    allCollectables.push(function(){
        return new Collectable(i, i, 200, 0.20, i);
    }());
    //console.log(allCollectables[i]);
}

console.log(player);

//var mess = createBugMessage("ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz");

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        32: 'space'

    };

    player.handleInput(allowedKeys[e.keyCode]);
});
