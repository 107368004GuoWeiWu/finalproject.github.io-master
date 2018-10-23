(function () {

    window.ui.Container = window.ui.Container || {};

    var Protractor2 = function () {
        this.initialize();
    }
    var p = Protractor2.prototype = new createjs.Container();

    p.Container_initialize = p.initialize;

    var parameter = {
        protractorLoadInterval: null,
        angle:null,
        sn:null,
        cs:null
    }

    p.initialize = function () {
        this.Container_initialize();
        this.x = character2.x - 150;
        this.y = character2.y - 10;
        this.scaleX = this.scaleY = 0.5;
        this.on('tick', function (e) {
            this.x = character2.x - 150;
        });
    }

    p.startPlayProtractor = function() {
        parameter.protractorLoadInterval = setInterval(playProtractor2,10);
    }


    window.ui.Container.Protractor2 = Protractor2;
    window.ui.Container.Protractor2.parameter = parameter;

}());
