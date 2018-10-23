(function () {

    window.ui.Container = window.ui.Container || {};

    var StrengthBar2 = function (fill, stroke) {
        this.fillColor = fill;
        this.strokeColor = stroke;
        this.initialize();
    }
    var p = StrengthBar2.prototype = new createjs.Container();

    var parameter = {
        strengthBarLoadInterval: null,
        strengthBarDirect: true
    }

    p.width = 100;
    p.height = 15;
    p.fillColor;
    p.strokeColor;
    p.bar;

    p.Container_initialize = p.initialize;

    p.initialize = function () {
        this.Container_initialize();
        this.drawStrengthBar();
        this.x = character2.x - 80;
        this.y = character2.y - 35;
        this.on('tick', function() {
            this.x = character2.x - 85;
        });
    }

    p.drawStrengthBar = function () {
        var outline = new createjs.Shape();
        outline.graphics.beginStroke(this.strokeColor);
        outline.graphics.drawRect(0, 0, this.width, this.height);
        this.bar = new createjs.Shape();
        this.bar.graphics.beginFill(this.fillColor);
        this.bar.graphics.drawRect(0, 0, this.width, this.height);
        this.bar.scaleX = 0;
        this.addChild(this.bar, outline);
    }



    window.ui.Container.StrengthBar2 = StrengthBar2;
    window.ui.Container.StrengthBar2.parameter = parameter;

}());
