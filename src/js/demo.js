var keys=[];
var letters=[];
Array.prototype.appears=function(num){
	var counter=0;
	for(var i = 0;i<this.length;i++)
		if(this[i]==num)
			counter++;
	return counter;	
};
/*Array.prototype.sort=function(){
	 this.sort(function(a,b){
		return a-b;
	});
};*/
Array.prototype.last = function() {
	return this[this.length-1];
};
Array.prototype.famous=function(){
	this.sort();
	var item=this[0];
	for(var i=1;i<this.length;i+=this.appears(this[i])){
		if(this.appears(item)<this.appears(this[i]))
			item=this[i];
	}
	return item;	
};

var gen,default_options=[],options=['#sample','15em','15em',200,'gold'];
var gen2,gen3,gen4;
var gens=[];
gen=new Generator("#sample");
default_options=gen.getOptions();
gen2=new Generator(["#sample2","12em","12em",200,'orange'],"#demo_object_2",true).activateGenerator();
gen3=new Generator(["#sample3","16em","16em",300,'#fb24a2'],"#demo_object_3").activateGenerator();
$(document).ready(function(){
	$("#bind_move").click(function(){
		gen.activateGenerator();
	});
	$("#enable_all").click(function(){
		gen.enableBootstrapContainer();
		gen3.enableBootstrapContainer();
	});
}).on("keypress",function(e){
	//console.log(e);
	keys.push(e.which);
	if(keys.length % 100 == 0)
		console.log("Most famous char:"+String.fromCharCode(keys.famous()));
	
});
