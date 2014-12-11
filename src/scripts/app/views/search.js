define(["jquery",
        "underscore",
        "backbone",
        "app/models/band",
        "app/collections/band-related-list",
        "app/collections/band-search-query",
        "app/views/search-result",
        "lib/jqueryui-custom/jquery-ui.min",
        "lib/jquery-dialogextend/jquery.dialogextend"],
    function ($,
              _,
              Backbone,
              Band,
              BandRelatedList,
              BandSearchQuery,
              SearchResultView) {

        "use strict";

        return Backbone.View.extend({

            el: '#search',

            initialize: function() {

                _.bindAll(this, "renderOne");

                this.$searchInput = this.$el.find("#search-input");
                this.$searchResults = this.$el.find("#search-results");
                this.$tBody = this.$searchResults.find("#search-results-table").children('tbody');
                this.$count = this.$el.find("#search-results-count");

                this.$count.css({
                    height: this.$searchInput.outerHeight() + "px",
                    "line-height": this.$searchInput.outerHeight() + "px"
                });

                this.$el.dialog({
                    autoOpen: true,
                    closeOnEscape: false,
                    draggable: true,
                    height: 250,
                    modal: false,
                    position: { my: "left top", at: "left top", of: window },
                    resizable: false,
                    title: "Search",
                    width: 450
                }).dialogExtend({
                    closable: false,
                    collapsable: true
                }).show("fast");

                this.listenTo(this.collection, 'reset', this.render);
            },

            events: {

                'click #search-btn': 'search'

            },

            search: function() {

                var searchText = this.$searchInput.val();

                if (searchText.length === 0) {
                    return;
                }

                this.stopListening(null, "search-result:select");
                this.trigger("search:searching");

                this.collection.fetch({

                    data: (new BandSearchQuery(searchText)).build(),

                    success: function (collection, response, options) {
                        //console.log("Success");
                    },

                    error: function (collection, response, options) {
                        //console.log("Error");
                    }

                });

            },

            render: function () {

                this.$tBody.empty();
                this.$count.text(this.collection.length + " band(s) found.");

                this.collection.each(this.renderOne);

                this.$searchResults.show();

                this.trigger("search:searched");

                return this;

            },

            renderOne: function (model) {

                var searchResultView = new SearchResultView({ 'model': model });

                this.listenTo(
                    searchResultView,
                    "search-result:select",
                    function(band) {
                        this.trigger("search:select", band);
                    });

                this.$tBody.append(searchResultView.render().$el);

                return this;

            }

        });

    }
);