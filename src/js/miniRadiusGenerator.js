/*
	Author:kounelios13
	Licensed under MIT
	miniRadius generator 2016
*/
function log(o){
	console.log(o);
}
function isChainable(name){
	name=name[0]=='.'?name.slice(1).split("(")[0]:name.split("(")[0];//remove '.' and "(" and ")"
	var chain={"init":true,"activateGenerator":true,"deactivateGenerator":true,"replaceObject":true,"reset":true,
	"setSize":true,"setBackground":true,"setMax":true,
	"getId":false,"getCode":false,"getOptions":false};
	return chain[name] != undefined ?chain[name]:false;//if the key does not exist in the above dictionary return  false else return its value
}
function Generator(arguments,custom_object){
	var code='';
	var val=function(o){
		return $(o).val();
	}
	this.custom_object=custom_object||".generatorOutput";
	log(this.custom_object);
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
		$(this.app_container_id+" "+custom_object).css("border-radius","0");
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
			$(host_div).on("mousemove",'.radius_slider',function(){
				gen.code=val(gen.sliders[0])+"px "+val(gen.sliders[1])+"px "+val(gen.sliders[2])+"px "+val(gen.sliders[3])+"px";
				$(host_div+" .border_radius_code_output").text(gen.code);
				$(host_div+" "+custom_object).css("border-radius",gen.code);
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
		//we are not referencing to the generator object but to the jQuery object
		$(document).ready(function(){
			gen.reset();//First reset the generator 
			$(gen.getId()).off();//Unregister any event listeners attached to the generator
		});
		return this;//return the whole function so as to be chainable
	};
	this.replaceObject=function(object){
		$(this.app_container_id+" "+this.custom_object).replaceWith($(object));
		this.custom_object=object;
		this.init(this.options);
		return this;
	};
}
	