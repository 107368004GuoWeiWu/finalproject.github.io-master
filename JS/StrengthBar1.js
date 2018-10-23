(function () {

    window.ui.Container = window.ui.Container || {};

    var StrengthBar1 = function (fill, stroke) {
        this.fillColor = fill;
        this.strokeColor = stroke;
        this.initialize();
    }
    var p = StrengthBar1.prototype = new createjs.Container();

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
        this.x = character1.x - 15;
        this.y = character1.y - 25;
        this.on('tick', function() {
            this.x = character1.x - 15;
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



    window.ui.Container.StrengthBar1 = StrengthBar1;
    window.ui.Container.StrengthBar1.parameter = parameter;

}());
