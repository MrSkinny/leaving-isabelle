var Game = {
  display: null,
  map: {},
  engine: null,
  player: null,
  ananas: null,
  
  init: function() {
    this.display = new ROT.Display();
    $('#container').append(this.display.getContainer());
    
    this._generateMap();
    
    var scheduler = new ROT.Scheduler.Simple();
    scheduler.add(this.player, true);
    scheduler.add(this.pedro, true);

    this.engine = new ROT.Engine(scheduler);
    this.engine.start();
  },
  
  _generateMap: function() {
    var digger = new ROT.Map.Digger();
    var freeCells = [];
    
    var digCallback = function(x, y, value) {
      if (value) { return; }
      
      var key = x+","+y;
      this.map[key] = ".";
      freeCells.push(key);
    }
    digger.create(digCallback.bind(this));
    
    this._generateBoxes(freeCells);
    this._drawWholeMap();
    this.player = this._createBeing(Player, freeCells);
    this.pedro = this._createBeing(Pedro, freeCells);
  },
    
  _generateBoxes: function(freeCells) {
    for (var i=0;i<10;i++) {
      var index = Math.floor(ROT.RNG.getUniform() * freeCells.length);
      var key = freeCells.splice(index, 1)[0];
      this.map[key] = "*";
      if (!i) { this.ananas = key; } /* first box contains an ananas */
    }
  },
  
  _drawWholeMap: function() {
    for (var key in this.map) {
      var parts = key.split(",");
      var x = parseInt(parts[0]);
      var y = parseInt(parts[1]);
      this.display.draw(x, y, this.map[key]);
    }
  },

  _createBeing: function(what, freeCells){
    var index = Math.floor(ROT.RNG.getUniform() * freeCells.length);
    var key = freeCells.splice(index, 1)[0];
    var parts = key.split(',');
    var x = parseInt(parts[0]);
    var y = parseInt(parts[1]);
    return new what(x,y);
  }
};
