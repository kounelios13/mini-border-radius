(function (root,factory) {
	"use strict";
	if (typeof define === "function" && define.amd) {
    // AMD. Register as an anonymous module.
    	define(["jquery"], factory);
  	} else if (typeof exports === "object") {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    	module.exports = factory(require("jquery"));
  	} else {
    // Browser globals (root is window)
    	root.miniBorderRadius = factory(root.jQuery);
  	}
}(this,function init($,undefined){
	var exports={
		host_id:null,
		favourites:[],
		options:["10em","10em",100,"maroon"],
		custom_object:".generatorOutput",
	};
	var template={
		normal:""+
		"<div class='generatorContainer'>\n"+
			"<input type='range' class='radius_slider top_left_corner'  min='0' max='100' value='0'>\n"
			+"<input type='range' class='radius_slider top_right_corner' min='0' max='100' value='0'>\n"
			+"<div class='generatorOutput'></div>\n"
			+"<input type='range' class='radius_slider bottom_right_corner' min='0' max='100' value='0'>\n"
			+"<input type='range' class='radius_slider bottom_left_corner' min='0' max='100' value='0'>\n"
			+"<div class='panel panel-primary'>\n"+
				"<div class='panel-body text-center bg-success'>"
				+"border-radius: <span class='border_radius_code_output'>0px 0px 0px 0px</span>;\n"+
				+"</div>"// /panel-body
			+"</div><ul class='list-group favourites'></ul> "+
		"</div>";		
		bootstrap:""+
		"<div class='panel panel-primary'>"+
			"<div class='panel-heading text-center'>Generator</div>"+
			"<div class='panel-body'>"+template[normal]+"</div>"+
		"</div>";	
	};




}));	