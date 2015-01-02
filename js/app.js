// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// 5 * colSize = 101, 6 * rowSize = 83

var allEnemies = [];

for (var i = 1; i < 4; i++){
    allEnemies.push(function(){
        return new Enemy( -1, Math.ceil(i/2), 3, 1);
    }());
    console.log(allEnemies[0]);
}

var player = new Player( 4, 7, 5, 1, 2);

var allCollectables = [];
for (var i = 0; i < 7; i++){
    allCollectables.push(function(){
        return new Collectable( Math.floor(Math.random()*10), Math.floor(Math.random()*4+1), 300, 0.2+0.2 *i, i);
    }());
    //console.log(allCollectables[i]);
}

var transporters = [];
for (var i = 0; i < 2; i++){
    transporters.push(function(){
        return new Transporter( Math.floor(Math.random()*4+5*i), Math.floor(Math.random()*7+1));
    }());
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
