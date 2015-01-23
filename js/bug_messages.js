var sendbugMessage = function(dt, bugMessage) {
  for (i = 0; i < bugMessage.length; i++) {
    //console.log(bugMessage[i][4]);
    //console.log(dt);
    if (bugMessage[i][4] < 0) {  //if the time offset is less than 0
      var bugValues = bugMessage.shift(),
        e = new Enemy();
      e.initMessageBug(bugValues);
      game.allEnemies.push(e);
    } else {
      bugMessage[i][4] -= 10 * dt;
    }
  }
}

/*
createBugMessage creates a 2D array of bugs with initiatioon values and a time offset value. sendBugMessage loops through each bug element and decrements index 4 until it is less than zero then the bug is created and sent on it's way. Hopefully in a recognizable pattern!  The values stored in each array are
position.x, position.y, speed, scale, time offset.
*/
var createBugMessage = function(message) {
  var bugMessageFormation = [];
  for (var characterIndex = 0, bugCols = 0; characterIndex < message.length; characterIndex++) {
    bugCols += 1;
    var character = bugCharacterFormation(message[characterIndex]);
    //        console.log(character);
    for (var j = 0; j < character[0].length; j++) { // Array index is ordered as such to send out columns at a time
      bugCols += 1;
      for (var i = 0; i < character.length; i++) {
        if (character[i][j] >= 1) {
          //console.log(character[i][j]);
          bugMessageFormation.push([10, i + 3, -1 * character[i][j] * 2, character[i][j], bugCols + j/4 ]);
        }
      }
    }
  }
  return bugMessageFormation;
};

var bugCharacterFormation = function(character) {
  var bugArray = [];
  switch (character) {
    case ">":
      bugArray = [
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1],
        [0, 1, 0],
        [1, 0, 0]
      ];
      break;
    case "<":
      bugArray = [
        [0, 0, 1],
        [0, 1, 0],
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1]
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
        [0, 1, 0, 1, 0, 0],
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