define(["underscore",
        "backbone",
        "app/models/band"],
    function (_,
              Backbone,
              Band) {

        "use strict";

        return Backbone.Collection.extend({

            model: Band,

            url: 'https://query.yahooapis.com/v1/public/yql',

            fetch: function(options) {

                return Backbone.Collection.prototype.fetch.call(this, _.extend({

                    reset: true,

                    dataType: 'jsonp'

                }, options));

            }

        });

    }

);