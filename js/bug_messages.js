/*
BugMessage creates a 2D array of bugs with initiatioon values and a time offset value. sendBugMessage loops through each bug element and decrements index 4 until it is less than zero then the bug is created and sent on it's way. Hopefully in a recognizable pattern!  The values stored in the 2D array are:
position.x, position.y, speed, scale, time offset.
*/

var BugMessage = function() {
  this.bugProperties = [];
  this.allbugs = [];
};

/*
createBugMessage creates a 2D array of bugs with initiatioon values and a time offset value. sendBugMessage loops through each bug element and decrements index 4 until it is less than zero then the bug is created and sent on it's way. Hopefully in a recognizable pattern!  The values stored in each array are
tile.x, tile.y, speed, scale, time offset.
*/
BugMessage.prototype.create = function(message){
  cl('bugmessage create');
  this.bugProperties = [];
  this.allbugs = [];
  var character;
  for (var i = 0, bugCols = 0; i < message.length; i++) { //i is the message index
    bugCols += 1; // this variable spaces out the columns of bugs
    character = this.bugCharacters(message[i]);
    ////console.log(message[i]);
    for (var j = 0; j < character[0].length; j++) { //j is the col index
      bugCols += 1;
      for (var k = 0; k < character.length; k++) {//k is the row index
        if (character[k][j] >= 1) {
          this.bugProperties.push([game.world.currentMap.totalTiles.x + 1, k + 3, -1 * character[k][j] * 2, character[k][j], bugCols + j/4 - 2 ]); //
        }
      }
    }
  }
  ////console.log(this.bugProperties);
};

BugMessage.prototype.erase = function(){
  this.bugProperties = [];
  this.allbugs = [];
};

/*
sendBugMessage decrements the time offset value until it reaches zero, then it creates a bug and allows the enemy update funtion to work.
*/
BugMessage.prototype.update = function(dt) {
  for (var i = 0; i < this.bugProperties.length; i++) {
    ////console.log(this.bugProperties[i][4]);
    ////console.log(dt);
    if (this.bugProperties[i][4] <= 0) {  //if the time offset is less than 0
      var bugValues = this.bugProperties.shift(),
        e = new Enemy();
      e.initMessageBug(bugValues);
      e.draw = true;
      e.active = true;
      ////console.log(e);
      this.allbugs.push(e);
    } else {
      this.bugProperties[i][4] -= 10 * dt;
    }
  }
  this.allbugs.forEach(function(enemy) {
    enemy.cutsceneUpdate(dt);
  });

  ////console.log(this.allbugs.length);;

  if (this.allbugs.length > 0 && game.controlling.active){
    this.allbugs = [];
  }

  if (this.allbugs && this.allbugs.length && this.allbugs[this.allbugs.length-1].position.x < -101) {
    this.erase();
    //console.log("bug erase");
//    game.controlling.active = true;
//    game.active = true;
//    game.nextLevel();
//    game.startLevel(false);
  }
}

BugMessage.prototype.render = function(row){
  for (var i = 0; i < this.allbugs.length; i++) {
    this.allbugs[i].render(row);
  }

//  this.allbugs.forEach(function(enemy){
//    enemy.render(row);
//  });
}

