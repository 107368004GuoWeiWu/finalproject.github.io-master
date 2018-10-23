(function () {

    window.ui.Container = window.ui.Container || {};

    var AttackObject2 = function () {
        this.initialize();
    }
    var p = AttackObject2.prototype = new createjs.Container();

    p.Container_initialize = p.initialize;

    var parameter = {
        isExisting:false,
        overCenter:false,
        attackLoadInterval:null,
        speedX:null,
        speedY:null
    }

    p.initialize = function () {
        this.Container_initialize();
        this.x = character2.x - 40;
        this.y = character2.y + 40;
        this.visible = false;
        this.on('tick', function() {
            this.x = character2.x - 40;
        });
    }





    window.ui.Container.AttackObject2 = AttackObject2;
    window.ui.Container.AttackObject2.parameter = parameter;

}());
