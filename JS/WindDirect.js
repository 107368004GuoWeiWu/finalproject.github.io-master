(function () {

    window.ui.Container = window.ui.Container || {};

    var WindDirect = function (fill, stroke) {
        this.fillColor = fill;
        this.strokeColor = stroke;
        this.initialize();
    }
    var p = WindDirect.prototype = new createjs.Container();

    var parameter = {
        windBarLoadInterval: null,
        windBarDirect: true
    }

    p.width = 100;
    p.height = 15;
    p.fillColor;
    p.strokeColor;
    p.bar;

    p.Container_initialize = p.initialize;

    p.initialize = function () {
        this.Container_initialize();
        this.drawWindBar();
        this.x = (stage.canvas.width / 2) - 120;
        this.y = 30;
        this.alpha = 0;
    }

    p.drawWindBar = function () {
        var outline = new createjs.Shape();
        outline.graphics.beginStroke(this.strokeColor);
        outline.graphics.drawRect(0, 0, this.width * 2, this.height);
        this.bar = new createjs.Shape();
        this.bar.graphics.beginFill(this.fillColor);
        this.bar.graphics.drawRect(0, 0, this.width, this.height);
		    this.bar.x = 100;
        this.bar.scaleX = 0;
        this.addChild(this.bar, outline);
    }


    window.ui.Container.WindDirect = WindDirect;
    window.ui.Container.WindDirect.parameter = parameter;

}());
