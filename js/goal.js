/*
Goal is the game tile that allows a player character to continue to next level
*/
var Goal = function(tile) {
  this.scale = 1;
  GamePiece.call(this);

  this.center = {
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

Goal.prototype.notNeeded = function(){
  this.draw = false;
  this.active = false;
}

Goal.prototype.init = function(tile){
  this.tile = tile;
  this.draw = true;
  this.active = true;
  this.calculatePosition();
}

/*
rendering accepts a row argument to render the gamepiece in the proper order so the sprites maintain the illusion of depth. Also the goals pulsate their opacity.
*/
Goal.prototype.renderColorPulse = function(row){
  if (this.draw){
    ctx.save();
    ctx.globalAlpha = this.renderCount * this.renderFadeIncrement;
    this.render(row);
    ctx.restore();
      this.renderCount += this.renderFadeUp;
    if (this.renderCount === this.fadeMax || this.renderCount === this.fadeMin){
      this.renderFadeUp *= -1;
    }
  }
}

Goal.prototype.renderColorPulseForeground = function(row){
  if (this.draw){
    ctx.save();
    ctx.globalAlpha = this.renderCount * this.renderFadeIncrement * 0.5;
    this.renderForeground(row);
    ctx.restore();
  }
}

Goal.prototype.renderForeground = function(row) {
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