var Goal = function(tile) {
  this.scale = 1;
  GamePiece.call(this);

//  this.center = { //This value will change based on the sprite
//    x: this.spriteDimensions.x / 2,
//    y: 125 * this.scale
//  };

  this.center = { //This value will change based on the sprite
    x: 101/2,
    y: 125
  };

  this.sprite = 'images/Selector.png';
  this.elementName = 'Goal';

  this.fadeMax = 2000;
  this.fadeMin = 1000;
  this.renderCount = this.fadeMin;
  this.renderFadeIncrement = 1/this.fadeMax;
  this.renderFadeUp = 1;
}

Goal.prototype = Object.create(GamePiece.prototype);
Goal.prototype.constructor = Goal;

Goal.prototype.init = function(tile){
  this.tile = tile;
  this.draw = true;
}

Goal.prototype.update = function(dt){
  this.calculatePosition();

}

Goal.prototype.renderColorPulse = function(row){
  ctx.save();
  ctx.globalAlpha = this.renderCount * this.renderFadeIncrement;
  this.render(row);
  ctx.restore();
    this.renderCount += this.renderFadeUp;
  if (this.renderCount === this.fadeMax || this.renderCount === this.fadeMin){
    this.renderFadeUp *= -1;
    console.log(this.renderFadeUp);
  }
  //  console.log(this.renderCount * this.renderFadeIncrement);
}

Goal.prototype.renderColorPulseForeground = function(row){
  ctx.save();
  ctx.globalAlpha = this.renderCount * this.renderFadeIncrement * 0.5;
  this.renderForeground(row);
  ctx.restore();
  //  console.log(this.renderCount * this.renderFadeIncrement);
}

Goal.prototype.renderForeground = function(row) {
  cg('GamePiece ' + this.name + ' render' + row);
  if (this.draw) {
    if (!row) {
      row = Math.ceil(this.tile.y);
    }
    if (Math.ceil(this.tile.y) === row) {
      ctx.drawImage(Resources.get(this.sprite),
        this.sx, this.sy, this.sWidth, this.sHeight - 83,
        this.position.x - this.center.x + this.offset.x,
        this.position.y - this.center.y - this.offset.y,
        this.spriteDimensions.x, this.spriteDimensions.y);
    }
  }
};