var gen,default_options=[],options=['#sample','15em','15em',200,'gold'];
var gen2,gen3,gen4;
var gens=[];
$(document).ready(function(){
	gen=new Generator("#sample","#demo_object_1");
	default_options=gen.getOptions();
	gen2=new Generator(["#sample2","12em","12em",200,'orange'],"#demo_object_2");
	gen3=new Generator(["#sample3","16em","16em",300,'#fb24a2'],"#demo_object_3");
	$("#bind_move").click(function(){
		gen.activateGenerator();
		gen2.activateGenerator();
		gen3.activateGenerator();
	});
});