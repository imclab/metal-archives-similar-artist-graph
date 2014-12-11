define(["jquery",
        "underscore",
        "backbone"],
    function ($,
              _,
              Backbone) {

    "use strict";

    return Backbone.View.extend({

        LINE_COLOR: "#000",

        DEFAULT_LINE_WIDTH: 1,

        MAX_LINE_WIDTH: 8,

        initialize: function(options) {

            _.extend(this, _.pick(options, "startX", "startY", "endX", "endY", "canvas", "drawingContext"));

        },

        render: function(options) {

            var lineWidth = this.DEFAULT_LINE_WIDTH;
            var score = this.model.get("score");

            if (options.highScore > 0) {

                var ratio = score / options.highScore;

                lineWidth = ratio * this.MAX_LINE_WIDTH;

                if (lineWidth < this.DEFAULT_LINE_WIDTH) {
                    lineWidth = this.DEFAULT_LINE_WIDTH;
                }

            }

            var context = this.drawingContext;
            context.fillStyle = this.LINE_COLOR;
            context.strokeStyle = this.LINE_COLOR;
            context.lineWidth = lineWidth;

            this._drawLine(context, this.startX, this.startY, this.endX, this.endY);

        },

        _drawLine: function(context, startX, startY, endX, endY) {

            context.beginPath();
            context.moveTo(startX, startY);
            context.lineTo(endX, endY);
            context.stroke();

        }

    });

});