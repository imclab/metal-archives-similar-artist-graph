define(["underscore",
        "backbone",
        "app/models/band",
        "app/collections/band-list",
        "app/collections/band-related-list",
        "app/collections/band-search-item-parser"],
    function (_,
              Backbone,
              Band,
              BandList,
              BandRelatedList,
              BandSearchItemParser) {

        "use strict";

        return BandList.extend({

            parse: function(response){

                if (response.query.results.json.iTotalRecords === 0) {
                    return [];
                }

                return _.map(response.query.results.json.aaData, function(val){

                    var parser = new BandSearchItemParser(val);

                    return new Band({
                        "id": parser.getId(),
                        "name": parser.getFullName(),
                        "genre": parser.getGenre(),
                        "country": parser.getCountry(),
                        "score": 0,
                        "parentBand": null,
                        "relatedBands": new BandRelatedList()
                    });

                });

            }

        });

    }

);