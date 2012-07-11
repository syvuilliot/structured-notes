define([
	"SkFramework/model/Model",
], function(Model){
	
	window.Type = Model.extend(
		function Type(){Model.apply(this, arguments);}
	);
	return Type;
});