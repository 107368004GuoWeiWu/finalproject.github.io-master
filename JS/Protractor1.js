(function () {

    window.ui.Container = window.ui.Container || {};

    var Protractor1 = function () {
        this.initialize();
    }
    var p = Protractor1.prototype = new createjs.Container();

    p.Container_initialize = p.initialize;

    var parameter = {
        protractorLoadInterval: null,
        angle:null,
        sn:null,
        cs:null
    }

    p.initialize = function () {
        this.Container_initialize();
        this.x = character1.x + 80;
        this.y = character1.y - 10;
        this.scaleX = this.scaleY = 0.5;
        this.on('tick', function (e) {
            this.x = character1.x + 80;
        });
    }

    p.startPlayProtractor = function() {
        parameter.protractorLoadInterval = setInterval(playProtractor1,10);
    }


    window.ui.Container.Protractor1 = Protractor1;
    window.ui.Container.Protractor1.parameter = parameter;

}());
