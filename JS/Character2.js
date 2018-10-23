(function () {

    window.sprites = window.sprites || {};

    var Character2 = function (spritesheet) {
        this.initialize(spritesheet);
    }
    var p = Character2.prototype = new createjs.Sprite();

    p.Sprite_initialize = p.initialize;

    p.speed = 0;
    var parameter = {
      characterLoadInterval:null,
      strength:null,
      keyUp:true,
      moveLeft:false,
      moveRight:false,
      buildedProtractor:false,
      protractorChecked:false,
      buildedStrengthBar:false,
      attackKeydownCount:0,
      KEYCODE_LEFT:37, // 方向鍵左
      KEYCODE_RIGHT:39, // 方向見右
      ATTACK:76 // L
    }


    p.initialize = function (spritesheet) {
        this.Sprite_initialize(spritesheet, 'idle');
        this.on('tick', function (e) {

            if (this.x < movingBoundary + 170) {
                this.x += xVel;
            }

            if(this.x > stage.canvas.width) {
                this.x -= xVel;
            }

            if(parameter.keyUp == true)
              this.gotoAndStop('idle');
        })
    }
    p.run = function () {
      if(this.currentAnimation === 'idle')
            this.gotoAndPlay('run');

    }
    p.stand = function () {
        if (this.currentAnimation === 'run') {
            this.gotoAndStop('idle');
        }

    }

    window.sprites.Character2 = Character2;
    window.sprites.Character2.parameter = parameter;
}());
