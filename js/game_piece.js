var GamePiece = function(posX, posY, speed, scale) {
    this.speed = speed;
    this.scale = scale;
    this.tileX = posX;
    this.tileY = posY;
}

GamePiece.prototype.collisionCheck = function(gamePiece, result){
    //console.log( gamePiece.collisionCircles[0].x );
    for ( var cc in gamePiece.collisionCircles){
        var d = (gamePiece.collisionCircles[cc].x - this.collisionCircles[0].x) *
            (gamePiece.collisionCircles[cc].x - this.collisionCircles[0].x) +
            (gamePiece.collisionCircles[cc].y - this.collisionCircles[0].y) *
            (gamePiece.collisionCircles[cc].y - this.collisionCircles[0].y);
        var r = (gamePiece.collisionCircles[cc].r + this.collisionCircles[0].r) *
             (gamePiece.collisionCircles[cc].r + this.collisionCircles[0].r);
        if (d < r) {
            console.log(gamePiece);
            result(gamePiece);
        }
    }
}

GamePiece.prototype.update = function(dt) {
    this.x = -101/2 * this.scale + this.tileX * 101 + 101/2;
    this.y = -120 * this.scale + this.tileY * 83 + 83;
    this.collisionCircles[0].x = this.x + (101/2 + 1) * this.scale;
    this.collisionCircles[0].y = this.y + 95 * this.scale;
//    console.log(this.y);
//    this.sprite = this.types[this.type].sprite;
//    this.name = this.types[this.type].name;
}

GamePiece.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 101 * this.scale, 171 * this.scale);
    ctx.beginPath();
    ctx.arc(this.x + (101/2 + 1) * this.scale, this.y + 125 * this.scale, this.collisionCircles[0].r * this.scale, 0, 2 * Math.PI, false);
    ctx.fill();
};
