var Game = {
  init: function(){
    ROT.DEFAULT_HEIGHT = 40;
    
    this.display = new ROT.Display();
    $('#container').append(this.display.getContainer());

  }
};