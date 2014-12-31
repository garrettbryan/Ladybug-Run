var GamePiece = function(posX, posY, speed, scale) {
    this.speed = speed;
    this.scale = scale;
    this.tileX = posX;
    this.tileY = posY;
}

GamePiece.prototype.collisionCheck = function(gamePiece){
    //console.log( gamePiece.collisionCircles[0].x );
    for ( var cc in gamePiece.collisionCircles){
        var d = (gamePiece.collisionCircles[cc].x - this.collisionCircles[0].x) *
            (gamePiece.collisionCircles[cc].x - this.collisionCircles[0].x) +
            (gamePiece.collisionCircles[cc].y - this.collisionCircles[0].y) *
            (gamePiece.collisionCircles[cc].y - this.collisionCircles[0].y);
        var r = (gamePiece.collisionCircles[cc].r + this.collisionCircles[0].r) *
             (gamePiece.collisionCircles[cc].r + this.collisionCircles[0].r);
        if (d < r) {
            this.death();
        } //else {
         //   return false;
        //}
        //console.log(d + ' ' + r);
    }
}