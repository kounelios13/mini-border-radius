function Generator(app_container_id){
	var code='';
	this.val=function(o){
		return $(o).val();
	}
	this.generator_markup="<div id='generatorContainer'>\n";
	this.generator_markup+="<input type='range' class='radius_slider' id='top_left_corner' min='0' max='200' value='0'>\n";
	this.generator_markup+="<input type='range' class='radius_slider' id='top_right_corner' min='0' max='200' value='0'>\n";
	this.generator_markup+="<div class='generatorOutput'></div>\n";
	this.generator_markup+="<input type='range' class='radius_slider' id='bottom_right_corner' min='0' max='200' value='0'>\n";
	this.generator_markup+="<input type='range' class='radius_slider' id='bottom_left_corner' min='0' max='200' value='0'></div>\n";
	this.generator_markup+="<div class='panel panel-primary'>\n<div class='panel-body text-center'>";
	this.generator_markup+="border-radius: <span class='border_radius_code_output'></span>;\n</div></div>";
	//the id of the container the generator will be added in
	this.app_container_id=app_container_id;
	$(this.app_container_id).append(this.generator_markup);
	this.activateGenerator=function(){
		var sliders=$(this.app_container_id+" .radius_slider");
		this.code=this.val(sliders[0])+"px "+this.val(sliders[1])+"px "+this.val(sliders[2])+"px "+this.val(sliders[3])+"px";
		$(this.app_container_id+" .border_radius_code_output").text(this.code);
		$(this.app_container_id+" .generatorOutput").css("border-radius",this.code);
	};//this will be used inside an event listener to activate the generator
	this.getCode=function(){
		return this.code;
	};
	this.setSize=function(height,width){
		$(this.app_container_id+" .generatorOutput").height(height).width(width);
	};
	this.setBackgound=function(bg){
		$(this.app_container_id+" .generatorOutput").css("background",bg);
	};
	this.setMax=function(value){
		var sliders=$(this.app_container_id+" .radius_slider");
		for(var x=0;x<sliders.length;x++)
			try{
				//Even if the use enters a negative value there won't be any problem since Math.abs will allways return a possitive value
				$(sliders[x]).prop("max",Math.abs(value));
			}
			catch(e){
				alert("Invalid value");
			}
	};
	this.init=function(container,height,width,max){
		this.app_container_id=container;
		this.setSize(height,width);
		this.setMax(max);
	};
}
