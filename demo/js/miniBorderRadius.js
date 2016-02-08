/*
	Author:kounelios13
	Licensed under MIT
	miniBorderRadius 2016
*/
function log(o){
	console.log(o);
}
function isChainable(name){
	name=name[0]=='.'?name.slice(1).split("(")[0]:name.split("(")[0];//remove '.' and "(" and ")"
	var chain={"init":true,"activateGenerator":true,"deactivateGenerator":true,"destroyGenerator":false,"replaceObject":true,"reset":true,
	"setSize":true,"setBackground":true,"setMax":true,
	"getId":false,"getCode":false,"getOptions":false};
	return chain[name] != undefined ?chain[name]:false;//if the key does not exist in the above dictionary return  false else return its value
}
function checkRequirements(){
	if (typeof jQuery == 'undefined') {  
    	// jQuery is not  loaded.Add it
    	var head = document.getElementsByTagName("head")[0];
    	var js=document.createElement("script");
    	js.type="text/javascript";
    	js.src="http://code.jquery.com/jquery-2.2.0.min.js";
    	head.insertBefore(js, head.firstChild);
    	log("jQuery loaded dynamically");
	}
	else{
		log("jQuery found.You are ready to go");
	}
}
checkRequirements();
function Generator(arguments,custom_object){
	var code='';
	var val=function(o){
		return $(o).val();
	}
	this.custom_object=custom_object||".generatorOutput";
	this.options=["10em","10em",100,"maroon"];
	this.sliders=[];
	this.generator_markup="<div class='generatorContainer'>\n";
	this.generator_markup+="<input type='range' class='radius_slider' id='top_left_corner' min='0' max='100' value='0'>\n";
	this.generator_markup+="<input type='range' class='radius_slider' id='top_right_corner' min='0' max='100' value='0'>\n";
	this.generator_markup+="<div class='generatorOutput'></div>\n";
	this.generator_markup+="<input type='range' class='radius_slider' id='bottom_right_corner' min='0' max='100' value='0'>\n";
	this.generator_markup+="<input type='range' class='radius_slider' id='bottom_left_corner' min='0' max='100' value='0'></div>\n";
	this.generator_markup+="<div class='panel panel-primary'>\n<div class='panel-body text-center bg-success'>";
	this.generator_markup+="border-radius: <span class='border_radius_code_output'>0px 0px 0px 0px</span>;\n</div></div>";
	this.setSize=function(height,width){
		this.options[0]=height;
		this.options[1]=width;
		$(this.app_container_id+" "+this.custom_object).height(height).width(width);
		return this;
	};
	this.setBackground=function(bg){
		this.options[3]=bg;
		$(this.app_container_id+" "+this.custom_object).css("background",bg);
		return this;
	};
	this.setMax=function(value){
		var sliders=$(this.app_container_id+" .radius_slider");
		for(var x=0;x<sliders.length;x++)
			try{
				//Even if the use enters a negative value there won't be any problem since Math.abs will allways return a possitive value
				$(sliders[x]).prop("max",Math.abs(value));
				this.options[2]=Math.abs(value);
			}
			catch(e){
				//That does not mean we want to let the user enter a non numerical value
				throw new Error("The value entered is not a number!!! "+ typeof value );			
			}
		return this;
	};
	this.init=function(options){
		//here we pass an array of default arguments-options with the following order
		//height,width,max,background_color
		if(!options)
			throw new Error("No list of options found");	
		if(options.length<4){
			throw new Error("Expected 4 parameters but got "+options.length+" parameters");
		}
		else{
			this.options=options;
			this.setSize(options[0],options[1]).setMax(options[2]).setBackground(options[3]);
		}	
		return this;
	};
	//detect if the argument passed to the function is a string or an array-list

	if(typeof arguments == 'string'){
		this.app_container_id=arguments==""?"body":arguments;
	}
	else{
		this.app_container_id=arguments[0];
		this.options=arguments.slice(1);//remove the id of the host container and return the remaining items of the list(height,width,max_value,bg)	
	}
	//Mind the order
	//First append and then call init()
	$(this.app_container_id).append(this.generator_markup);
	if(this.custom_object != ".generatorOutput");
		$(this.app_container_id+" .generatorOutput").replaceWith($(this.custom_object));
	this.init(this.options);
	this.sliders=$(this.app_container_id+" .radius_slider");
	this.getCode=function(){
		return this.code;
	};
	this.getOptions=function(){
		return this.options;
	};
	this.getId=function(){
		return this.app_container_id;
	}
	this.reset=function(){
		this.code="0px 0px 0px 0px";
		for(var i=0;i<this.sliders.length;i++)
			$(this.sliders[i]).val(0);
		$(this.app_container_id+" .border_radius_code_output").text(this.code);
		$(this.app_container_id+" "+this.custom_object).css("border-radius","0");
		return this;
	};
	this.activateGenerator=function(){
		//Create a reference to the current generator instance
		var gen=this;
		//Now we have a reference to the current generator we can use it
		//inside .ready() function
		//because if we use 'this' keyword inside .ready() function
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
		return this;//return the whole function so as to be chainable
	};
	this.deactivateGenerator=function(){
		//Create a reference to the current generator instance
		var gen=this;
		//Now we have a reference to the current generator we can use it
		//inside .ready() function
		//because if we use 'this' keyword inside .ready() function
		//we are not making a reference to the generator object but to the jQuery object
		$(document).ready(function(){
			gen.reset();//First reset the generator 
			$(gen.getId()).off();//Unregister any event listeners attached to the generator
		});
		return this;//return the whole function so as to be chainable
	};
	this.destroyGenerator=function(){
		//Warning!!!There is no going back
		//alert("Sorry but this function is still in progrss");
		var del=confirm("Are you sure you wanna destroy the geenrator?");
		if(del){
			$(this.getId()+" .generatorContainer").remove();
			$(this.getId()+" .panel").remove();
			log("Generator destroyed");
		}
		else
			alert("Operation aborted");
	};
	this.replaceObject=function(object,restrict_size){
		if(!object || object[0]=='.' || object[0] != "#")
			throw new Error(!object?"Invalid object detected":"Class detected.Please switch to an object with id insted of class");
		$(object).addClass("center-block");
		$(this.getId()+" "+this.custom_object).replaceWith($(object));//fine up to here
		this.custom_object=object;
		if(!restrict_size)
			this.options=[$(object).css("height"),$(object).css("width"),this.options[2],$(object).css("background")];
		else
			this.options=[this.options[0],this.options[1],this.options[2],$(object).css("background")];
		this.init(this.options);
		return this;
	};
}
	