(function () {

    window.ui.Container = window.ui.Container || {};

    var BloodBar2 = function (fill, stroke) {
        this.fillColor = fill;
        this.strokeColor = stroke;
        this.initialize();
    }
    var p = BloodBar2.prototype = new createjs.Container();

    var parameter = {
        bloodBarLoadInterval: null,
        bloodBarDirect: true
    }

    p.width = 400;
    p.height = 30;
    p.fillColor;
    p.strokeColor;
    p.bar;

    p.Container_initialize = p.initialize;

    p.initialize = function () {
        this.Container_initialize();
        this.drawBloodBar();
        this.x = (stage.canvas.width / 2) + 200;
        this.y = 20;
        this.alpha = 0;
        this.on('tick', function() {
            this.x = (stage.canvas.width / 2) + 200;
        });
    }

    p.drawBloodBar = function () {
        var outline = new createjs.Shape();
        outline.graphics.beginStroke(this.strokeColor);
        outline.graphics.drawRect(0, 0, this.width, this.height);
        this.bar = new createjs.Shape();
        this.bar.graphics.beginFill(this.fillColor);
        this.bar.graphics.drawRect(0, 0, this.width, this.height);
        this.bar.scaleX = 1;
        this.addChild(this.bar, outline);
    }



    window.ui.Container.BloodBar2 = BloodBar2;
    window.ui.Container.BloodBar2.parameter = parameter;

}());
