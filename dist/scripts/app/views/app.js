define(["jquery","underscore","backbone","app/views/about","app/views/search","app/collections/band-search-list","app/views/graph","app/collections/band-related-list","app/models/band"],function($,_,Backbone,AboutView,SearchView,BandSearchList,GraphView,BandRelatedList,Band){"use strict";return Backbone.View.extend({el:"#the-app",$window:null,$loadingOverlay:null,$loadingMsg:"",searchView:null,graphView:null,aboutView:null,initialize:function(){(this.$window=$(window)).on("resize",this.resizeLayout.bind(this)),this.$loadingOverlay=this.$el.find("#loading-overlay"),this.$loadingMsg=this.$loadingOverlay.find("#loading-msg");var bandSearchList=new BandSearchList;this.aboutView=new AboutView,this.searchView=new SearchView({collection:bandSearchList}),this.graphView=new GraphView({model:new Band}),this.graphView.listenTo(this.searchView,"search:select",function(model){this.graphView.start(model)}.bind(this)),this.listenTo(this.searchView,"search:searching",function(){this._showLoadingMsg("Searching...")}).listenTo(this.searchView,"search:searched",function(){this._hideLoadingMsg()}).listenTo(this.graphView,"graph:rendering",function(){this._showLoadingMsg("Updating graph...")}).listenTo(this.graphView,"graph:rendered",function(){this._hideLoadingMsg()}),this.resizeLayout()},resizeLayout:function(){var winWidth=this.$window.innerWidth(),winHeight=this.$window.innerHeight();this.$loadingOverlay.width(winWidth).height(winHeight),this.graphView.resize(winWidth,winHeight)},_showLoadingMsg:function(msg){this.$loadingMsg.text(msg),this.$loadingOverlay.fadeIn("fast")},_hideLoadingMsg:function(){this.$loadingMsg.text(""),this.$loadingOverlay.fadeOut("fast")}})});