(function () {

    window.sprites = window.sprites || {};

    var Character1 = function (spritesheet) {
        this.initialize(spritesheet);
    }
    var p = Character1.prototype = new createjs.Sprite();

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
      KEYCODE_LEFT:65, // A
      KEYCODE_RIGHT:68, // D
      ATTACK:82, // R
    }


    p.initialize = function (spritesheet) {
        this.Sprite_initialize(spritesheet, 'idle');
        this.on('tick', function (e) {
            if (this.x > movingBoundary-240) {
                this.x -= xVel;
            }
            if(this.x < 0) {
                this.x += xVel;
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


    window.sprites.Character1 = Character1;
    window.sprites.Character1.parameter = parameter;
}());
