var generator;
var activated = false;
$(document).ready(function(){
	$("#create_generator").on("click",function(){
			generator=new Generator("#sample");
			$(this).remove();
	});
	$("#activate_generator").on("click",function(){
		if(!activated){
			generator.activateGenerator();
			activated=true;
			alert("Generator activated.Please go and check if the generator is working.");
			window.location.assign(window.location.pathname.split("#")[0]+"#sample");
			
			//window.location.assign(window.location.split("#")[0]+'#sample');
		}
	
	});
});