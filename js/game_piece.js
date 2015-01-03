var GamePiece = function(posX, posY, speed, scale) {
    this.speed = speed;
    this.scale = scale;
    this.tileX = posX;
    this.tileY = posY;
    this.width = 101 * this.scale;
    this.center = {
        width: 101 * this.scale / 2
    }
    this.collisions = true;

    this.x = -this.width/2 + this.tileX * 101 + 101/2;
    this.y = -123 * this.scale + this.tileY * 83 + 83;
}

GamePiece.prototype.collisionCheck = function(gamePiece, result){
    //console.log( gamePiece.collisionCircles[0].x );
    if (this.collisions){
        for ( var cc in gamePiece.collisionCircles){
            var d = (gamePiece.collisionCircles[cc].x - this.collisionCircles[0].x) *
                (gamePiece.collisionCircles[cc].x - this.collisionCircles[0].x) +
                (gamePiece.collisionCircles[cc].y - this.collisionCircles[0].y) *
                (gamePiece.collisionCircles[cc].y - this.collisionCircles[0].y);
            var r = (gamePiece.collisionCircles[cc].r + this.collisionCircles[0].r) *
                 (gamePiece.collisionCircles[cc].r + this.collisionCircles[0].r);
            if (d < r) {
                //console.log(gamePiece);
                result.call(this, gamePiece);
            }
        }
    }
}

GamePiece.prototype.update = function(dt) {
//    if (this.attachedTo){
//        this.x = this.attachedTo.x + 20 ;
//        this.y = this.attachedTo.y + 30;
//    }
    this.collisionCircles[0].x = this.x + this.collisionCircles[0].xOffset;
    this.collisionCircles[0].y = this.y  + this.collisionCircles[0].yOffset;
//    console.log(this.y);
//    this.sprite = this.types[this.type].sprite;
//    this.name = this.types[this.type].name;
}

GamePiece.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, 101 * this.scale, 171 * this.scale);
    ctx.beginPath();
    ctx.arc(this.collisionCircles[0].x, this.collisionCircles[0].y, this.collisionCircles[0].r, 0, 2 * Math.PI, false);
    ctx.stroke();
};

