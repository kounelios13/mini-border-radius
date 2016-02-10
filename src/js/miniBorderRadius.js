/*
	Author:kounelios13
	Licensed under MIT
	miniBorderRadius 2016
*/
"use strict";
function log(o){
	console.log(o);
}
function isChainable(name){
	name=name[0]=='.'?name.slice(1).split("(")[0]:name.split("(")[0];//remove '.' and "(" and ")"
	var chain={"init":true,"activateGenerator":true,"deactivateGenerator":true,"destroyGenerator":false,"replaceObject":true,"reset":true,
		"setSize":true,"setBackground":true,"setMax":true,
		"getId":false,"getCode":false,"getOptions":false,"getFavourites":false,"toggleFavourites":true,
		"removeFavourites":true,"addToFavourites":true
	};
	return chain[name] != undefined ?chain[name]:false;//if the key does not exist in the above dictionary return  false else return its value
}
function Generator(args,custom_object){
	//to avoid using 'this' all the time we create a self reference
	//and we use it
	var gen=this;
	var code='';
	var val=function(o){
		return $(o).val();
	}
	gen.custom_object=custom_object||".generatorOutput";
	gen.options=["10em","10em",100,"maroon"];
	gen.sliders=[];
	gen.favourites=[];
	gen.generator_markup="<div class='generatorContainer'>\n";
	gen.generator_markup+="<input type='range' class='radius_slider' id='top_left_corner' min='0' max='100' value='0'>\n";
	gen.generator_markup+="<input type='range' class='radius_slider' id='top_right_corner' min='0' max='100' value='0'>\n";
	gen.generator_markup+="<div class='generatorOutput'></div>\n";
	gen.generator_markup+="<input type='range' class='radius_slider' id='bottom_right_corner' min='0' max='100' value='0'>\n";
	gen.generator_markup+="<input type='range' class='radius_slider' id='bottom_left_corner' min='0' max='100' value='0'></div>\n";
	gen.generator_markup+="<div class='panel panel-primary'>\n<div class='panel-body text-center bg-success'>";
	gen.generator_markup+="border-radius: <span class='border_radius_code_output'>0px 0px 0px 0px</span>;\n</div>";
	gen.generator_markup+="</div><ul class='list-group favourites'></ul>\n</div>";
	gen.setSize=function(height,width){
		gen.options[0]=height;
		gen.options[1]=width;
		$(gen.app_container_id+" "+gen.custom_object).height(height).width(width);
		return gen;
	};
	gen.setBackground=function(bg){
		gen.options[3]=bg;
		$(gen.app_container_id+" "+gen.custom_object).css("background",bg);
		return gen;
	};
	gen.setMax=function(value){
		/*if(abs(value)<$(gen.sliders[0]).prop("max")){
			var old=$(gen.sliders[0]).prop("max");
			gen.code=old+"px "+old+"px "+old+"px "+old+"px";
			$(gen.app_container_id+" .border_radius_code_output").text(gen.code);
			$(gen.getId()+" "+gen.custom_object).css("border-radius",gen.code);	
		}*/
		for(var x=0,max=gen.sliders.length;x<max;x++)
			try{
				//Even if the use enters a negative value there won't be any problem since Math.abs will allways return a possitive value
				$(sliders[x]).prop("max",Math.abs(value));
				gen.options[2]=Math.abs(value);
			}
			catch(e){
				//That does not mean we want to let the user enter a non numerical value
				throw new Error("The value entered is not a number!!! "+ typeof value );			
			}
		return gen;
	};
	gen.init=function(options){
		//here we pass an array of default args-options with the following order
		//height,width,max,background_color
		if(!options)
			throw new Error("No list of options found");	
		if(options.length<4){
			throw new Error("Expected 4 parameters but got "+options.length+" parameters");
		}
		else{
			gen.options=options;
			gen.setSize(options[0],options[1]).setMax(options[2]).setBackground(options[3]);
		}	
		return gen;
	};
	//detect if the argument passed to the function is a string or an array-list

	if(typeof args == 'string'){
		gen.app_container_id=args==""?"body":args;
	}
	else{
		gen.app_container_id=args[0];
		gen.options=args.slice(1);//remove the id of the host container and return the remaining items of the list(height,width,max_value,bg)	
	}
	//Mind the order
	//First append and then call init()
	$(gen.app_container_id).append(gen.generator_markup);
	if(gen.custom_object != ".generatorOutput");
		$(gen.app_container_id+" .generatorOutput").replaceWith($(gen.custom_object));
	gen.init(gen.options);
	gen.sliders=$(gen.app_container_id+" .radius_slider");
	gen.getCode=function(){
		return gen.code;
	};
	gen.getOptions=function(){
		return gen.options;
	};
	gen.getId=function(){
		return gen.app_container_id;
	}
	gen.reset=function(){
		gen.code="0px 0px 0px 0px";
		for(var i=0;i<gen.sliders.length;i++)
			$(gen.sliders[i]).val(0);
		$(gen.app_container_id+" .border_radius_code_output").text(gen.code);
		$(gen.getId()+" "+gen.custom_object).css("border-radius","0");
		return gen;
	};
	gen.activateGenerator=function(){
		//Now we have a reference to the current generator we can use it
		//inside .ready() function
		//because if we use 'gen' keyword inside .ready() function
		//we are not referencing to the generator object but to the jQuery object
		$(document).ready(function(){
			var host_div=gen.getId();
			$(host_div).on("mousemove touchmove",'.radius_slider',function(){
				//touchmove is needed for touch screens
				gen.code=val(gen.sliders[0])+"px "+val(gen.sliders[1])+"px "+val(gen.sliders[2])+"px "+val(gen.sliders[3])+"px";
				$(host_div+" .border_radius_code_output").text(gen.code);
				$(host_div+" "+gen.custom_object).css("border-radius",gen.code);
			});
			//attach an event handler
		});
		return gen;//return the object that called the function
	};
	gen.deactivateGenerator=function(){
		$(document).ready(function(){
			gen.reset();//First reset the generator 
			$(gen.getId()).off();//Unregister any event listeners attached to the generator
		});
		return gen;//return the object that called the function to be able to chain functions
	};
	gen.destroyGenerator=function(){
		//Warning!!!There is no going back
		//go to hell
		//sorry
			$(gen.getId()+" .generatorContainer").remove();
			$(gen.getId()+" .panel").remove();
	};
	gen.replaceObject=function(object,restrict_size){
		if(!object || object[0]=='.' || object[0] != "#")
			throw new Error(!object?"Invalid object detected":"Class detected.Please switch to an object with id insted of class");
		$(object).addClass("center-block");
		$(gen.getId()+" "+gen.custom_object).replaceWith($(object));
		gen.custom_object=object;
		$(object).css("border-radius",gen.code);//apply the same radius as the object that was replaced
		if(!restrict_size)
			gen.options=[$(object).css("height"),$(object).css("width"),gen.options[2],$(object).css("background")];
		else
			gen.options=[gen.options[0],gen.options[1],gen.options[2],$(object).css("background")];
		gen.init(gen.options);
		return gen;//return the object that called the function
	};
	gen.addToFavourites=function(){
		if(gen.favourites.indexOf(gen.code)==-1 && gen.code != undefined)
			gen.favourites.push(gen.code);
		else
			return gen;//the code exists so exit the function
		//buggy function lol somebody fix gen shit
		//not that buggy anymore :)
		$(gen.getId()+" ul.favourites").append("<li class='generator_favourites list-group-item'>border-radius:"+gen.code+";</li>");
		return gen;
	};
	gen.getFavourites=function(){
		return gen.favourites;
	};
	gen.toggleFavourites=function(speed){
		var x=$(gen.getId()+"  .list-group");
		$(gen.getId()+"  .favourites li").toggle(800);
		return gen;
	};
	gen.removeFavourites=function(){
		gen.favourites.length=0;
		$(gen.getId()+" .favourites li").remove();
		return gen;
	};
	$(document).ready(function(){
		$("body").on("click",gen.getId()+" li",function(){
			var values=$(this).text().match(/\d+/g);
			for(var i=0;i<4;i++)
				$(gen.sliders[i]).val(values[i]);
			gen.code=$(this).text().split(":")[1].split(';')[0];
			$(gen.getId()+" "+gen.custom_object).css("border-radius",gen.code);
			$(gen.getId()+" .border_radius_code_output").text(gen.code);
		});
	});
}
	
