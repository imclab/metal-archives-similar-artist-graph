define(function(){"use strict";function BandRelatedItemParser(relatedResult){this._relatedResult=relatedResult}return BandRelatedItemParser.prototype.isValid=function(){return"undefined"==typeof this._relatedResult.id?!1:!0},BandRelatedItemParser.prototype.getId=function(){return this._relatedResult.id.substr(this._relatedResult.id.indexOf("_")+1)},BandRelatedItemParser.prototype.getFullName=function(){return this._relatedResult.td[0].a.content},BandRelatedItemParser.prototype.getGenre=function(){return this._relatedResult.td[2].p},BandRelatedItemParser.prototype.getCountry=function(){return this._relatedResult.td[1].p},BandRelatedItemParser.prototype.getScore=function(){return parseInt(this._relatedResult.td[3].span.content,10)},BandRelatedItemParser});