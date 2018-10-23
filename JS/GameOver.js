(function () {

    window.sprites = window.sprites || {};

    var GameOver = function (gameStart) {
        this.initialize(gameStart);
    }
    var p = GameOver.prototype = new createjs.Sprite();

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
          check = 1;
          stage.removeChild(character1, character2, bloodBar1 , bloodBar2, wallImg ,windBar);
          stage.removeChild(gobackButton);
          character1 = null;
          character2 = null;
          bloodBar1 = null;
          bloodBar2 = null;
          wallImg = null;
          windBar = null;
          gobackButton = null;
          if(EndGame2 == 1){
            stage.removeChild(winImg1, loseImg2);
          }else if(EndGame1 == 10){
            stage.removeChild(loseImg1, winImg2);
          }else{
            stage.removeChild(winImg1, loseImg2, loseImg1, winImg2);
          }
          stage.removeAllChildren();
          Menu();
        });
    }

    window.sprites.GameOver = GameOver;

}());
