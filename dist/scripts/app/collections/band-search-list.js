define(["jquery","underscore","backbone","app/models/band","app/collections/band-list","app/collections/band-related-list","app/collections/band-search-item-parser"],function(a,b,c,d,e,f,g){"use strict";return e.extend({parse:function(a){return 0===a.query.results.json.iTotalRecords?[]:b.map(a.query.results.json.aaData,function(a){var b=new g(a);return new d({id:b.getId(),name:b.getFullName(),genre:b.getGenre(),country:b.getCountry(),score:0,parentBand:null,relatedBands:new f})})}})});