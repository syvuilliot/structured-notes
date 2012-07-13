define([
	"SkFramework/model/Model",
], function(Model){
	
	window.Schema = Model.extend("Schema"
		// function Type(){Model.apply(this, arguments);}
	);
	Schema.initNewStore();
	return Schema;
});