/*
	Author:kounelios13
	Licensed under MIT
	miniBorderRadius 2016
*/
"use strict";
var generators=[];
var reservedItems=[];
function isChainable(name){
	name=name[0]=='.'?name.slice(1).split("(")[0]:name.split("(")[0];//remove '.' and "(" and ")"
	var chain={"init":true,"activateGenerator":true,"deactivateGenerator":true,"destroyGenerator":false,"replaceObject":true,"reset":true,
		"setSize":true,"setBackground":true,"setMax":true,"setStep":true,
		"getId":false,"getCode":false,"getOptions":false,"getFavourites":false,"toggleFavourites":true,
		"removeFavourites":true,"addToFavourites":true,"downloadFavourites":true,"enablePreview":true,"enableBootstrapContainer":true,
		"getBackup":false,"restoreBackup":true
	};
	return chain[name] != undefined ?chain[name]:false;//if the key does not exist in the above dictionary return  false else return its value
}
function Generator(args,custom_object,enable_bootstrap_panel){
	function log(o){
		console.log(o);
	}
	function abs(a){return Math.abs(a);}
	//to avoid using 'this' all the time we create a self reference
	//and we use it
	var self=this;
	self.code=null;
	var val=function(o){
		return $(o).val();
	};
	var host=null;
	self.host_id=null;
	self.backup=null;
	self.custom_object=custom_object||".generatorOutput";
	self.options=["10em","10em",100,"maroon"];
	self.sliders=[];
	self.favourites=[];
	self.colors=["#fabb00","rgb(255,53,0)","rgb(3,86,255)","rgb(20, 77, 239)","#107B9E"];
	self.generator_markup=""+
	"<div class='generatorContainer'>\n"
		+"<input type='range' class='radius_slider top_left_corner'  min='0' max='100' value='0'>\n"
		+"<input type='range' class='radius_slider top_right_corner' min='0' max='100' value='0'>\n"
		+"<div class='generatorOutput'></div>\n";
		+"<input type='range' class='radius_slider bottom_right_corner' min='0' max='100' value='0'>\n"
		+"<input type='range' class='radius_slider bottom_left_corner'  min='0' max='100' value='0'></div>\n"
		+"<div class='panel panel-primary'>\n"+
			"<div class='panel-body text-center bg-success'>"
				+"border-radius: <span class='border_radius_code_output'>0px 0px 0px 0px</span>;\n"+
			"</div>"//panel-body
		+"</div><ul class='list-group favourites'></ul> "+
	"</div>";
	self.bootstrap_markup="<div class='panel panel-primary'><div class='panel-heading text-center'>Generator</div><div class='panel-body'>"+self.generator_markup+"</div></div>";
	//detect if the argument passed to the function is a string or an array
	if(typeof args == 'string'){
		if(!args)
			throw new Error("Host id can't be empty !!!");
		self.host_id=host=args;
	}
	else{
		self.host_id=host=args[0];
		self.options=args.slice(1);//remove the id of the host container and return the remaining items of the list(height,width,max_value,bg)	
	}
	self.getId=function(){
		return self.host_id;
	}
	self.setSize=function(height,width){
		var host_div=self.host_id;
		var target=!enable_bootstrap_panel?host_div+" "+self.custom_object:host_div+" .generatorOutput";
		self.options[0]=height;
		self.options[1]=width;
		$(target).height(height).width(width);
		return self;
	};
	self.setBackground=function(bg,random_color){
		var target=!enable_bootstrap_panel?host+" "+self.custom_object:host+" .generatorOutput";
		if(bg)
			self.colors.push(bg);
		function ranColor(){
			return self.colors[Math.round(Math.random()* self.colors.length)];
		};
		var color=!random_color?bg:ranColor();
		self.options[3]=color;
		$(target).css("background",color,'!important');
		return self;
	};
	self.setStep=function (step) {
		step=abs(step);
		var isValidStep=abs(step)<=$(self.sliders[0]).prop("max") && !isNaN(step) && step;
		if(!isValidStep)
			throw new Error(!step?"Invalid value":isNaN(step)?"Invalid step value":"Step value is greater than max value");
		$(host+" input[type='range']").prop("step",step);
		return self;
	};
	self.setMax=function(value){
		value=abs(value);
		if(isNaN(value))
			throw new Error("Max value must be a number!!!");
		if(value<$(self.sliders[0]).prop("max")){
			var old=$(self.sliders[0]).prop("max");
			self.code=value+"px "+value+"px "+value+"px "+value+"px";
			$(host+" .border_radius_code_output").text(self.code);
			$(host+" "+self.custom_object).css("border-radius",self.code);	
		}
		try{
			//Even if the use enters a negative value there won't be any problem since abs will allways return a possitive value
			$(host+" input[type='range']").prop("max",value);
			self.options[2]=value;
		}
		catch(e){
			//That does not mean we want to let the user enter a non numerical value
			throw new Error("(T)error occured:"+e );			
		}
		return self;
	};
	self.getOptions=function(){
		return self.options;
	};
	self.init=function(options){
		//here we pass an array of default args-options with the following order
		//height,width,max,background_color
		if(!options)
			throw new Error("No list of options found");	
		else if(options.length<4){
			throw new Error("Expected 4 parameters but got "+options.length+" parameters");
		}
		else{
			self.options=options;
			self.setSize(options[0],options[1]).setMax(options[2]).setBackground(options[3]);
		}	
		return self;
	};
	var render=function(){
		if(host != null && host[0]=='#')
			$(document).ready(function(){
				self.backup=$(host).html();
				//Inject the generator
				$(host).html(!enable_bootstrap_panel?self.generator_markup:self.bootstrap_markup);//determine if we want a bootstrap panel as a container for our generator or not
				if(self.custom_object != ".generatorOutput" && reservedItems.indexOf(self.custom_object)==-1){
					$(host+" .generatorOutput").replaceWith($(self.custom_object));
					$(self.custom_object).addClass('generatorOutput');
					reservedItems.push(self.custom_object);
				}
				//Call init to apply any default or user options
				self.init(self.getOptions());
				self.sliders=$(host+" .radius_slider");
			});	
		else
			throw new Error("Generator could not be rendered!!!");
	};
	self.getBackup=function(){
		return self.backup;
	};
	self.restoreBackup=function(destination){
		var backup=self.getBackup();
		if(!destination)
			throw new Error("Invalid destination!!!");
		if(destination[0]=='.'){
			var answer=confirm("You are going to create duplicates of your backed content.Are you sure you want to continue");
			if(answer)
				$(destination).html(backup);
		}
		else
			$(destination).html(backup);
		return self;
	};
	self.getCode=function(){
		return self.code;
	};
	self.getOptions=function(){
		return self.options;
	};
	
	self.reset=function(){
		self.code="0px 0px 0px 0px";
		self.sliders.val(0);
		$(host+" .border_radius_code_output").text(self.code);
		$(host+" .generatorOutput").css("border-radius","0");
		return self;
	};
	self.activateGenerator=function(){
		//In order to be able to manipulate DOM properties such as the border radius of an object 
		//in real time we have to attach an eventListener
		$(document).ready(function(){
			var sliders=self.sliders;
			$(host).on("mousemove touchmove",'.radius_slider',function(){
				//touchmove is needed for touch screens
				self.code=val(sliders[0])+"px "+val(sliders[1])+"px "+val(sliders[2])+"px "+val(sliders[3])+"px";
				$(host+" .border_radius_code_output").text(self.code);
				$(host+" .generatorOutput").css("border-radius",self.code);
			});
		});
		return self;//return the object that called the function
	};
	self.deactivateGenerator=function(){
		$(document).ready(function(){
			self.reset();//First reset the generator 
			$(host).off();//Unregister any event listeners attached to the generator
		});
		return self;//return the object that called the function to be able to chain functions
	};
	self.destroyGenerator=function(){
		//Warning!!!There is no going back
		//Burn into the depths of hell :p lol
		//sorry
		$(host+" .generatorContainer").remove();
		$(host+" .panel").remove();
		//generators[generators.indexOf(self)]=null; we might want to keep the data from that generator
	};
	self.replaceObject=function(object,restrict_size){
		if(!object || object[0]=='.' || object[0] != "#")
			throw new Error(!object?"Invalid object detected":"Class detected.Please switch to an object with id insted of class");
		if(reservedItems.indexOf(object)==-1)
			reservedItems.push(object);
		else 
			throw new Error("This object is already being used.!!!!");
		$(object).addClass("center-block");
		$(object).addClass("generatorOutput");
		$(host+" "+self.custom_object).replaceWith($(object));
		self.custom_object=object;
		//Check the current border radius and apply it to the new object
		$(object).css("border-radius",self.code);//apply the same radius as the object that was replaced
		if(!restrict_size)
			self.options=[$(object).css("height"),$(object).css("width"),self.options[2],$(object).css("background")];
		else
			self.options=[self.options[0],self.options[1],self.options[2],$(object).css("background")];
		self.init(self.options);
		return self;//return the object that called the function
	};
	self.addToFavourites=function(){
		var code=self.getCode();
		$(host+"  .favourites li").show();
		if(self.favourites.indexOf(code)==-1 && code != undefined)
			self.favourites.push(code);
		else
			return self;//the code exists so exit the function
		//buggy function lol somebody fix self shit
		//not that buggy anymore :)
		$(host+" ul.favourites").append("<li class='generator_favourites list-group-item'>border-radius:"+code+";</li>");
		return self;
	};
	self.getFavourites=function(){
		return self.favourites;
	};
	self.toggleFavourites=function(){
		$(host+"  .favourites li").toggle(800);
		return self;
	};
	self.removeFavourites=function(preserve){
		if(!preserve)//in case we only want to remove  all list items in the page but keep the actual array 
			self.favourites.length=0;
		$(host+" .favourites li").remove();
		return self;
	};
	self.downloadFavourites=function(){
		var file="/********\n";
		var items=self.getFavourites();
		if(items.length<1){
			alert("No favourites to download.");
			throw new Error("No items to download");
		}
		for(var i=0,max=items.length;i<max;i++)
			file+="border-radius:"+items[i]+";\n";
		file+="\n******************miniBorderRadius plugin******************"+
		      "\n--visit https://github.com/kounelios13/mini-border-radius--"
		     +"\n-------------------to see more-------------------.\n****/";
		try{
			var blob = new Blob([file], {type: "text/plain;charset=utf-8"});
			saveAs(blob,"favourites.css");	
		}
		catch(e){
			switch(e.message){
				case "saveAs is not defined":
					alert('FileSaver.js was not found');
					break;
				default:
					alert("An error occured:"+e.message);	
			}//switch
		}//catch
	};
	self.enablePreview=function(){
		$(document).ready(function(){
			$(document).on("click",self.getId()+" li",function(){
				var values=$(this).text().match(/\d+/g);
				for(var i=0;i<4;i++)
					$(self.sliders[i]).val(values[i]);
				self.code=$(this).text().split(":")[1].split(';')[0];
				$(host+" "+self.custom_object).css("border-radius",self.code);
				$(host+" .border_radius_code_output").text(self.code);
			});
		});
		return self;
	};
	self.enableBootstrapContainer=function(){
		var args=self.options;
		var old_code=self.getCode();
		var old_favs=self.favourites;
		var old_obj=self.custom_object;
		args.unshift(host);
		var isFavouritesListVisible=$(host+" .list-group li").is(":visible");
		var index=generators.indexOf(self);
			self=new Generator(args,old_obj,true).activateGenerator(); 
			$(host+" .generatorOutput").css('border-radius',old_code);
			//after setting border-radius make sure to move each slider in to its old position
			//and update the code output panel
			var values=old_code.match(/\d+/g);
				for(var i=0;i<4;i++)
					$(self.sliders[i]).val(values[i]);
			$(host+" .border_radius_code_output").text(old_code);	
			var old_list="";
			for(var i=0;i<old_favs.length;i++)
				old_list+="<li class='generator_favourites list-group-item'>border-radius:"+old_favs[i]+";</li>\n";
			$(host+" .list-group").append(old_list);
			//Check if the favourites were visible before replacing the default container with a bootstrap panel
			//If true make them visible again
			$(host+" .list-group li").toggle(isFavouritesListVisible);
			self.options=self.getOptions();
			self.code=old_code;
			self.favourites=old_favs;
			generators[index]=self;
		return self;
	};	
	generators.push(self);
	render();
}//function Generator
	
