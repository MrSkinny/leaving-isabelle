var Pedro = function(x,y){
  this._x = x;
  this._y = y;
  this._draw();

};

Pedro.prototype._draw = function(){
  Game.display.draw(this._x, this._y, 'P', 'red');
};

Pedro.prototype.act = function() {
  var x = Game.player.getX();
  var y = Game.player.getY();
  var passableCallback = function(x,y){
    return (x+","+y in Game.map);
  };
  var astar = new ROT.Path.AStar(x,y,passableCallback, {topology: 4});

  var path = [];
  var pathCallback = function(x,y){
    path.push([x,y]);
  };
  astar.compute(this._x, this._y, pathCallback);

  path.shift(); /* remove Pedro's position */
  if (path.length === 1) {
    Game.engine.lock();
    alert("Game over - you were captured by Pedro!");
  } else {
    x = path[0][0];
    y = path[0][1];
    Game.display.draw(this._x, this._y, Game.map[this._x+","+this._y]);
    this._x = x;
    this._y = y;
    this._draw();
  }

};

