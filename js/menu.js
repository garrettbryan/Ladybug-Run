var Menu = function(menuName) {
  this.currentMenu = '';
  this.menuName = menuName;

  this.style = {
    all: {
      fillColor: '#BB3B0B',
      shadowColor: '#000',
      shadowOffsetX : 5,
      shadowOffsetY : 5,
      shadowBlur : 5,
      textBaseLine : 'Top',
    },
    h1: {
      height: 150,
      font: 'bold 150px Sans-Serif',
    },
    h2: {
      height: 100,
      font: 'Italic 100px Sans-Serif',
    },
    h3: {
      height: 50,
      font: 'Italic 50px Sans-Serif',
    },
    h4: {
      height: 30,
      font: 'Italic 30px Sans-Serif',
    },
    active: {
      fillColor: '#f5e66d',

    }
  },

  this.menuContent = [];
}

Menu.prototype.init = function(menuName, data) {
  this.menuName = menuName;
  this.menuContent.push(data);
}

Menu.prototype.add = function(data) {
  this.menuContent.push(data);
}

/*
If the currentMenu has a menu loaded to it update it.
*/
Menu.prototype.update = function() {
  if (this.currentMenu) {
    this.currentMenu.optionSelected = 0;
  }
}

/*
Layout the titles based on the canvas size.
*/
Menu.prototype.layout = function(world, context){
  var metrics,
    verticalOffset = 0;
  for(var i = 0; i < this.menuContent.length; i++){
    metrics = this.style[this.menuContent[i].tag].height;
    verticalOffset += metrics + 0.4 * metrics * i;
    this.menuContent[i].position.x = world.canvasSize.x * 0.025;
    this.menuContent[i].position.y =  ((i === 0) ? world.canvasSize.y/4 : (world.canvasSize.y / 3)) + verticalOffset;
  }
}

/*
Layout the position of the status bar based on the size of the canvas
*/
Menu.prototype.layoutStatusBar = function(world, context){
  for(var i = 0; i < this.menuContent.length; i++){
    this.menuContent[i].position.x = world.canvasSize.x / 4 * i ;
    this.menuContent[i].position.y =  30;
  }
}

/*
Render the title.
*/
Menu.prototype.render = function(){
  for (var i = 0 ; i < this.menuContent.length; i++){
    ctx.save();
    ctx.font = this.style[this.menuContent[i].tag].font;
    if (this.menuContent[i].active){
      ctx.fillStyle = this.style.active.fillColor;
    }else{
      ctx.fillStyle = this.style.all.fillColor;
    }
    ctx.shadowColor = this.style.all.shadowColor;
    ctx.shadowOffsetX = this.style.all.shadowOffsetX;
    ctx.shadowOffsetY = this.style.all.shadowOffsetY;
    ctx.shadowBlur = this.style.all.shadowBlur;
    ctx.textBaseline = this.style.all.textBaseLine;
    ctx.fillText(this.menuContent[i].content + this.menuContent[i].gameVariable, this.menuContent[i].position.x, this.menuContent[i].position.y);
    ctx.restore();
  }
}