BugMessage.prototype.bugCharacters = function(character) {
  var bugArray = [];
  switch (character) {
    case ">":
      bugArray = [
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 0],
        [0, 1, 0, 0],
        [1, 0, 0, 0]
      ];
      break;
    case "<":
      bugArray = [
        [0, 0, 1, 0],
        [0, 1, 0, 0],
        [1, 0, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 0]
      ];
      break;
    case ".":
      bugArray = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
        [1, 1, 0],
        [1, 1, 0]
      ];
      break;
    case "'":
      bugArray = [
        [1, 1, 0],
        [1, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ];
      break;
    case " ":
      bugArray = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ];
      break;
    case "!":
      bugArray = [
        [1, 0],
        [1, 0],
        [1, 0],
        [0, 0],
        [1, 0]
      ];
      break;
    case "A":
      bugArray = [
        [0, 0, 1, 0, 0, 0],
        [0, 1, 0, 1, 0, 0],
        [1, 0, 0, 0, 1, 0],
        [1, 1, 1, 1, 1, 0],
        [1, 0, 0, 0, 1, 0]
      ];
      break;
    case "a":
      bugArray = [
        [0, 0, 0, 0, 0],
        [0, 1, 1, 0, 0],
        [1, 0, 0, 1, 0],
        [1, 0, 1, 1, 0],
        [0, 1, 0, 1, 0]
      ];
      break;
    case "B":
      bugArray = [
        [1, 1, 1, 0, 0],
        [1, 0, 0, 1, 0],
        [1, 1, 1, 0, 0],
        [1, 0, 0, 1, 0],
        [1, 1, 1, 0, 0]
      ];
      break;
    case "b":
      bugArray = [
        [1, 0, 0, 0, 0],
        [1, 1, 1, 0, 0],
        [1, 0, 0, 1, 0],
        [1, 0, 0, 1, 0],
        [1, 1, 1, 0, 0]
      ];
      break;
    case "C":
      bugArray = [
        [0, 1, 1, 1, 0],
        [1, 0, 0, 0, 0],
        [1, 0, 0, 0, 0],
        [1, 0, 0, 0, 0],
        [0, 1, 1, 1, 0]
      ];
      break;
    case "c":
      bugArray = [
        [0, 0, 0, 0],
        [0, 1, 1, 0],
        [1, 0, 0, 0],
        [1, 0, 0, 0],
        [0, 1, 1, 0]
      ];
      break;
    case "D":
      bugArray = [
        [1, 1, 1, 0, 0],
        [1, 0, 0, 1, 0],
        [1, 0, 0, 1, 0],
        [1, 0, 0, 1, 0],
        [1, 1, 1, 0, 0]
      ];
      break;
    case "d":
      bugArray = [
        [0, 0, 0, 1, 0],
        [0, 1, 1, 1, 0],
        [1, 0, 0, 1, 0],
        [1, 0, 0, 1, 0],
        [0, 1, 1, 1, 0]
      ];
      break;
    case "E":
      bugArray = [
        [1, 1, 1, 1, 0],
        [1, 0, 0, 0, 0],
        [1, 1, 1, 0, 0],
        [1, 0, 0, 0, 0],
        [1, 1, 1, 1, 0]
      ];
      break;
    case "e":
      bugArray = [
        [0, 0, 0, 0, 0, 0],
        [0, 1, 1, 0, 0, 0],
        [1, 1, 0, 1, 0, 0],
        [1, 0, 1, 0, 0, 0],
        [0, 1, 1, 1, 0, 0]
      ];
      break;
    case "F":
      bugArray = [
        [1, 1, 1, 1, 0],
        [1, 0, 0, 0, 0],
        [1, 1, 1, 0, 0],
        [1, 0, 0, 0, 0],
        [1, 0, 0, 0, 0]
      ];
      break;
    case "f":
      bugArray = [
        [0, 0, 1, 0],
        [0, 1, 0, 0],
        [1, 1, 1, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0]
      ];
      break;
    case "G":
      bugArray = [
        [0, 1, 1, 1, 1, 0],
        [1, 0, 0, 0, 0, 0],
        [1, 0, 1, 1, 0, 0],
        [1, 0, 0, 0, 1, 0],
        [0, 1, 1, 1, 1, 0]
      ];
      break;
    case "g":
      bugArray = [
        [0, 0, 0, 0, 0],
        [0, 1, 1, 0, 0],
        [1, 0, 0, 1, 0],
        [1, 0, 0, 1, 0],
        [0, 1, 1, 1, 0],
        [0, 0, 0, 1, 0],
        [1, 1, 1, 0, 0]
      ];
      break;
    case "H":
      bugArray = [
        [1, 0, 0, 1, 0],
        [1, 0, 0, 1, 0],
        [1, 1, 1, 1, 0],
        [1, 0, 0, 1, 0],
        [1, 0, 0, 1, 0]
      ];
      break;
    case "h":
      bugArray = [
        [1, 0, 0, 0, 0],
        [1, 0, 0, 0, 0],
        [1, 1, 1, 0, 0],
        [1, 0, 0, 1, 0],
        [1, 0, 0, 1, 0]
      ];
      break;
    case "I":
      bugArray = [
        [1, 1, 1, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [1, 1, 1, 0]
      ];
      break;
    case "i":
      bugArray = [
        [ 1, 0, 0],
        [ 0, 0, 0],
        [ 1, 0, 0],
        [ 1, 0, 0],
        [ 0, 1, 0]
      ];
      break;
    case "J":
      bugArray = [
        [0, 0, 0, 1, 1, 0],
        [0, 0, 0, 0, 1, 0],
        [0, 0, 0, 0, 1, 0],
        [0, 1, 0, 0, 1, 0],
        [0, 0, 1, 1, 0, 0]
      ];
      break;
    case "j":
      bugArray = [
        [ 0, 1, 0],
        [ 0, 0, 0],
        [ 0, 1, 0],
        [ 0, 1, 0],
        [ 1, 0, 0]
      ];
      break;
    case "K":
      bugArray = [
        [1, 0, 0, 1, 0],
        [1, 0, 1, 0, 0],
        [1, 1, 0, 0, 0],
        [1, 0, 1, 0, 0],
        [1, 0, 0, 1, 0]
      ];
      break;
    case "k":
      bugArray = [
        [1, 0, 0, 0],
        [1, 0, 1, 0],
        [1, 1, 0, 0],
        [1, 1, 0, 0],
        [1, 0, 1, 0]
      ];
      break;
    case "L":
      bugArray = [
        [1, 0, 0, 0, 0],
        [1, 0, 0, 0, 0],
        [1, 0, 0, 0, 0],
        [1, 0, 0, 0, 0],
        [1, 1, 1, 1, 0]
      ];
      break;
    case "l":
      bugArray = [
        [ 1, 1, 0, 0],
        [ 0, 1, 0, 0],
        [ 0, 1, 0, 0],
        [ 0, 1, 0, 0],
        [ 0, 0, 1, 0]
      ];
      break;
    case "M":
      bugArray = [
        [1, 0, 0, 0, 1, 0],
        [1, 1, 0, 1, 1, 0],
        [1, 0, 1, 0, 1, 0],
        [1, 0, 0, 0, 1, 0],
        [1, 0, 0, 0, 1, 0]
      ];
      break;
    case "m":
      bugArray = [
        [0, 0, 0, 0, 0, 0],
        [1, 1, 0, 1, 0, 0],
        [1, 0, 1, 0, 1, 0],
        [1, 0, 1, 0, 1, 0],
        [1, 0, 1, 0, 1, 0]
      ];
      break;
    case "N":
      bugArray = [
        [1, 0, 0, 0, 1, 0],
        [1, 1, 0, 0, 1, 0],
        [1, 0, 1, 0, 1, 0],
        [1, 0, 0, 1, 1, 0],
        [1, 0, 0, 0, 1, 0]
      ];
      break;
    case "n":
      bugArray = [
        [0, 0, 0, 0],
        [1, 1, 0, 0],
        [1, 0, 1, 0],
        [1, 0, 1, 0],
        [1, 0, 1, 0]
      ];
      break;
    case "O":
      bugArray = [
        [0, 1, 1, 1, 0, 0],
        [1, 0, 0, 0, 1, 0],
        [1, 0, 0, 0, 1, 0],
        [1, 0, 0, 0, 1, 0],
        [0, 1, 1, 1, 0, 0]
      ];
      break;
    case "o":
      bugArray = [
        [0, 0, 0, 0, 0],
        [0, 1, 1, 0, 0],
        [1, 0, 0, 1, 0],
        [1, 0, 0, 1, 0],
        [0, 1, 1, 0, 0]
      ];
      break;
    case "P":
      bugArray = [
        [1, 1, 1, 0, 0],
        [1, 0, 0, 1, 0],
        [1, 0, 0, 1, 0],
        [1, 1, 1, 0, 0],
        [1, 0, 0, 0, 0],
        [1, 0, 0, 0, 0]
      ];
      break;
    case "p":
      bugArray = [
        [0, 0, 0, 0, 0],
        [1, 1, 1, 0, 0],
        [1, 0, 0, 1, 0],
        [1, 0, 0, 1, 0],
        [1, 1, 1, 0, 0],
        [1, 0, 0, 0, 0],
        [1, 0, 0, 0, 0]
      ];
      break;
    case "Q":
      bugArray = [
        [0, 1, 1, 0, 0, 0],
        [1, 0, 0, 1, 0, 0],
        [1, 0, 1, 1, 0, 0],
        [1, 0, 0, 1, 0, 0],
        [0, 1, 1, 0, 1, 0]
      ];
      break;
    case "q":
      bugArray = [
        [ 0, 0, 0, 0, 0],
        [ 0, 1, 1, 0, 0],
        [ 1, 0, 0, 1, 0],
        [ 1, 0, 0, 1, 0],
        [ 0, 1, 1, 1, 0],
        [ 0, 0, 0, 1, 0],
        [ 0, 1, 1, 1, 0]
      ];
      break;
    case "R":
      bugArray = [
        [1, 1, 1, 0, 0],
        [1, 0, 0, 1, 0],
        [1, 1, 1, 0, 0],
        [1, 0, 1, 0, 0],
        [1, 0, 0, 1, 0]
      ];
      break;
    case "r":
      bugArray = [
        [0, 0, 0, 0, 0],
        [1, 0, 1, 0, 0],
        [1, 1, 0, 1, 0],
        [1, 0, 0, 0, 0],
        [1, 0, 0, 0, 0]
      ];
      break;
    case "S":
      bugArray = [
        [0, 1, 1, 1, 0, 0],
        [1, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 0, 0],
        [0, 0, 0, 0, 1, 0],
        [0, 1, 1, 1, 0, 0]
      ];
      break;
    case "s":
      bugArray = [
        [ 0, 0, 0, 0],
        [ 0, 1, 1, 0],
        [ 1, 1, 0, 0],
        [ 0, 1, 1, 0],
        [ 1, 1, 0, 0]
      ];
      break;
    case "T":
      bugArray = [
        [1, 1, 1, 1, 1, 0],
        [0, 0, 1, 0, 0, 0],
        [0, 0, 1, 0, 0, 0],
        [0, 0, 1, 0, 0, 0],
        [0, 0, 1, 0, 0, 0]
      ];
      break;
    case "t":
      bugArray = [
        [0, 1, 0, 0],
        [1, 1, 1, 0],
        [0, 1, 0, 0],
        [0, 1, 0, 0],
        [0, 0, 1, 0]
      ];
      break;
    case "U":
      bugArray = [
        [1, 0, 0, 0, 1, 0],
        [1, 0, 0, 0, 1, 0],
        [1, 0, 0, 0, 1, 0],
        [1, 0, 0, 0, 1, 0],
        [0, 1, 1, 1, 0, 0]
      ];
      break;
    case "u":
      bugArray = [
        [0, 0, 0, 0, 0],
        [1, 0, 0, 1, 0],
        [1, 0, 0, 1, 0],
        [1, 0, 0, 1, 0],
        [0, 1, 1, 1, 0]
      ];
      break;
    case "V":
      bugArray = [
        [1, 0, 0, 0, 1, 0],
        [1, 0, 0, 0, 1, 0],
        [0, 1, 0, 1, 0, 0],
        [0, 1, 0, 1, 0, 0],
        [0, 0, 1, 0, 0, 0]
      ];
      break;
    case "v":
      bugArray = [
        [0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 1, 0],
        [0, 1, 0, 1, 0, 0],
        [0, 1, 0, 1, 0, 0],
        [0, 0, 1, 0, 0, 0]
      ];
      break;
    case "W":
      bugArray = [
        [1, 0, 0, 0, 1, 0],
        [1, 0, 0, 0, 1, 0],
        [1, 0, 1, 0, 1, 0],
        [1, 0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0, 0]
      ];
      break;
    case "w":
      bugArray = [
        [0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 1, 0],
        [1, 0, 1, 0, 1, 0],
        [1, 0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0, 0]
      ];
      break;
    case "X":
      bugArray = [
        [1, 0, 0, 0, 1, 0],
        [0, 1, 0, 1, 0, 0],
        [0, 0, 1, 0, 0, 0],
        [0, 1, 0, 1, 0, 0],
        [1, 0, 0, 0, 1, 0]
      ];
      break;
    case "x":
      bugArray = [
        [0, 0, 0, 0, 0, 0],
        [0, 1, 0, 1, 0, 0],
        [0, 0, 1, 0, 0, 0],
        [0, 0, 1, 0, 0, 0],
        [0, 1, 0, 1, 0, 0]
      ];
      break;
    case "Y":
      bugArray = [
        [1, 0, 0, 0, 1, 0],
        [0, 1, 0, 1, 0, 0],
        [0, 0, 1, 0, 0, 0],
        [0, 0, 1, 0, 0, 0],
        [0, 0, 1, 0, 0, 0]
      ];
      break;
    case "y":
      bugArray = [
        [0, 0, 0, 0, 0, 0],
        [0, 1, 0, 0, 1, 0],
        [0, 0, 1, 1, 0, 0],
        [0, 0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0, 0],
        [0, 1, 0, 0, 0, 0]
      ];
      break;
    case "Z":
      bugArray = [
        [1, 1, 1, 1, 1, 0],
        [0, 0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0, 0],
        [0, 1, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 0]
      ];
      break;
    case "z":
      bugArray = [
        [0, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 1, 0],
        [0, 0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0, 0],
        [0, 1, 1, 1, 1, 0]
      ];
      break;

    default:
  }
  return bugArray;
}