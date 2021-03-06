define(["require","underscore","backbone","app/models/band","app/collections/band-list","app/collections/band-related-item-parser"],function(a,b,c,d,e,f){"use strict";return e.extend({MAX_RESULTS:10,parse:function(a,c){var d=a.query,e=d.count,g=d.results.tr;if(0===e||1===e&&"no_artists"===g.td.id)return[];if(1!==e){var h=0;return g.length>this.MAX_RESULTS&&(h=g.length-this.MAX_RESULTS),b.dropRight(g,h).map(function(a){var b=new f(a);return b.isValid()?this._buildBand(b,c):void 0},this)}var i=new f(g);return i.isValid()?this._buildBand(i,c):void 0},reset:function(a,d){return d=d||{isSourceOfReset:!0},b.has(d,"isSourceOfReset")||(d.isSourceOfReset=!0),c.Collection.prototype.reset.call(this,a,d)},_buildBand:function(b,c){return new d({id:b.getId(),name:b.getFullName(),genre:b.getGenre(),country:b.getCountry(),score:b.getScore(),parentBand:c.parentBand,relatedBands:new(a("app/collections/band-related-list"))})}})});