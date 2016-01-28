var generatorContainer="<div id='generatorContainer'>\n";
generatorContainer+="<input type='range' class='radius_slider' id='top_left_corner' min='0' max='100' value='0'>\n";
generatorContainer+="<input type='range' class='radius_slider' id='top_right_corner' min='0' max='100' value='0'>\n";
generatorContainer+="<div id='generatorOutput'></div>\n";
generatorContainer+="<input type='range' class='radius_slider' id='bottom_right_corner' min='0' max='100' value='0'>\n";
generatorContainer+="<input type='range' class='radius_slider' id='bottom_left_corner' min='0' max='100' value='0'></div>\n";
var generator_application_container_id="#sample";//the id of the container the generator will be added in
function val(o){
	return $(o).val();
}
function log(o){
	console.log(o);
}
/*function activateGenerator(){
	$(generator_application_container_id).append(generatorContainer);
	
}
function disableGenerator(){
	$("#generatorContainer").remove();
}*/
$(document).ready(function(){
	$(generator_application_container_id).append(generatorContainer);
	$('.radius_slider').on("mousemove touchmove input",function(){
		var code=val("#top_left_corner")+"px "+val("#top_right_corner")+"px "+val("#bottom_right_corner")+"px "+val("#bottom_left_corner")+"px";
		$("#generatorOutput").css("border-radius",code);
	});
});