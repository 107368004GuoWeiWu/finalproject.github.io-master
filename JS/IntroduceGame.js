(function () {

    window.sprites = window.sprites || {};

    var IntroduceGame = function (gameStart) {
        this.initialize(gameStart);
    }
    var p = IntroduceGame.prototype = new createjs.Sprite();

    p.Sprite_initialize = p.initialize;

    p.initialize = function (gameStart) {
        this.Sprite_initialize(gameStart);

        this.on('mouseover',function(){
          this.alpha = 0.6;
        });
        this.on('mouseout',function(){
          this.alpha = 1.0;
        });
        this.on('click',function(){
          Introduce();
        });
    }

    window.sprites.IntroduceGame = IntroduceGame;

}());
