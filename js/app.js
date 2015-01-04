// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

// 5 * colSize = 101, 6 * rowSize = 83

var allEnemies = [];

for (var i = 1; i < 4; i++){
    allEnemies.push(function(){
        return new Enemy( -1, i+1, 3, 1);
    }());
    console.log(allEnemies[0]);
}

var allPlayers = [];
for (var i = 0, p = 1; i < 2; i++){
    for (var j = 0; j < 2; j++, p++){
            allPlayers.push(function(){
                return new Player( 4+i, 7+j, 300, 1, p);
        }());
    }
    //console.log(allCollectables[i]);
}

var allCollectables = [];
for (var i = 0; i < 7; i++){
    allCollectables.push(function(){
        return new Collectable( Math.floor(Math.random()*10), Math.floor(Math.random()*5+2), 300, 0.3, i);
    }());
    console.log(allCollectables[i]);
}

var transporters = [];
for (var i = 0; i < 2; i++){
    transporters.push(function(){
        return new Transporter( Math.floor(Math.random()*4+5*i), Math.floor(Math.random()*5+2));
    }());
}



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

    allPlayers[0].handleInput(allowedKeys[e.keyCode]);
});
