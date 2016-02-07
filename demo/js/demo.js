var generator;
var activated = false;
$(document).ready(function(){
	$("#create_generator").on("click",function(){
		generator=new Generator("#sample");
		$(this).text("Activate generator.")
		$(this).prop("id","activate_generator");
	});
	$("#activate_generator").on("click",function(){
		if(!activated){
			generator.activateGenerator();
			activated=true;
			alert("Generator activated.Please go and check if the generator is working.");
		}
		else{
			alert("Generator has already been activated");
		}
		
	});
});