(function () {

    window.ui.Container = window.ui.Container || {};

    var AttackObject1 = function () {
        this.initialize();
    }
    var p = AttackObject1.prototype = new createjs.Container();

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
        this.x = character1.x + 30;
        this.y = character1.y + 40;
        this.visible = false;
        this.on('tick', function() {
            this.x = character1.x + 30;
        });
    }
    window.ui.Container.AttackObject1 = AttackObject1;
    window.ui.Container.AttackObject1.parameter = parameter;

}());
