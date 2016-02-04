var gen,default_options=[],options=['#sample','15em','15em',200,'gold'];
var gen2,gen3,gen4;
var gens=[];
$(document).ready(function(){
	function x(i){return new Generator(i)}
	gen=new x("#sample");
	default_options=gen.getOptions();
	gen2=new x(["#sample2","12em","12em",300,'orange']);
	gen3=new x(["#sample3","16em","16em",400,'#cd24bf']);
	$("#bind_move").click(function(){
		gen.activateGenerator();
		gen2.activateGenerator();
		gen3.activateGenerator();
	});
});